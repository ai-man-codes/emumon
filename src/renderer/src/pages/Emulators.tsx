import EmulatorCard from '@renderer/components/ui/EmulatorCard'
import { useQuery } from '@tanstack/react-query'
import { Emulator } from '@/main/types/emulator'

function Emulators() {
  const { data, isLoading, error } = useQuery<Emulator[]>({
    queryKey: ['emulators'],
    queryFn: () => window.api.fetchEmulators(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })

  if (!data) return;

  if (isLoading) return
  if (error) return <div>Error: {error.message}</div>


  return (
    <div className='grid grid-cols-4 gap-4 items-center' >
      {data.map((emulator) => (
        console.log(emulator),
        <EmulatorCard key={emulator.name} name={emulator.name} iconUrl={new URL(emulator.iconUrl, import.meta.url).href} downloadUrl={emulator.downloadUrl} />
      ))}
    </div>
  )
}

export default Emulators