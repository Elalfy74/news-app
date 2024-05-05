import { type Article } from '@/types';
import { formatDateTime } from '@/lib/utils';

export const NewItem = ({
  article,
  onClick,
}: {
  article: Article;
  onClick: () => void;
}) => {
  return (
    <div
      className='rounded-md border p-6 shadow-sm cursor-pointer'
      onClick={onClick}
    >
      <h2 className='md:text-xl font-semibold mb-2'>{article.title}</h2>
      <p className='text-sm tracking-wide'>{article.description}</p>
      <p className='text-sm text-right mt-2 text-gray-500'>
        {formatDateTime(article.publishedAt)}
      </p>
    </div>
  );
};
