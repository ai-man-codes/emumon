import { Link } from 'react-router-dom'
import { Console } from '@renderer/types/console'
import useExtensionStore from '@renderer/store/useExtensionStore';
import usePathStore from '@renderer/store/usePathStore';

const ConsoleCard = ({ name, totalGames, url, imageUrl }: Console) => {

    const { extension } = useExtensionStore();
    const { setConsolesPath } = usePathStore();
    const consoleId = url.split('/').filter(Boolean).pop()
    
    return (
        <Link to={`/${extension.toLowerCase()}/${consoleId}`} 
            className='p-4 transition-all duration-100 rounded-md hover:scale-110 hover:border hover:border-white border border-transparent' 
            onClick={() => setConsolesPath(`/${extension.toLowerCase()}/${consoleId}`)}
            >
            <div>
                <img src={imageUrl} alt="" />
            </div>
            <h2 className="text-white text-center font-semibold text-lg mb-2">{name}</h2>

            <div className='flex flex-1 flex-row gap-5 justify-center'>
                <h4 className="underline underline-offset-4 text-white font-light text-sm">TotalGames</h4>
                <span className='text-white'>:</span>
                <div className='bg-white rounded-full w-10 text-center px-1'>
                    <span className='text-black font-semibold text-xs'>{totalGames}</span>
                </div>
            </div>
        </Link>
    )
}

export default ConsoleCard