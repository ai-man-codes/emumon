import React from 'react'
import { NavLink } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

const navItems = [
    { name: "Library", to: "/library" },
    { name: "Roms", to: "/roms" },
    { name: "Emulators", to: "/emulators" },
    { name: "Settings", to: "/settings" }
]

const baseClass = 'flex items-center px-10 py-3 rounded-full transition-colors duration-200 text-xl'
const hoverClass = 'hover:opacity-60'
const activeClass = 'bg-white font-semibold text-gray-900'

function SideBar() {
    return (
        <aside className='w-72 h-screen bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 text-white flex flex-col p-4'>
            <h2 className='text-3xl font-bold mb-8 m-2'>Emumon</h2>
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