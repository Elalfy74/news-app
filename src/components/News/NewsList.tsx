import { Fragment, useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import { ReloadIcon } from '@radix-ui/react-icons';

import { useNews } from '@/hooks';
import { type Article } from '@/types';
import { cn } from '@/lib/utils';
import { Button, ErrorAlert, Spinner } from '../UI';

import { NewItem } from './NewItem';
import { NewSkeleton } from './NewSkeleton';
import { NewDetailsModal } from './NewDetailsModal';

export const NewsList = () => {
  const {
    data,
    isPending,
    error,
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useNews();

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
    let errMsg = error.message;

    if (isAxiosError(error)) {
      errMsg = error.response?.data.message;
    }

    return <ErrorAlert errorTitle='Error' errorMessage={errMsg} />;
  }

  if (data.pages?.length === 0 || data.pages[0].articles.length === 0) {
    return (
      <h1 className='text-center text-3xl font-bold'>No Articles Found</h1>
    );
  }

  return (
    <>
      {selectedNew && (
        <NewDetailsModal
          newData={selectedNew}
          onClose={() => setSelectedNew(null)}
        />
      )}

      <Button
        className='mb-4'
        disabled={isRefetching}
        onClick={() => refetch()}
      >
        <ReloadIcon
          className={cn('w-4 h-4 mr-1', isRefetching && 'animate-spin')}
        />
        Refresh
      </Button>

      <ul className='space-y-6'>
        {data.pages.map((page, i) => (
          <Fragment key={i}>
            {page.articles.map((article, i) => (
              <NewItem
                article={article}
                key={article.title + i}
                onClick={() => setSelectedNew(article)}
              />
            ))}
          </Fragment>
        ))}
      </ul>
      {isFetchingNextPage && <Spinner className='mt-6' />}
    </>
  );
};
