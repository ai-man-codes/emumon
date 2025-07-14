import React from 'react'
import { Link } from 'react-router-dom'

interface RomsSitesItemsI {
    item: { name: string, to: string }
}

const RomsSiteCard = ({ item }: RomsSitesItemsI) => {
    return (
        <Link to={item.to} className='flex flex-col items-center'>
            <img src={new URL('../../assets/icons/' + item.name + '-logo.png', import.meta.url).href} alt="Extension"
                className='h-2/5 w-4/5' />

            <h1 className='text-white font-bold text-center'>{item.name}</h1>
        </Link>

    )
}

export default RomsSiteCard