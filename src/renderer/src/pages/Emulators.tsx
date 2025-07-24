import EmulatorCard from '@renderer/components/ui/EmulatorCard'
import { useQuery } from '@tanstack/react-query'
import { Emulator } from '@renderer/types/emulator'
import { emulatorKeys } from '@renderer/query/queryKeys'

function Emulators() {
  const { data, isLoading, error } = useQuery<Emulator[]>({
    queryKey: emulatorKeys.all,
    queryFn: () => window.api.fetchEmulators(),
  })

  if (!data) return;

  if (isLoading) return
  if (error) return <div>Error: {error.message}</div>


  return (
    <div className='grid grid-cols-4 gap-4 items-center' >
      {data.map((emulator) => (
        <EmulatorCard key={emulator.name} name={emulator.name} iconUrl={new URL(emulator.iconUrl, import.meta.url).href} downloadUrl={emulator.downloadUrl} />
      ))}
    </div>
  )
}

export default Emulators