import React from 'react'

const RomCardSample = () => {
    return (
        <div className='flex flex-col items-center rounded-3xl py-6 gap-4 bg-transparent hover:opacity-80 hover:scale-105 transition-all duration-200 hover:-translate-y-4'>
            <div className='relative w-48 h-60 overflow-hidden rounded-xl'>
                <img src={new URL('../../assets/images/fire-red.jpg', import.meta.url).href} alt="Image"
                    className="w-full h-full " />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70" />
            </div>

            <h1 className='text-xl font-light text-white text-center'>Pokemon Fire Red GBA Download For Free</h1>

        </div>
    )
}

export default RomCardSample