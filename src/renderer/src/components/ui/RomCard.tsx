import { ANIME_RIKKA_GIF_URL, HEXROM_BROKEN_IMAGE_URL } from '@renderer/constants/imageUrlBroken'
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

function imageUrlBroken(imageUrl: string): string {
    if(imageUrl == HEXROM_BROKEN_IMAGE_URL) {
        imageUrl = ANIME_RIKKA_GIF_URL;
    }

    return imageUrl;
}

interface RomCardProps {
    name: string;
    imageUrl: string;
    variant?: 'default' | 'details';
    isInLibrary?: boolean;
}

const baseClassName = 'text-base font-light text-white w-full text-center overflow-hidden text-ellipsis whitespace-nowrap'
const detailsClassName = 'overflow-visible whitespace-normal'

const RomCard = ({name, imageUrl, variant = 'default', isInLibrary = false}: RomCardProps) => {
    const [hover, setHover] = useState(false);
    const imageUrlFixed = imageUrlBroken(imageUrl)
    const [uninstallHover, setUninstallHover] = useState(false)
    
    const handleDeleteRom = () => {
        if(isInLibrary) {
            window.romLibrary.remove(name)
        }
        setHover(false)
    }

    return (
        <div className='flex flex-col items-center rounded-3xl py-4 gap-4 bg-transparent w-40'
        onMouseEnter={() => {
            if(isInLibrary) {
                setHover(true)
            }
        }}
        onMouseLeave={() => {
            setHover(false)
        }}
        >
            <div className='relative overflow-hidden rounded-xl'>
                <img src={ imageUrlFixed } alt="Image"
                    className="w-full" />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70" />
            </div>

            <h1 className={twMerge(baseClassName, variant === 'details' ? detailsClassName : '')}>{ name }</h1>

            {hover && (
            <div className={twMerge("absolute h-10 w-10 hover:h-12 hover:w-12 hover:p-3 bg-white top-0 right-0 opacity-100 rounded-full p-2 transition-all duration-200 ",
                uninstallHover ? "invert" : ""
            )}
                onMouseEnter={ () => setUninstallHover(true) }
                onMouseLeave={ () => setUninstallHover(false) }
                onClick={() => {
                    handleDeleteRom()
                    setHover(false)
                
            }}>
                <img src={new URL('../../assets/icons/uninstall-icon.png', import.meta.url).href} 
                className=" text-black hover:text-white transition-all duration-200 opacity-100" />
            </div>
          )}

        </div>
    )
}

export default RomCard