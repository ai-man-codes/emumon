import useExtensionStore from '@renderer/store/useExtensionStore'
import usePathStore from '@renderer/store/usePathStore';
import { Link } from 'react-router-dom';

function Header() {
  const { extension } = useExtensionStore();
  const { romsPath, consolesPath } = usePathStore();
  const { setRomsPath, setConsolesPath } = usePathStore();

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <header className='mx-4 px-4 my-3 border-b h-20'>
      <div className='flex items-center text-white w-full h-full'>
        {extension && (
          <div className='hover:scale-105 transition-all duration-100'>
            <Link to={`/${extension.toLowerCase()}`}
              onClick={() => {
                setConsolesPath('')
                setRomsPath('')
              }}
              className='text-2xl text-white font-semibold px-4 py-2 border-t border-transparent bg-transparent hover:border-white transition-all duration-100 rounded-sm'
            >
              {extension}
            </Link>
            {consolesPath && (
              <span className='m-3 font-bold text-xl'>
                {'>'}
              </span>
            )}
          </div>
        )}
        {consolesPath && (
          <div className='hover:scale-105 transition-all duration-100'>
            <Link to={consolesPath}
              onClick={() => setRomsPath('')}
              className='text-2xl text-white font-semibold px-4 py-2 border-t border-transparent bg-transparent hover:border-white transition-all duration-100 rounded-sm'
            >
              {capitalize(consolesPath.split('/').pop() || '')}
            </Link>
            {romsPath && (
              <span className='m-3 font-bold text-xl'>
                {'>'}
              </span>
            )}
          </div>
        )}
        {romsPath && (
          <div className='hover:scale-105 transition-all duration-100 text-2xl text-white font-semibold px-4 py-2 border-t border-transparent bg-transparent rounded-sm'>
            {capitalize(romsPath.split('/').pop() || '')}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header