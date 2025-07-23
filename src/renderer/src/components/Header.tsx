import useExtensionStore from '@renderer/store/useExtensionStore'
import usePathStore from '@renderer/store/usePathStore';
import { Link } from 'react-router-dom';

function Header() {
  const { extension } = useExtensionStore();
  const { romsPath, consolesPath } = usePathStore();
  const { setRomsPath, setConsolesPath } = usePathStore();

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
  const capitalizeAll = (str: string) => str.split(' ').map(capitalize).join(' ');
  const removeDash = (str: string) => str.replace(/-/g, ' ');

  return (
    <header className='mx-4 px-4 my-3 h-16'>
      <div className='flex items-center text-white w-full h-full'>
        {extension && (
          <div className='hover:scale-105  transition-all duration-200'>
            <Link to={`/${extension.toLowerCase()}`}
              onClick={() => {
                setConsolesPath('')
                setRomsPath('')
              }}
              className='text-3xl font-light text-white overflow-hidden text-ellipsis whitespace-nowrap px-4 py-2 border-b-2 border-transparent bg-transparent hover:border-white transition-all duration-200 rounded-sm'
            >
              {extension}
            </Link>
            {consolesPath && (
              <span className='m-3 font-light text-2xl'>
                {'>'}
              </span>
            )}
          </div>
        )}
        {consolesPath && (
          <div className='hover:scale-105 transition-all duration-200'>
            <Link to={consolesPath}
              onClick={() => setRomsPath('')}
              className='text-3xl font-light overflow-hidden text-ellipsis whitespace-nowrap text-white px-4 py-2 border-b-2 border-transparent bg-transparent hover:border-white transition-all duration-200 rounded-sm'
            >
              {capitalizeAll(removeDash(consolesPath.split('/').pop() || ''))}
            </Link>
            {romsPath && (
              <span className='m-3 font-light text-2xl'>
                {'>'}
              </span>
            )}
          </div>
        )}
        {romsPath && (
          <div className='font-light transition-all duration-200 overflow-hidden text-ellipsis whitespace-nowrap text-3xl text-white px-4 py-2 border-t border-transparent bg-transparent rounded-sm'>
            {capitalize(romsPath.split('/').pop() || '')}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header