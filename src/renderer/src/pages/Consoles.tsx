import React from 'react'
import ConsoleCard from '@renderer/components/ui/ConsoleCard'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Console } from '@renderer/types/console'

const Consoles = () => {
    const { extension } = useParams();
    const [consoles, setConsoles] = useState<Console[]>([]);

    useEffect(() => {

        async function load() {
            if (!extension) return;

            try {
                const data = await window.api.fetchConsoles(extension)
                const parsed = JSON.parse(data)

                setConsoles(parsed)

            } catch (err) {
                console.error("Failed to fetch consoles:", err);
            }
        }

        load()

    }, [extension])

    return (
        <div className='grid grid-cols-5 justify-evenly gap-5 mx-14 my-4'>
            {consoles.map((data, index) => (
                <ConsoleCard name={data.name} totalGames={data.totalGames} url={data.url} />
            ))}
        </div>
    )
}

export default Consoles