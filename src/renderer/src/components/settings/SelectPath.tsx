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
    <div className='flex flex-row gap-10 items-center mr-7'>
      <h3 className='text-white text-xl w-1/5'>Download Path</h3>
      <div className='flex flex-row gap-10 items-center w-full'>
        <div className="border border-white rounded-md px-4 py-2 text-gray-400 text-lg  w-full">
          {downloadPath ? downloadPath : "create a download path"}
        </div>
        <button onClick={handleFolderPicker} className='text-black border-2 bg-white bg-transparent font-bold text-2xl px-3 py-1 rounded hover:bg-transparent hover:text-white hover:scale-110 transition-all duration-200'>+</button>
      </div>
    </div>
  )
}

export default SelectPath