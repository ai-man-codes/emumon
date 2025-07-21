import { useState } from "react";

const SelectPath = () => {
  const [path, setPath] = useState<string | null>(null);

  const handleFolderPicker = async () => {
    try {      
      const path = await window.api.selectDownloadPath();
      setPath(path);

    } catch (err) {
      console.error("Error selecting download path", err)
    }
  }
  
  return (
    <div className='flex flex-row gap-10 items-center'>
      <h3 className='text-white text-2xl font-mono'>Downloads :</h3>
      <div className='flex flex-row gap-10 items-center'>
        <div className="border-2 border-white rounded-md px-4 py-2 text-gray-400 text-xl overflow-hidden text-ellipsis whitespace-nowrap w-96">
          {path ? path : "C:\\home\\Dwonloads"}
        </div>
        <button onClick={handleFolderPicker} className='text-black border-2 bg-white bg-transparent font-bold text-3xl px-3 py-1 rounded-md hover:bg-transparent hover:text-white hover:scale-105 transition-all duration-200'>+</button>
      </div>
    </div>
  )
}

export default SelectPath