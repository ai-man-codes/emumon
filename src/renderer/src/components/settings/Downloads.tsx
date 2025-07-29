import { useEffect } from 'react'
import DownloadCard from '@renderer/components/ui/DownloadCard'
import { useDownloadStore } from '@renderer/store/useDownloadStore';

const Downloads = () => {

    const { downloads, setDownloads } = useDownloadStore();

    useEffect(() => {
        window.download.onDownloadProgress((data) => {
            console.log(data)
        });

        
    }, []);

  return (
    <div className='flex flex-col gap-4 m-4'>
        <div className='flex flex-row gap-4 items-center justify-center'>
            <div className='border-b-2 w-full m-4 ' />
            <h1 className='text-2xl text-white font-light'>Downloads</h1>
            <div className='border-b-2 w-full m-4 ' /> 
        </div>
        <div className='flex flex-col gap-4 items-center justify-center'>
            {downloads.map((download) => (
                <DownloadCard key={download.gid} {...download} />
            ))}
        </div>

    </div>
  )
}

export default Downloads