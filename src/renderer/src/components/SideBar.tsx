import React from 'react'
import { NavLink } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

const navItems = [
    { name: "Library", to: "/library" },
    { name: "Roms", to: "/roms" },
    { name: "Emulators", to: "/emulators" },
    { name: "Settings", to: "/settings" }
]

const baseClass = 'flex items-center px-4 py-2 rounded-md transition-colors duration-100'
const hoverClass = 'hover:text-white hover:bg-white-200 hover:opacity-60'
const activeClass = 'bg-white font-semibold text-gray-900'

function SideBar() {
    return (
        <aside className='w-64 h-screen bg-gray-800 text-white flex flex-col p-4'>
            <h2 className='text-xl font-bold mb-4'>Emumon</h2>
            <nav className='flex flex-col space-y-2'>
                {navItems.map(item => (
                    <NavLink
                        key={item.name}
                        to={item.to}
                        className={({ isActive }) => (
                            twMerge(
                                baseClass,
                                isActive ? activeClass : hoverClass,
                            )
                        )}
                    >
                        {item.name}

                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}

export default SideBar