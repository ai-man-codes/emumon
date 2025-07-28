import useExtensionStore from '@renderer/store/useExtensionStore'
import usePathStore from '@renderer/store/usePathStore'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

const navItems = [
    { name: "Library", to: "/library" },
    { name: "Roms", to: "/roms" },
    { name: "Emulators", to: "/emulators" },
    { name: "Settings", to: "/settings" }
]

const baseClass = 'flex items-center px-10 py-3 rounded-full transition-colors duration-200 text-lg'
const hoverClass = 'hover:opacity-60'
const activeClass = 'bg-white font-semibold text-gray-900 font-normal'

function SideBar() {
    const handleNavLinkClick = (name: string) => {
        setExtension(name)
        setRomsPath('')
        setConsolesPath('')
    }
    
    const [activeItem, setActiveItem] = useState<string>('Library')
    
    const { setExtension } = useExtensionStore()
    const { setRomsPath, setConsolesPath } = usePathStore()

    return (
        <aside className='w-1/5 h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white flex flex-col p-4'>
            <h2 className='text-3xl font-semibold mb-6 m-2'>Emumon</h2>
            <nav className='flex flex-col space-y-2'>
                {navItems.map(item => (
                    <NavLink
                        key={item.name}
                        to={item.to}
                        onClick={ () => {
                            handleNavLinkClick(item.name)
                            setActiveItem(item.name)
                        } }
                        className={({ isActive }) => (
                            
                            twMerge(
                                baseClass,
                                "flex flex-row gap-5",
                                isActive || activeItem === item.name ? activeClass : hoverClass,
                            )
                        )}
                    >
                        <img src={new URL('../assets/icons/SideBar/' + item.name + '.png', import.meta.url).href} alt="Emumon Logo" className={activeItem === item.name ? 'w-6' : 'w-6 invert'} />
                        <div className={twMerge(
                            activeItem === item.name ? 'text-xl font-semibold' : 'font-light text-xl'
                        )}>{item.name}</div>

                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}

export default SideBar