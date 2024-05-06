import { type Article } from '@/types';

import { NewItem } from './NewItem';

export const NewsList = ({
  news,
  onItemClick,
}: {
  news: Article[];
  onItemClick: (article: Article) => void;
}) => {
  return (
    <ul className='space-y-6'>
      {news.map((article, i) => (
        <NewItem
          article={article}
          key={article.title + i}
          onClick={() => onItemClick(article)}
        />
      ))}
    </ul>
  );
};
