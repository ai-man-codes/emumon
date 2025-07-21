import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Rom } from '@renderer/types/rom';
import RomCard from '@renderer/components/ui/RomCard';
import usePathStore from '@renderer/store/usePathStore';
import { useQuery } from '@tanstack/react-query'

const ConsoleRoms = () => {
  const { extension, consoleId } = useParams();
  // const [roms, setRoms] = useState<Rom[]>([])

  const { setRomsPath } = usePathStore();

  if (!extension || !consoleId) return;

  const { data, isLoading, error } = useQuery<Rom[]>({
    queryKey: ['roms', extension.toLowerCase(), consoleId],
    queryFn: () => window.api.fetchRoms(extension.toLowerCase(), consoleId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })

  if (!data) return;

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  console.log(data)


  // useEffect(() => {

  //   async function load() {
  //     if (!extension || !consoleId) return;

  //     try {
        // const data = await window.api.fetchRoms(extension.toLowerCase(), consoleId);
  //       setRoms(data)

  //     } catch (err) {
  //       console.log("Failed to fetch Roms: ", err);
  //     }
  //   }

  //   load()

  // }, [])

  return (
    <div className='m-5 grid justify-evenly grid-cols-5 gap-6'>
      {data.map((rom, index) => (

        <Link to={`/${extension?.toLowerCase()}/${consoleId}/${rom.name}`} key={index} 
          state={{ romUrl: rom.romUrl }}
          className='transition-all duration-200 hover:opacity-80 hover:scale-105 hover:-translate-y-4'
          onClick={() => setRomsPath(`/${extension?.toLowerCase()}/${consoleId}/${rom.name}`)}
        >

          <RomCard name={rom.name} romUrl={rom.romUrl} imageUrl={rom.imageUrl} />

        </Link>
      ))}
    </div>
  )
}

export default ConsoleRoms