import useExtensionStore from '@renderer/store/useExtensionStore'
import { SearchRom } from '@renderer/types/searchRom'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import RomCard from '@renderer/components/ui/RomCard'
import usePathStore from '@renderer/store/usePathStore'

const SearchRoms = ({ searchTerm }: { searchTerm: string }) => {
    const { extension } = useExtensionStore()
    const loaderRef = useRef<HTMLDivElement>(null);
    const { setRomsPath, setConsolesPath } = usePathStore();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        error,
    } = useInfiniteQuery<{ roms: SearchRom[], pageCount: number }>({
        queryKey: ['roms', extension.toLowerCase(), searchTerm],
        queryFn: ({ pageParam }) => window.api.searchRoms(extension.toLowerCase(), pageParam as number, searchTerm),
        getNextPageParam: (lastPage, allPages) => {

            if (lastPage.pageCount && allPages.length < lastPage.pageCount) {
                return allPages.length + 1;
            }

            return undefined;
        },
        initialPageParam: 1,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        })

        if (loaderRef.current) observer.observe(loaderRef.current)

        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current)
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage])

    if (status === 'pending') return <div className='flex justify-center items-center h-full'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white dark:border-white'></div>
    </div>

    if (status === 'error') return <div>Error: {error.message}</div>

    return (
        <div className='m-3 flex flex-wrap justify-evenly gap-4'>

        {data && data?.pages.flatMap((page) => page.roms).map((rom, index) => (
  
          <Link to={`/${extension?.toLowerCase()}/${rom.consoleId}/${rom.name}`} key={rom.name + index}
            state={{ romUrl: rom.romUrl }}
            className='transition-all duration-200 hover:opacity-80 hover:scale-105 hover:-translate-y-4'
            onClick={() => {
                setRomsPath(`/${extension?.toLowerCase()}/${rom.consoleId}/${rom.name}`)
                setConsolesPath(`/${extension?.toLowerCase()}/${rom.consoleId}`)
            }}
          >
  
            <RomCard name={rom.name} imageUrl={rom.imageUrl} />
  
          </Link>
        ))}
  
        {hasNextPage && (
          <div ref={loaderRef} className='col-span-10 text-center text-gray-400 py-4'>
            {isFetchingNextPage ? 'Loading more ROMs...' : 'Scroll to load more'}
          </div>
        )}
      </div>
    )
}

export default SearchRoms