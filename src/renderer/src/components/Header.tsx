import useExtensionStore from '@renderer/store/useExtensionStore'

function Header() {
  const { extension, consoleId, romTitle } = useExtensionStore();

  const parts: string[] = [];
  
  if (extension) parts.push(extension);
  if (consoleId) parts.push(consoleId);
  if (romTitle) parts.push(romTitle)

  return (
    <header className='mx-2 my-5 px-6'>
      <div className='text-white font-semibold text-3xl'>
        { parts.join(' > ')  || 'Library' }
      </div>
    </header>
  )
}

export default Header