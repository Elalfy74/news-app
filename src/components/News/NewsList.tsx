import { isAxiosError } from 'axios';

import { useNews } from '@/hooks';
import { ErrorAlert, Spinner } from '../UI';

import { NewItem } from './NewItem';
import { NewSkeleton } from './NewSkeleton';
import { useMemo } from 'react';

export const NewsList = () => {
  const { data, isPending, error } = useNews();

  const nonEmptyArticles = useMemo(
    () =>
      data?.articles.filter((article) => article.source.name !== '[Removed]'),
    [data?.articles],
  );

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

  return (
    <ul className='space-y-6'>
      {nonEmptyArticles?.map((article, i) => (
        <NewItem article={article} key={article.title + i} />
      ))}
    </ul>
  );
};
