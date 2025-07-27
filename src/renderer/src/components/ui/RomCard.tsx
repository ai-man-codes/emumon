import { ANIME_RIKKA_GIF_URL, HEXROM_BROKEN_IMAGE_URL } from '@renderer/constants/imageUrlBroken'
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
}

const baseClassName = 'text-base font-light text-white text-center w-40 overflow-hidden text-ellipsis whitespace-nowrap'
const detailsClassName = 'overflow-visible whitespace-normal'

const RomCard = ({name, imageUrl, variant = 'default'}: RomCardProps) => {
    const imageUrlFixed = imageUrlBroken(imageUrl)

    return (
        <div className='flex flex-col items-center rounded-3xl py-6 gap-4 bg-transparent'>
            <div className='relative w-40 overflow-hidden rounded-xl'>
                <img src={ imageUrlFixed } alt="Image"
                    className="w-full" />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70" />
            </div>

            <h1 className={twMerge(baseClassName, variant === 'details' ? detailsClassName : '')}>{ name }</h1>

        </div>
    )
}

export default RomCard