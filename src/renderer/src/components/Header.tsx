import useExtensionStore from '@renderer/store/useExtensionStore'
import usePathStore from '@renderer/store/usePathStore';
import { Link } from 'react-router-dom';

function Header() {
  const { extension } = useExtensionStore();
  const { romsPath, consolesPath } = usePathStore();

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <header className='mx-2 my-8 px-6 text-white'>
      <div className='flex items-center'>
        {extension && (
          <div>
            <Link to={romsPath}
              className='text-base font-semibold font-mono px-4 py-2 border-2 bg-transparent hover:bg-white hover:border-transparent hover:text-black transition-all duration-200 rounded-sm'
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
          <div>
            <Link to={consolesPath}
              className='text-base font-semibold font-mono px-4 py-2 border-2 bg-transparent hover:bg-white hover:border-transparent hover:text-black transition-all duration-200 rounded-sm'
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
          <div className='text-base font-semibold font-mono px-4 py-2 border-2 bg-transparent hover:bg-white hover:border-transparent hover:text-black transition-all duration-200 rounded-sm'>
            {capitalize(romsPath.split('/').pop() || '')}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header