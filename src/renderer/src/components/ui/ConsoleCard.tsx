import { Link } from 'react-router-dom'

import { Console } from '@renderer/types/console'

const ConsoleCard = ({ name, totalGames, url, imageUrl }: Console) => {
    const path = url.match(/\/([^\/?#]+)(?:[?#]|$)/)?.[1];
    console.log(path)

    return (
        <Link to={`/${path}`} className=' rounded-2xl p-4 hover:opacity-80 transition-all duration-100 hover:scale-110'>
            <div>
                <img src={imageUrl} alt="" />
            </div>
            <h2 className="text-white text-center font-semibold text-xl mb-4">{name}</h2>

            <div className='flex flex-1 flex-row gap-5 justify-center'>
                <h4 className="underline underline-offset-4 text-white font-light">TotalGames</h4>
                <span className='text-white'>:</span>
                <div className='bg-white rounded-2xl w-10 text-center px-1'>
                    <span className='text-black font-semibold text-xs'>{totalGames}</span>
                </div>
            </div>
        </Link>
    )
}

export default ConsoleCard