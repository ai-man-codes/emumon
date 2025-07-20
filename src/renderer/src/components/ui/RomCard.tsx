import { Rom } from '@renderer/types/rom'
import { ANIME_RIKKA_GIF_URL, HEXROM_BROKEN_IMAGE_URL } from '@renderer/constants/imageUrlBroken'

function imageUrlBroken(imageUrl: string): string {

    if(imageUrl == HEXROM_BROKEN_IMAGE_URL) {
        imageUrl = ANIME_RIKKA_GIF_URL;
    }

    return imageUrl;

}

const RomCard = ({name, imageUrl}: Rom) => {
    const imageUrlFixed = imageUrlBroken(imageUrl)

    return (
        <div className='flex flex-col items-center rounded-3xl py-6 gap-4 bg-transparent '>
            <div className='relative w-48 overflow-hidden rounded-xl'>
                <img src={ imageUrlFixed } alt="Image"
                    className="w-full" />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70" />
            </div>

            <h1 className='text-xl font-light text-white text-center w-48'>{ name }</h1>

        </div>
    )
}

export default RomCard