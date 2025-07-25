import ConsoleCard from '@renderer/components/ui/ConsoleCard'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Console } from '@renderer/types/console'
import { useState } from 'react'
import SearchRoms from '@renderer/components/SearchRoms'

const Consoles = () => {
    const { extension } = useParams();
    const [searchTerm, setSearchTerm] = useState('');

    if (!extension) return;

    const { data, isLoading, error } = useQuery<Console[]>({
        queryKey: ['consoles', extension.toLowerCase()],
        queryFn: () => window.api.fetchConsoles(extension.toLowerCase()),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    })
 
    if (!data) return;

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <div>
            <div className='flex justify-center items-center h-20 mb-10 '>
                <img src={new URL('../assets/icons/search.png', import.meta.url).href} alt={extension} className='h-10 mr-4 invert px-2 m-[-100px] opacity-80' />
                <input className='w-1/5 border bg-transparent font-mono border-white rounded-full hover:scale-105 p-4 text-white text-xl text-center focus:w-1/3 transition-all duration-200 focus:outline-none'
                    type="text" placeholder='Search' value={searchTerm} spellCheck={false} 
                    onChange={(e) => {
                        setSearchTerm(e.target.value)}
                    } />
            </div>
            {searchTerm && (
                <SearchRoms searchTerm={searchTerm} />
            )}
            {!searchTerm && <div className='grid grid-cols-3 justify-evenly gap-x-14 mx-14 my-4 gap-y-10'>
                {data.map((console, index) => (
                    <ConsoleCard key={index} name={console.name} totalGames={console.totalGames} url={console.url} />
                ))}
            </div>}
        </div>

    )
}

export default Consoles