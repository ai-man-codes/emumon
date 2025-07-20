import RomCard from '@renderer/components/ui/RomCard'
import RomDetailsCard from '@renderer/components/ui/RomDetailsCard'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useExtensionStore from '@renderer/store/useExtensionStore'
import { RomDetails } from '@renderer/types/romDetails'
import { ANIME_RIKKA_GIF_URL, HEXROM_BROKEN_IMAGE_URL } from '@renderer/constants/imageUrlBroken'

const imageUrlBroken = (imageUrl: string): string => {
  if (imageUrl === HEXROM_BROKEN_IMAGE_URL) {
    return ANIME_RIKKA_GIF_URL
  }
  return imageUrl
}

const RomDetailsPage = () => {
  const { extension } = useExtensionStore()
  const { romUrl } = useLocation().state
  const [romDetails, setRomDetails] = useState<RomDetails>()

  useEffect(() => {
    const fetchRomDetails = async () => {
      if (!extension || !romUrl) return;

      try {
        const data = await window.api.fetchRomDetails(extension.toLowerCase(), romUrl)

        setRomDetails(data)

      } catch (err) {
        console.log("Failed to fetch Rom Details: ", err);
      }
    }

    fetchRomDetails()
  }, [extension, romUrl])

  if (!romDetails) return <div>Loading...</div>

  const imageUrlFixed = imageUrlBroken(romDetails.imageUrl || 'no image')

  return (
    <div>
      <div className='flex flex-row justify-evenly h-full items-start items-center' >
        <div className='scale-125 pt-12'>
          <RomCard name={romDetails.name} romUrl={romUrl} imageUrl={imageUrlFixed} />
        </div>
        <RomDetailsCard {...romDetails} />
      </div>
    </div>
  )
}

export default RomDetailsPage