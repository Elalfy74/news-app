export const NewSkeleton = () => {
  return (
    <div className='rounded-md border p-6 shadow-sm h-[200px]'>
      <div className='animate-pulse flex flex-col h-full'>
        <div className='rounded-md bg-slate-200 h-12 w-[80%] mb-4'></div>
        <div className='rounded-md bg-slate-200 h-full w-[70%]'></div>
        <div className='rounded-md bg-slate-200 h-10 w-36 ml-auto mt-4'></div>
      </div>
    </div>
  );
};
