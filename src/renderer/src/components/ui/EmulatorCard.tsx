import { useDownloadStore } from '@renderer/store/useDownloadStore'
import { useEffect } from 'react'

interface EmulatorCardProps {
    name: string
    iconUrl: string
    downloadUrl: string
    isInstalled: boolean
}

const EmulatorCard = ({ name, iconUrl, downloadUrl, isInstalled }: EmulatorCardProps) => {
    const { downloadPath, setDownloadPath, downloadHappened, setDownloadHappened } = useDownloadStore()

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

            {!isInstalled ? (
                <button className='px-6 py-2 m-5 focus:outline-none text-white rounded-full font-medium text-sm border-2 bg-transparent hover:bg-white hover:text-black transition-all duration-200 hover:scale-110'
                    onClick={async () => {
                        await window.download.downloadEmulator(downloadUrl, name)
                        setDownloadHappened(!downloadHappened)
                        
                }} >
                    <h1 className='text-lg font-semibold blur-none'>Download</h1>
                </button>
            ) : (
                <div className=' transition-all duration-100 hover:scale-110 hover:invert hover:text cursor-pointer text-center px-6 py-2 rounded-full m-5 bg-white  flex items-center justify-center'
                    onClick={async () => {
                        await window.emulators.remove(name)
                        setDownloadHappened(!downloadHappened)

                    }} >
                        <img src={new URL('../../assets/icons/uninstall-icon.png', import.meta.url).href} alt={name} className='w-5 transition-all duration-100' />
                        <h1 className='text-lg font-semibold blur-none ml-2'>Uninstall</h1>
                </div>
            )}
        </div>
    )
}

export default EmulatorCard