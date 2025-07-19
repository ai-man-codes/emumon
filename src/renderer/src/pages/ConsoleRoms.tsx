import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import useExtensionStore from '@renderer/store/useExtensionStore';
import { Rom } from '@renderer/types/rom';
import RomCard from '@renderer/components/ui/RomCard';

const ConsoleRoms = () => {
  const { extension, consoleId } = useParams();
  const [roms, setRoms] = useState<Rom[]>([])

  const { setConsle } = useExtensionStore();

  useEffect(() => {
    if (consoleId) setConsle(consoleId.toUpperCase())

  }, [consoleId])

  useEffect(() => {

    async function load() {
      if (!extension || !consoleId) return;

      try {
        const data = await window.api.fetchRoms(extension.toLowerCase(), consoleId);
        const parsed = JSON.parse(data);

        setRoms(parsed)
        console.log(parsed)

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
          className='flex flex-col items-center rounded-3xl py-6 gap-4 bg-transparent transition-all duration-200 hover:opacity-80 hover:scale-105 hover:-translate-y-4'>
          
          <RomCard name={data.name} romUrl={data.romUrl} imageUrl={data.imageUrl} />

        </Link>
      ))}
    </div>
  )
}

export default ConsoleRoms