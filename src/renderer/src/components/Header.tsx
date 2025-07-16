import useExtensionStore from '@renderer/store/useExtensionStore'
import React from 'react'

function Header() {
  const { extension, console, romTitle } = useExtensionStore();

  const parts: string[] = [];
  
  if (extension) parts.push(extension);
  if (console) parts.push(console);
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