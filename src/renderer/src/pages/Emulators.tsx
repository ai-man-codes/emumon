import EmulatorCard from '@renderer/components/ui/EmulatorCard'
import { useQuery } from '@tanstack/react-query'
import { Emulator } from '@renderer/types/emulator'
import { emulatorKeys } from '@renderer/query/queryKeys'
import { useEffect, useState } from 'react'
import { useDownloadStore } from '@renderer/store/useDownloadStore'

function Emulators() {

  const [installedEmulators, setInstalledEmulators] = useState<{ emulatorName: string, downloadPath: string }[]>([])
  const { downloadHappened, setDownloadHappened } = useDownloadStore()

  const { data, isLoading, error } = useQuery<Emulator[]>({
    queryKey: emulatorKeys.all,
    queryFn: () => window.api.fetchEmulators(),
  })

  useEffect(() => {
    window.emulators.getAll().then((emulators) => {
      setInstalledEmulators(emulators)
      setDownloadHappened(!downloadHappened)
    })
  }, [downloadHappened])

  if (!data) return;

  if (isLoading) return
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className='grid grid-cols-4 gap-4 items-center p-4' >
      {data?.map((emulator) => {
        let isInstalled: boolean = false
        installedEmulators.forEach((installedEmulator) => {
          if (installedEmulator.emulatorName === emulator.name) {
            isInstalled = true
          }
        })
        
        return (
        <EmulatorCard 
            key={emulator.name} 
            name={emulator.name} 
            iconUrl={new URL(emulator.iconUrl, import.meta.url).href} 
            downloadUrl={emulator.downloadUrl} 
            isInstalled={isInstalled}
          />
        )
      })}
    </div>
  )
}

export default Emulators