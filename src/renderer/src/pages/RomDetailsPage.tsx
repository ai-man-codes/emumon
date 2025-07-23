import RomCard from '@renderer/components/ui/RomCard'
import RomDetailsCard from '@renderer/components/ui/RomDetailsCard'
import { useLocation } from 'react-router-dom'
import useExtensionStore from '@renderer/store/useExtensionStore'
import { RomDetails } from '@renderer/types/romDetails'
import { ANIME_RIKKA_GIF_URL, HEXROM_BROKEN_IMAGE_URL } from '@renderer/constants/imageUrlBroken'
import { DownloadRom } from '@renderer/types/downloadRom'
import { useQuery } from '@tanstack/react-query'

const imageUrlBroken = (imageUrl: string): string => {
  if (imageUrl === HEXROM_BROKEN_IMAGE_URL) {
    return ANIME_RIKKA_GIF_URL
  }
  return imageUrl
}

const RomDetailsPage = () => {
  const { extension } = useExtensionStore()
  const { romUrl } = useLocation().state
  
  const { data: romDetails, isLoading: romDetailsLoading, error: romDetailsError } = useQuery<RomDetails>({
    queryKey: ['romDetails', extension.toLowerCase(), romUrl],
    queryFn: () => window.api.fetchRomDetails(extension.toLowerCase(), romUrl),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })

  const { data: romDownloadUrls , isLoading: romDownloadUrlsLoading, error: romDownloadUrlsError } = useQuery<DownloadRom[]>({
    queryKey: ['romDownloadUrls', extension.toLowerCase(), romDetails?.downloadPageUrl],
    queryFn: () => window.api.fetchRomDownloadUrls(extension.toLowerCase(), romDetails?.downloadPageUrl || ''),
    enabled: !!romDetails?.downloadPageUrl,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })

  if (romDetailsLoading || romDownloadUrlsLoading) return;
  if (romDetailsError || romDownloadUrlsError) return;
  if (!romDetails || !romDownloadUrls) return;

  const imageUrlFixed = imageUrlBroken(romDetails.imageUrl || 'no image')

  return (
    <div className='flex flex-col h-full gap-10' >
      <div className='flex flex-row justify-evenly items-center' >
        <div className='scale-125 mt-12 hover:overflow-visible'>
          <RomCard name={romDetails.name} imageUrl={imageUrlFixed} variant='details' />
        </div>
        <RomDetailsCard {...romDetails} />
      </div>

      <div className='flex flex-col items-center justify-evenly h-1/2' >
        <div className='flex flex-col items-center justify-evenly' >
          {romDownloadUrls.map((romDownloadUrl, index) => (
            <button key={index} className='px-10 py-3 m-5 bg-white rounded-full text-lg font-semibold border-2 border-transparent duration-200 hover:border-white hover:bg-transparent hover:text-white transition-all hover:scale-105' >
              <h1 className='text-lg font-semibold'>{romDownloadUrl.downloadName}</h1>
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}

export default RomDetailsPage