
import RomsSiteCard from '@renderer/components/ui/RomsSiteCard'

const RomsSitesItems = [
  { name: "HexRom", to: "/hexrom" },
  { name: "RomsPedia", to: "/romspedia" }
]

function RomsSites() {
  return (
    <div className='grid grid-cols-4 items-center'>
      {RomsSitesItems.map(item => (
        <RomsSiteCard key={item.name} item={item}/>
      ))}
    </div>
  )
}

export default RomsSites