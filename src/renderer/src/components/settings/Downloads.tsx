import { useEffect, useState } from 'react'
import DownloadCard from '@renderer/components/ui/DownloadCard'
import { useDownloadStore } from '@renderer/store/useDownloadStore';
import { SendDownloadProgress } from '@renderer/types/sendDownloadProgress';

const Downloads = () => {

    const { downloads, setDownloads, downloadHappened } = useDownloadStore();
    const [downloadProgress, setDownloadProgress] = useState<Record<string,SendDownloadProgress>>({});

    useEffect(() => {
        window.download.onDownloadProgress((data) => {
            setDownloadProgress((prev) => ({
                ...prev, 
                [data.gid]: data,
            }));
        })
    }, [downloadHappened, downloadProgress]);

    console.log(downloadProgress)

    return (
        <div className='flex flex-col gap-4 m-4'>
            <div className='flex flex-row gap-4 items-center justify-center'>
                <div className='border-b-2 w-full m-4 ' />
                <h1 className='text-2xl text-white font-light'>Downloads</h1>
                <div className='border-b-2 w-full m-4 ' /> 
            </div>
            <div className='flex flex-col gap-4 items-center justify-center'>
                {downloads.map((download) => {
                    const progress = downloadProgress[download.gid]
                    if (!progress) return null

                    console.log(downloadProgress?.gid)
                    return (
                    <DownloadCard
                        key={download.name}
                        name={download.name}
                        imageUrl={download.imageUrl}
                        completed={progress.completed}
                        percent={Number(progress.percent)}
                        speedKB={progress.speedKB}
                        status={progress.status}
                        total={progress.total}
                        gid={progress.gid}
                    />
                )})}
            </div>

        </div>
    )
}

export default Downloads