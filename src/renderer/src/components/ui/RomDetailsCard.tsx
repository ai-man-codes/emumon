import { RomDetails } from '@renderer/types/romDetails'
import React from 'react'
import { Link } from 'react-router-dom'

const RomDetailsCard = ({ downloadPageUrl, downloadCount,  }: RomDetails) => {
    return (
        <div className='flex flex-col'>
            <div>
                <span>Total Downloads :</span>
                <span></span>
            </div>
        </div>
    )
}

export default RomDetailsCard