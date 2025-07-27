import { useDownloadStore } from '@renderer/store/useDownloadStore'
import { useEffect, useState } from 'react'

interface EmulatorCardProps {
    name: string
    iconUrl: string
    downloadUrl: string
}

const EmulatorCard = ({ name, iconUrl, downloadUrl }: EmulatorCardProps) => {
    const { downloadPath, setDownloadPath } = useDownloadStore()
    
    useEffect(() => {
        const savedDownloadPath = async () => {
            const path = await window.settings.get('downloadPath')
            if (path) setDownloadPath(path)
        }
        savedDownloadPath()
        
    }, [setDownloadPath, downloadPath])

    return (
        <div className='flex flex-col items-center justify-center rounded-3xl py-2'>
            <div className='flex flex-col items-center gap-4 justify-center cursor-pointer bg-transparent hover:opacity-80 hover:scale-110 transition-all duration-200 hover:-translate-y-4'>
                <div className='h-16 m-2 w-40 flex items-center justify-center'>
                    <img src={new URL(iconUrl, import.meta.url).href} alt={name} className='h-full' />
                </div>
                <h1 className='text-lg font-light text-white text-center w-48 overflow-hidden text-ellipsis whitespace-nowrap'>{name}</h1>
            </div>

            <button className='px-6 py-2 m-5 focus:outline-none text-white rounded-full font-medium text-sm border-2 bg-transparent hover:bg-white hover:text-black transition-all duration-200 hover:scale-110'
                onClick={async () => {
                    await window.download.downloadEmulator(downloadUrl, downloadPath, name)

                    console.log('Download completed')
                }} >
                <h1 className='text-lg font-semibold blur-none'>Download</h1>
            </button>
        </div>
    )
}

export default EmulatorCard