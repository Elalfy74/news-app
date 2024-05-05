import { useQuery } from '@tanstack/react-query';

import { axiosInstance } from '@/lib/axios';
import { NewsResponse } from '@/types';

const fetchNews = async () => {
  const results = await axiosInstance.get<NewsResponse>('/top-headlines', {
    params: {
      country: 'us',
    },
  });

  return results.data;
};

const useNews = () => {
  return useQuery({
    queryKey: ['news'],
    queryFn: () => fetchNews(),
  });
};

export { useNews, fetchNews };
