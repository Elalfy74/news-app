import { type Article } from '@/types';
import { formatDateTime } from '@/lib/utils';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Dialog,
  DialogContent,
  ImageIcon,
} from '@/components/UI';

export const NewDetailsModal = ({
  newData,
  onClose,
}: {
  newData: Article;
  onClose: () => void;
}) => {
  return (
    <Dialog open={!!newData} onOpenChange={onClose}>
      <DialogContent>
        <div className='mt-5'>
          <div className='w-full mx-auto group'>
            <a href={newData.url} target='_blank'>
              <Avatar className='w-auto rounded-md h-fit'>
                <AvatarImage
                  src={newData.urlToImage ?? ''}
                  className='w-full h-auto aspect-auto'
                />
                <AvatarFallback className='rounded-md h-44 md:h-60'>
                  <ImageIcon className='md:h-40 md:w-40 h-28 w-28 text-gray-400' />
                </AvatarFallback>
              </Avatar>
              <div className='mt-3 space-y-2'>
                <div className='flex justify-between items-center'>
                  <span className='text-indigo-600 text-sm'>
                    {newData.source.name}
                  </span>
                  <span className='text-indigo-600 text-sm'>
                    {formatDateTime(newData.publishedAt)}
                  </span>
                </div>
                <h3 className='text-lg text-gray-800 duration-150 group-hover:text-indigo-600 font-semibold'>
                  {newData.title}
                </h3>
                <p className='text-gray-600 text-sm duration-150 group-hover:text-gray-800'>
                  {newData.content}
                </p>
              </div>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
