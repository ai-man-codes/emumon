import RomCard from '@renderer/components/ui/RomCard'
import React from 'react'

function Library() {
  return (
    <div className="overflow-y-auto h-[500px] custom-scrollbar h-full">
      <div className='m-5 grid justify-evenly grid-cols-5 gap-6'>
        <RomCard />
        <RomCard />
        <RomCard />
        <RomCard />
        
      </div>
    </div>
  )
}

export default Library