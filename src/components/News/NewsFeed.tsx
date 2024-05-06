import { useState, useEffect } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';

import { type Article } from '@/types';
import { useNewsFilter, useNews } from '@/hooks';
import { cn } from '@/lib/utils';
import { Button, Spinner } from '@/components/UI';

import { NewSkeleton } from './NewSkeleton';
import { NewsError } from './NewsError';
import { NewDetailsModal } from './NewDetailsModal';
import { NewsFilter } from './NewsFilter';
import { NewsList } from './NewsList';

export const NewsFeed = () => {
  const filter = useNewsFilter();

  const {
    data,
    isPending,
    error,
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useNews({ country: filter.country, category: filter.category });

  const [selectedNew, setSelectedNew] = useState<Article | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        window.innerHeight + document.documentElement.scrollTop + 200;
      const offSet = document.documentElement.offsetHeight;

      if (
        scrollHeight >= offSet &&
        !isFetchingNextPage &&
        !isPending &&
        hasNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isPending]);

  if (isPending) {
    return (
      <div className='w-full space-y-6'>
        {Array.from({ length: 10 }).map((_, i) => (
          <NewSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return <NewsError error={error} />;
  }

  if (
    !data.pages ||
    data.pages.length === 0 ||
    data.pages[0].articles.length === 0
  ) {
    return (
      <h1 className='text-center text-3xl font-bold'>No Articles Found</h1>
    );
  }

  return (
    <>
      {/* New Details Modal */}
      {selectedNew && (
        <NewDetailsModal
          newData={selectedNew}
          onClose={() => setSelectedNew(null)}
        />
      )}

      <NewsFilter filter={filter} />

      {/* Refresh Button */}
      <Button
        className='my-4 gap-1'
        disabled={isRefetching}
        onClick={() => refetch()}
      >
        <ReloadIcon className={cn('w-4 h-4', isRefetching && 'animate-spin')} />
        Refresh
      </Button>

      <NewsList news={data.pages} onItemClick={setSelectedNew} />

      {isFetchingNextPage && <Spinner className='mt-6' />}
    </>
  );
};
