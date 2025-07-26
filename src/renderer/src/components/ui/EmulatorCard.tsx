import { useDownloadStore } from '@renderer/store/useDownloadStore'
import { useEffect, useState } from 'react'

interface EmulatorCardProps {
    name: string
    iconUrl: string
    downloadUrl: string
}

const EmulatorCard = ({ name, iconUrl, downloadUrl }: EmulatorCardProps) => {
    const { downloadPath, setDownloadPath } = useDownloadStore()
    const [isDownloading, setIsDownloading] = useState(false)

    useEffect(() => {
        const savedDownloadPath = async () => {
            const path = await window.settings.get('downloadPath')
            if (path) setDownloadPath(path)
        }
        savedDownloadPath()
        
    }, [setDownloadPath, downloadPath])

    useEffect(() => {
        if (isDownloading) {
            window.download.downloadEmulatorProgress((progress) => {
                console.log(progress.percent)
            })
        }
    }, [isDownloading])


    console.log(downloadPath)

    return (
        <div className='flex flex-col items-center justify-center rounded-3xl py-6'>
            <div className='flex flex-col items-center gap-4 justify-center cursor-pointer bg-transparent hover:opacity-80 hover:scale-110 transition-all duration-200 hover:-translate-y-4'>
                <div className='h-24 m-2 w-48 flex items-center justify-center'>
                    <img src={new URL(iconUrl, import.meta.url).href} alt={name} className='h-full' />
                </div>
                <h1 className='text-xl font-light text-white text-center w-48 overflow-hidden text-ellipsis whitespace-nowrap'>{name}</h1>
            </div>

            <button className='px-10 py-3 m-5 focus:outline-none text-white rounded-full font-semibold border-2 bg-transparent hover:bg-white hover:text-black transition-all duration-200 hover:scale-110'
                onClick={async () => {
                    console.log("button clicked")
                    console.log(name, downloadUrl, downloadPath)
                    const result = await window.download.downloadEmulator(name, downloadUrl, downloadPath)
                    setIsDownloading(!isDownloading)

                    if (result.success) {
                        console.log('Download started')
                    } else {
                        console.error("Error downloading emulator: ", result.error)
                    }
                }} >
                <h1 className='text-xl font-semibold blur-none'>Download</h1>
            </button>
        </div>
    )
}

export default EmulatorCard