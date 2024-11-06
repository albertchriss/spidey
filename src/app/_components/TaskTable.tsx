"use client"
import React, { useState } from 'react'
import { TaskRow } from './TaskRow'
import { TaskHeader } from './TaskHeader';

interface TaskTableProps {
    onSelect: (setOn: boolean) => void;
}

export const TaskTable = ( { onSelect } : TaskTableProps) => {
    const [numSelected, setNumSelected] = useState(0);
    const [isAllSelected, setIsAllSelected] = useState(false);

    const onClick = (isOn: boolean) => {
        if (isOn) {
            setNumSelected(numSelected - 1);
            if (numSelected-1 === 0){
                onSelect(false)
            }
            else{
                onSelect(true)
            }
        } else {
            setNumSelected(numSelected + 1);
            onSelect(true)
        }
    }
  return (
    <div className='flex flex-col w-full max-w-7xl'>
        {/* table title */}
        <h1 className='text-3xl font-bold mb-2'>Your Tasks</h1>

        {/* table content */}
        <div className='flex flex-col w-full mb-2'>
            {/* table header */}
            <TaskHeader date='Deadline'>Task Title</TaskHeader>

            <TaskRow onClick={(isOn) => onClick(isOn)} date='20-20-20'>Task 1</TaskRow>
            <TaskRow onClick={(isOn) => onClick(isOn)} date='28-10-22'>Task 2</TaskRow>
        </div>

        {/* table footer */}
        <div className='flex justify-between w-full mt-2'> 
            <p className='text-slate-500'>{numSelected} selected</p>
        </div>


    </div>
  )
}
