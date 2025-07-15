import React from 'react'
import { Link } from 'react-router-dom'

interface Console {
    name: string,
    totalGames: number,
    url: string,
}

const ConsoleCard = ({ name, totalGames, url }: Console) => {
    return (
        <Link to={url} className='border rounded-full border-white p-4'>
            <h2 className="text-white text-center">{name}</h2>
            <div className='flex flex-1 flex-row text-right'>
                <h3 className="underline-offset-1 text-white">TotalGames: </h3>
                <span>{totalGames}</span>
            </div>
        </Link>
    )
}

export default ConsoleCard