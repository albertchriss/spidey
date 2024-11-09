import { Skeleton } from "~/components/ui/skeleton";


export const TableSkeleton = () => {
  return (
    <div className="mt-[60px] flex h-full w-full max-w-7xl flex-col items-center px-[3%]">
      <div className="flex w-full py-1">
        <Skeleton className="mb-2 h-[46px] w-[20%]" />
      </div>
      <div className="flex w-full flex-col items-center border-b border-gray-400">
        <Skeleton className="h-[50px] w-full" />
      </div>
      <div className="flex w-full flex-col items-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <div className="grid w-full grid-cols-12 rounded-md border-b border-gray-400 px-4 py-2" key={index}>
            <div className="col-span-1 flex items-center">
              <Skeleton className="h-[25px] w-[50%]" />
            </div>
            <div className="col-span-7 flex items-center">
              <Skeleton className={`h-[25px] w-[50%]`} />
            </div>
            <div className="col-span-3 flex items-center">
              <Skeleton className={`h-[25px] w-[60%]`} />
            </div>
            <div className="col-span-1 flex items-center justify-end">
              <Skeleton className="h-[25px] w-[20%]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
