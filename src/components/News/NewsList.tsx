import { Fragment } from 'react';

import { NewItem } from './NewItem';
import { Article, NewsResponse } from '@/types';

export const NewsList = ({
  news,
  onItemClick,
}: {
  news: NewsResponse[];
  onItemClick: (article: Article) => void;
}) => {
  return (
    <ul className='space-y-6' id='news-list'>
      {news.map((page, i) => (
        <Fragment key={i}>
          {page.articles.map((article, i) => (
            <NewItem
              article={article}
              key={article.title + i}
              onClick={() => onItemClick(article)}
            />
          ))}
        </Fragment>
      ))}
    </ul>
  );
};
