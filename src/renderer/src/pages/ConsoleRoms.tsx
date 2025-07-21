import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Rom } from '@renderer/types/rom';
import RomCard from '@renderer/components/ui/RomCard';
import usePathStore from '@renderer/store/usePathStore';

const ConsoleRoms = () => {
  const { extension, consoleId } = useParams();
  const [roms, setRoms] = useState<Rom[]>([])

  const { setRomsPath } = usePathStore();


  useEffect(() => {

    async function load() {
      if (!extension || !consoleId) return;

      try {
        const data = await window.api.fetchRoms(extension.toLowerCase(), consoleId);
        setRoms(data)

      } catch (err) {
        console.log("Failed to fetch Roms: ", err);
      }
    }

    load()

  }, [])

  return (
    <div className='m-5 grid justify-evenly grid-cols-5 gap-6'>
      {roms.map((data, index) => (

        <Link to={`/${extension?.toLowerCase()}/${consoleId}/${data.name}`} key={index} 
          state={{ romUrl: data.romUrl }}
          className='transition-all duration-200 hover:opacity-80 hover:scale-105 hover:-translate-y-4'
          onClick={() => setRomsPath(`/${extension?.toLowerCase()}/${consoleId}/${data.name}`)}
        >

          <RomCard name={data.name} romUrl={data.romUrl} imageUrl={data.imageUrl} />

        </Link>
      ))}
    </div>
  )
}

export default ConsoleRoms