import { useQueryState } from 'nuqs';
import { useEffect } from 'react';

export const countries = [
  {
    value: 'us',
    label: 'United States',
  },
  {
    value: 'ae',
    label: 'United Arab Emirates',
  },
  {
    value: 'ar',
    label: 'Argentina',
  },
];

export const categories = [
  {
    value: 'general',
    label: 'General',
  },
  {
    value: 'business',
    label: 'Business',
  },
  {
    value: 'entertainment',
    label: 'Entertainment',
  },
  {
    value: 'health',
    label: 'Health',
  },
  {
    value: 'sports',
    label: 'Sports',
  },
];

export const useNewsFilter = () => {
  const [country, setCountry] = useQueryState('country', {
    defaultValue: 'us',
  });

  const [category, setCategory] = useQueryState('category', {
    defaultValue: 'general',
  });

  useEffect(() => {
    const newsListEl = document.getElementById('news-list');
    if (!newsListEl) return;

    if (country === 'ae') {
      newsListEl.dir = 'rtl';
    } else {
      newsListEl.dir = 'ltr';
    }
  }, [country]);

  return {
    country: country === '' ? 'us' : country,
    setCountry,
    category: category === '' ? 'general' : category,
    setCategory,
  };
};

export type UseNewsFilterReturnType = ReturnType<typeof useNewsFilter>;
