import React, { useEffect, useState } from 'react'

interface DownloadCardProps {
    name: string;
    imageUrl: string;
    completed: number;
    percent: number;
    total: number;
    speedMB: string;
    status: string;
    gid: string;
}

const DownloadCard = ({name, imageUrl, percent, completed, total, speedMB, status, gid}: DownloadCardProps) => {
    const [isPaused, setIsPaused] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        if (status === 'complete') {
            setIsCompleted(true);
        }
    }, [status]);
    
    return (
        <div className='flex flex-row items-center justify-between rounded-lg bg-transparent p-4 mx-5 w-11/12 text-white hover:bg-black/30 transition-all duration-200'>
            <picture className='h-28 w-28 relative overflow-hidden rounded-lg'>
                <img className='w-full h-full object-cover rounded-lg'
                    src={imageUrl} alt=' ' />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 rounded-lg" />
            </picture>

            <main className='flex flex-col items-baseline w-full h-full gap-4 justify-center mx-6'>
                <div className='flex flex-row items-center justify-between w-full'>
                    <h1 className='text-xl text-white font-semibold'>{name}</h1>
                    <button className='hover:opacity-50 transition-all duration-100' onClick={() => setIsPaused(!isPaused)}>
                        {isPaused ? (
                            <img src={new URL('../../assets/icons/resume-icon.png', import.meta.url).href} alt='Resume' className='w-9 invert' />
                        ) : (
                            <img src={new URL('../../assets/icons/pause-icon.png', import.meta.url).href} alt='Pause' className='w-9 invert' />
                        )}
                    </button>
                </div>

            
                <div className='bg-transparent h-1 rounded-full w-full'>
                    <div className='h-full rounded-full bg-white' style={{width: `${percent}%`}}></div>
                </div>
                <div className='flex flex-row items-center justify-between w-full'>
                    <h2 className='text-sm text-white font-light'>{completed} / {total} MB</h2>
                    <h2 className='text-sm text-white font-light'>{speedMB} MB/s</h2>
                </div>
            </main>
            <footer className='ml-5'>
                <button className='bg-transparent text-white p-2 rounded-lg hover:opacity-50 hover:translate-y-1 transition-all duration-200'>
                    <img src={new URL('../../assets/icons/cancel-icon.png', import.meta.url).href} alt='Close' className='w-8 invert' />
                </button>
            </footer>
        </div>
    )
}

export default DownloadCard