import RomCardSample from '@renderer/components/ui/RomCardSample'

function Library() {
  return (
    <div className='m-5 grid justify-evenly grid-cols-5 gap-6'>
      <RomCardSample />
      <RomCardSample />
      <RomCardSample />
      <RomCardSample />
    </div>
  )
}

export default Library