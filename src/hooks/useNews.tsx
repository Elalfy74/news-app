import { useInfiniteQuery } from '@tanstack/react-query';

import { axiosInstance } from '@/lib/axios';
import { NewsResponse } from '@/types';
import { type UseNewsFilterReturnType } from './useNewsFilter';

const fetchNews = async ({
  pageParam,
  filter,
}: {
  pageParam: number;
  filter: Partial<UseNewsFilterReturnType>;
}) => {
  const results = await axiosInstance.get<NewsResponse>('/top-headlines', {
    params: {
      page: pageParam,
      ...filter,
    },
  });

  return results.data;
};

const useNews = (filter: Partial<UseNewsFilterReturnType>) => {
  return useInfiniteQuery({
    queryKey: ['news', filter],
    queryFn: ({ pageParam = 1 }) => fetchNews({ pageParam, filter }),
    getNextPageParam: (lastPage, allPages) => {
      if (
        lastPage.totalResults > allPages.flatMap((page) => page.articles).length
      ) {
        return allPages.length + 1;
      }
    },
    initialPageParam: 1,
  });
};

export { useNews, fetchNews };
