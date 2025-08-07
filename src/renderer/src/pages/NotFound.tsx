const NotFound = () => {
  return (
    <div className='w-full h-full'>
        <div className='flex items-center justify-center'>
            <img
            className='h-1/3 mt-24' 
            src={new URL("../assets/images/goon-404.png", import.meta.url).href} alt=" " />
        </div>
    </div>
  )
}

export default NotFound