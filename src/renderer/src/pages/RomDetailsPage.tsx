import RomCard from '@renderer/components/ui/RomCard'
import RomDetailsCard from '@renderer/components/ui/RomDetailsCard'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useExtensionStore from '@renderer/store/useExtensionStore'
import { RomDetails } from '@renderer/types/romDetails'
import { ANIME_RIKKA_GIF_URL, HEXROM_BROKEN_IMAGE_URL } from '@renderer/constants/imageUrlBroken'
import { DownloadRom } from '@renderer/types/downloadRom'

const imageUrlBroken = (imageUrl: string): string => {
  if (imageUrl === HEXROM_BROKEN_IMAGE_URL) {
    return ANIME_RIKKA_GIF_URL
  }
  return imageUrl
}

const RomDetailsPage = () => {
  const extension = useExtensionStore(state => state.extension)
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

  const [romDownloadUrls, setRomDownloadUrls] = useState<DownloadRom[]>([]);

  useEffect(() => {
    const fetchRomDownload = async () => {
      if (!romDetails?.downloadPageUrl) return;

      try {
        const data = await window.api.fetchRomDownloadUrls(extension.toLowerCase(), romDetails.downloadPageUrl)
        console.log(extension, romUrl, data)
        setRomDownloadUrls(data)

      } catch (err) {
        console.log("Failed to fetch Rom Download Urls: ", err);
      }
    }

    fetchRomDownload()
  }, [extension, romDetails?.downloadPageUrl])

  if (!romDetails) return <div>Loading...</div>

  const imageUrlFixed = imageUrlBroken(romDetails.imageUrl || 'no image')

  return (
    <div className='flex flex-col h-full gap-10' >
      <div className='flex flex-row justify-evenly items-center' >
        <div className='scale-125 mt-12'>
          <RomCard name={romDetails.name} romUrl={romUrl} imageUrl={imageUrlFixed} />
        </div>
        <RomDetailsCard {...romDetails} />
      </div>

      <div className='flex flex-col items-center justify-evenly h-1/2' >
        {romDownloadUrls.map((romDownloadUrl, index) => (
          <button key={index} className='px-5 py-2 m-5 bg-white rounded-md text-lg font-semibold border-2 border-transparent duration-200 hover:border-white hover:bg-transparent hover:text-white transition-all hover:scale-105' >
            <h1 className='text-lg font-semibold'>{romDownloadUrl.downloadName}</h1>
          </button>
        ))}
      </div>

    </div>
  )
}

export default RomDetailsPage