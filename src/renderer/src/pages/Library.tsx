import RomCard from '@renderer/components/ui/RomCard'
import React from 'react'

function Library() {
  return (
    <div className='m-5 grid justify-evenly grid-cols-5 gap-6'>
      <RomCard />
      <RomCard />
      <RomCard />
      <RomCard />

    </div>
  )
}

export default Library