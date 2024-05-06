import { useMemo, useState } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';

import { useNews } from '@/hooks';
import { type Article } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/UI';

import { NewSkeleton } from './NewSkeleton';
import { NewsError } from './NewsError';
import { NewDetailsModal } from './NewDetailsModal';
import { NewsList } from './NewsList';

export const NewsFeed = () => {
  const { data, isPending, error, refetch, isRefetching } = useNews();
  const nonEmptyArticles = useMemo(
    () =>
      data?.articles.filter((article) => article.source.name !== '[Removed]'),
    [data?.articles],
  );

  const [selectedNew, setSelectedNew] = useState<Article | null>(null);

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

  if (!nonEmptyArticles || nonEmptyArticles.length === 0) {
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

      {/* Refresh Button */}
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

      {/* News List */}
      <NewsList news={nonEmptyArticles} onItemClick={setSelectedNew} />
    </>
  );
};
