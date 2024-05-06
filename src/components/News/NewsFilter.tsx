import { UseNewsFilterReturnType, categories, countries } from '@/hooks';
import { Combobox } from '../UI';

export const NewsFilter = ({ filter }: { filter: UseNewsFilterReturnType }) => {
  return (
    <div className='flex gap-4 flex-wrap justify-center'>
      <div className='flex items-center gap-2'>
        <p className='font-medium'>Country:</p>
        <Combobox
          title='Country'
          options={countries}
          value={filter.country}
          onChange={filter.setCountry}
        />
      </div>
      <div className='flex items-center gap-2'>
        <p className='font-medium'>Category:</p>
        <Combobox
          title='Category'
          options={categories}
          value={filter.category}
          onChange={filter.setCategory}
        />
      </div>
    </div>
  );
};
