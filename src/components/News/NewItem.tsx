import { formatDateTime } from '@/lib/utils';
import { Article } from '@/types';

export const NewItem = ({ article }: { article: Article }) => {
  return (
    <div className='rounded-md border p-6 shadow-sm'>
      <h2 className='md:text-xl font-semibold mb-2'>{article.title}</h2>
      <p className='text-sm tracking-wide'>{article.description}</p>
      <p className='text-sm text-right mt-2 text-gray-500'>
        {formatDateTime(article.publishedAt)}
      </p>
    </div>
  );
};
