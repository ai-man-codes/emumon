import ConsoleCard from '@renderer/components/ui/ConsoleCard'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Console } from '@renderer/types/console'

const Consoles = () => {
    const { extension } = useParams();
    if (!extension) return;
    // const [ consoles, setConsoles ] = useState<Console[]>([]); // contains all the data about the consoles

    const { data, isLoading, error } = useQuery<Console[]>({
        queryKey: ['consoles', extension.toLowerCase()],
        queryFn: () => window.api.fetchConsoles(extension.toLowerCase()),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    })

    if (!data) return;

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    // useEffect(() => {

    //     async function load() {
    //         if (!extension) return;

    //         try {
    //             const data = await window.api.fetchConsoles(extension)
    //             setConsoles(data)

    //         } catch (err) {
    //             console.error("Failed to fetch consoles: ", err);
    //         }
    //     }

    //     load()

    // }, [])

    return (
        <div className='grid grid-cols-3 justify-evenly gap-x-14 mx-14 my-4 gap-y-10'>
            {data.map((console, index) => (
                <ConsoleCard key={index} name={console.name} totalGames={console.totalGames} url={console.url} />
            ))}
        </div>
    )
}

export default Consoles