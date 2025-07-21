import { RomDetails } from '@renderer/types/romDetails'

const RomDetailsCard = (props: RomDetails) => {
    return (
        <table className='table-auto border-separate border-spacing-x-5 border-spacing-y-4 '>
            <tbody>
                {Object.entries(props).map(([key, value]) => {
                    if (!value) return null;

                    if (key === 'imageUrl') return null
                    if (key === 'downloadPageUrl') return null

                    return (
                        <tr key={key} className=''>
                            <td className='text-white font-mono font-bold border text-center p-2 px-3'>
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </td>
                            <td className='text-white text-l font-mono p-2'>{value}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default RomDetailsCard