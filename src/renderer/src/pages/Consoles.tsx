import React from 'react'
import ConsoleCard from '@renderer/components/ui/ConsoleCard'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Consoles = () => {
    const { extension } = useParams();
    const [consoles, setConsoles] = useState<any[]>([])

    useEffect(() => {
        
        async function load() {
            if (!extension) return;

            try {
                const consoles = await window.api.fetchConsoles(extension)
                const objConsoles = JSON.parse(consoles)
                setConsoles(objConsoles); 
            } catch (err) {
                console.error("Failed to fetch consoles:", err);
            }

            console.log(consoles);
        }
        load()

    }, [extension])

    return (
        <div className='text-white p-2 m-3'>
            Hello
        </div>
    )
}

export default Consoles