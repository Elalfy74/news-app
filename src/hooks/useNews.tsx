import { useInfiniteQuery } from '@tanstack/react-query';

import { axiosInstance } from '@/lib/axios';
import { NewsResponse } from '@/types';

const fetchNews = async (page: number) => {
  const results = await axiosInstance.get<NewsResponse>('/top-headlines', {
    params: {
      country: 'us',
      page,
    },
  });

  return results.data;
};

const useNews = () => {
  return useInfiniteQuery({
    queryKey: ['news'],
    queryFn: ({ pageParam = 1 }) => fetchNews(pageParam),
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
