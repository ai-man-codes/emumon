import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import axios from 'axios';

let aria2Process: ChildProcessWithoutNullStreams | null = null;

const ARIA2_RPC_URL = 'http://localhost:6800/jsonrpc';
const ARIA2_SECRET = ''; // Set if needed

const headers = { 'Content-Type': 'application/json' };

type JSONRPCResponse<T> = {
  id: string;
  jsonrpc: '2.0';
  result: T;
  error?: { code: number; message: string };
};

async function callAria2<T = any>(method: string, params: any[] = []): Promise<T> {
  const payload = {
    jsonrpc: '2.0',
    method,
    id: 'qwer',
    params: ARIA2_SECRET ? [`token:${ARIA2_SECRET}`, ...params] : params
  };

  const res = await axios.post(ARIA2_RPC_URL, payload, { headers });
  const data = res.data as JSONRPCResponse<T>;

  if (data.error) {
    throw new Error(`Aria2 Error ${data.error.code}: ${data.error.message}`);
  }

  return data.result;
}

export function startAria2() {
  if (aria2Process) return;

  aria2Process = spawn('aria2c', [
    '--enable-rpc',
    '--rpc-listen-all=true',
    '--rpc-allow-origin-all',
    '--rpc-listen-port=6800',
    '--dir=C:\\Users\\Acer\\Desktop\\emumon-downloads',
    '--max-connection-per-server=16',
    '--split=16',
    '--min-split-size=1M',
    '--max-concurrent-downloads=5',
    '--continue=true',
    '--summary-interval=0'
  ]);

  aria2Process.stdout.on('data', (data) => {
    const output = data.toString().trim();
    if (output.includes('[NOTICE]')) console.log(`[aria2] ${output}`);
  });

  aria2Process.stderr.on('data', (data) => {
    console.error(`[aria2 ERROR] ${data.toString().trim()}`);
  });

  aria2Process.on('exit', (code) => {
    console.log(`[aria2] exited with code ${code}`);
    aria2Process = null;
  });

}

export function stopAria2() {
  if (aria2Process) {
    aria2Process.kill();
    aria2Process = null;
  }
}

export async function addDownload(url: string): Promise<string> {
  const gid = await callAria2<string>('aria2.addUri', [[url]]);
  console.log(`Download added with GID: ${gid}`);
  return gid;
}

export async function getDownloadStatus(gid: string) {
  return callAria2<any>('aria2.tellStatus', [gid, ['completedLength', 'totalLength', 'downloadSpeed', 'status']]);
}

export function monitorDownload(gid: string) {
  const interval = setInterval(async () => {
    try {
      const status = await getDownloadStatus(gid);

      if (status.status === 'complete') {
        console.log('✅ Download complete');
        clearInterval(interval);
        return;
      }

      const completed = parseInt(status.completedLength);
      const total = parseInt(status.totalLength);
      const speed = parseInt(status.downloadSpeed);

      const percent = total ? ((completed / total) * 100).toFixed(2) : '0';
      const speedMB = (speed / 1024 / 1024).toFixed(2);

      console.log(`⬇️ ${percent}% @ ${speedMB} MB/s`);

    } catch (err) {
      console.error('Monitor Error:', err);
      clearInterval(interval);
    }
  }, 1000);
}