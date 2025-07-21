import SelectPath from '@renderer/components/settings/SelectPath'

function Settings() {
  return (
    <div className='h-full w-full'>
      <div className='flex flex-col gap-4 p-4 ml-10'>
        <SelectPath />
      </div>
    </div>
  )
}

export default Settings