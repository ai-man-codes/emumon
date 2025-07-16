import React from 'react'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useExtensionStore from '@renderer/store/useExtensionStore';
import { Rom } from '@renderer/types/rom';
import RomCard from '@renderer/components/ui/RomCard';

const ConsoleRoms = () => {
  const { extension, consoleId } = useParams();
  const [ roms, setRoms ] = useState<Rom[]>([])

  const { setConsle } = useExtensionStore();

  useEffect(() => {
    if (consoleId) setConsle(consoleId.toUpperCase())

  },[consoleId])

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
        <RomCard key={index} name={data.name} romUrl={data.romUrl} imageUrl={data.imageUrl} />
      ))}
    </div>
  )
}

export default ConsoleRoms