interface TaskFooterProps {
    numSelected: number;
}

export const TaskFooter = ({numSelected}: TaskFooterProps) => {
  return (
    <div className="mt-2 flex w-full">
      <p className="text-slate-500">{numSelected} selected</p>
    </div>
  );
};
