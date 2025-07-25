import { useDownloadStore } from "@renderer/store/useDownloadStore";
import { useEffect } from "react";

const SelectPath = () => {
  const { downloadPath, setDownloadPath } = useDownloadStore();

  useEffect(() => {
    async function fetchPath() {
      const path = await window.settings.get('downloadPath');
      setDownloadPath(path);
    }
    fetchPath();

  }, [downloadPath, setDownloadPath]);

  const handleFolderPicker = async () => {

    try {
      const path = await window.api.selectDownloadPath();
      setDownloadPath(path);
      await window.settings.set('downloadPath', path);

    } catch (err) {
      console.error("Error selecting download path", err)
    }
  }

  return (
    <div className='flex flex-row gap-10 items-center'>
      <h3 className='text-white text-2xl font-mono'>Download Path</h3>
      <div className='flex flex-row gap-10 items-center'>
        <div className="border border-white rounded-md px-4 py-2 text-gray-400 text-xl overflow-hidden text-ellipsis whitespace-nowrap w-96">
          {downloadPath ? downloadPath : "create a download path"}
        </div>
        <button onClick={handleFolderPicker} className='text-black border-2 bg-white bg-transparent font-bold text-3xl px-3 py-1 rounded-full hover:bg-transparent hover:text-white hover:scale-110 transition-all duration-200'>+</button>
      </div>
    </div>
  )
}

export default SelectPath