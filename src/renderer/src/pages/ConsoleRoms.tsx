import { Link, useParams } from 'react-router-dom'
import { Rom } from '@renderer/types/rom';
import RomCard from '@renderer/components/ui/RomCard';
import usePathStore from '@renderer/store/usePathStore';
import { useRef, useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

const ConsoleRoms = () => {
  const { extension, consoleId } = useParams();
  const { setRomsPath } = usePathStore();
  const loaderRef = useRef<HTMLDivElement>(null);

  if (!extension || !consoleId) return;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery<{ roms: Rom[], pageCount: number }>({
    queryKey: ['roms', extension.toLowerCase(), consoleId],
    queryFn: ({ pageParam }) => window.api.fetchRoms(extension.toLowerCase(), consoleId, pageParam as number),
    getNextPageParam: (lastPage, allPages) => {

      if (lastPage.pageCount && allPages.length < lastPage.pageCount) {
        return allPages.length + 1;
      }

      return undefined;
    },

    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    initialPageParam: 1,

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
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);



  if (status === 'pending') return <div className='flex justify-center items-center h-full'>
    <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white dark:border-white'></div>
  </div>

  if (status === 'error') return <div>Error: {error.message}</div>


  return (

    <div className='m-5 flex flex-wrap justify-evenly gap-6'>

      {data && data?.pages.flatMap((page) => page.roms).map((rom, index) => (

        <Link to={`/${extension?.toLowerCase()}/${consoleId}/${rom.name}`} key={rom.name + index}
          state={{ romUrl: rom.romUrl }}
          className='transition-all duration-200 hover:opacity-80 hover:scale-105 hover:-translate-y-4'
          onClick={() => setRomsPath(`/${extension?.toLowerCase()}/${consoleId}/${rom.name}`)}
        >
          {/* <div className='flex flex-col items-center justify-center text-white'>
          {`/${extension?.toLowerCase()}/${consoleId}/${rom.name}`}
          </div> */}
          
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

export default ConsoleRoms