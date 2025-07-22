import React from 'react'

interface EmulatorCardProps {
    name: string
    iconUrl: string
    downloadUrl: string
}

const EmulatorCard = ({ name, iconUrl, downloadUrl }: EmulatorCardProps) => {
    return (
        <div className='flex flex-col items-center justify-center rounded-3xl py-6'>
            <div className='flex flex-col items-center gap-4 justify-center cursor-pointer bg-transparent hover:opacity-80 hover:scale-110 transition-all duration-200 hover:-translate-y-4'>
                <div className='h-24 m-2 w-48 flex items-center justify-center'>
                    <img src={new URL(iconUrl, import.meta.url).href} alt={name} className='h-full' />
                </div>
                <h1 className='text-xl font-light text-white text-center w-48 overflow-hidden text-ellipsis whitespace-nowrap'>{name}</h1>
            </div>

            <button className='px-10 py-3 m-5 bg-white rounded-full text-lg font-semibold border-2 border-transparent duration-200 hover:border-white hover:bg-transparent hover:text-white transition-all hover:scale-110' >
                <h1 className='text-xl font-semibold blur-none'>Download</h1>
            </button>
        </div>
    )
}

export default EmulatorCard