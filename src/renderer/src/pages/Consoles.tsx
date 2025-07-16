import React from 'react'
import ConsoleCard from '@renderer/components/ui/ConsoleCard'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Console } from '@renderer/types/console'
import useExtensionStore from '@renderer/store/useExtensionStore'

const Consoles = () => {
    const { extension } = useParams();
    const [ consoles, setConsoles ] = useState<Console[]>([]); // contains all the data about the consoles

    useEffect(() => {

        async function load() {
            if (!extension) return;

            try {
                const data = await window.api.fetchConsoles(extension)
                const parsed = JSON.parse(data)

                setConsoles(parsed)

            } catch (err) {
                console.error("Failed to fetch consoles: ", err);
            }
        }

        load()

    }, [])

    return (
        <div className='grid grid-cols-3 justify-evenly gap-x-14 mx-14 my-4 gap-y-10'>
            {consoles.map((data, index) => (
                <ConsoleCard key={index} name={data.name} totalGames={data.totalGames} url={data.url} />
            ))}
        </div>
    )
}

export default Consoles