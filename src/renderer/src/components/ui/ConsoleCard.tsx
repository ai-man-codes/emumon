import { Link } from 'react-router-dom'

import { Console } from '@renderer/types/console'

const ConsoleCard = ({ name, totalGames, url }: Console) => {
    return (
        <Link to={url} className=' rounded-2xl p-4 hover:opacity-80 hover:border-y-4 transition-all duration-100 hover:scale-110'>
            <h2 className="text-white text-center font-semibold text-xl">{name}</h2>

            <div className='flex flex-1 flex-row gap-5'>
                <h4 className="underline text-white font-">TotalGames</h4>

                <div className='bg-white rounded-2xl w-10 text-center'>
                    <span className='text-black font-light text-xs'>{totalGames}</span>
                </div>

            </div>
        </Link>
    )
}

export default ConsoleCard