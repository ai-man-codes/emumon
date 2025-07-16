import useExtensionStore from '@renderer/store/useExtensionStore'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

interface RomsSitesItemsI {
    item: { name: string, to: string }
}

const RomsSiteCard = ({ item }: RomsSitesItemsI) => {
    const { setExtension } = useExtensionStore();

    return (
        <Link to={`${item.to}`}
            onClick={() => setExtension(item.name)}
            className='flex flex-col items-center p-4 m-5 rounded-2xl hover:opacity-80 transition-all duration-200 hover:-translate-y-4 hover:scale-105'>
            <div className='h-20'>
                <img src={new URL('../../assets/icons/' + item.name + '-logo.png', import.meta.url).href} alt="Extension"
                    className='' />
            </div>

            <h1 className='text-white font-light text-center text-2xl'>{item.name}</h1>
        </Link>

    )
}

export default RomsSiteCard
