"use client"
import React, { useState } from 'react'
import { Checkbox } from '~/components/ui/checkbox';
import { HiDotsVertical } from "react-icons/hi";

interface TaskRowProps {
    children : React.ReactNode;
    date : string;
    onClick : (isOn: boolean) => void;
}

export const TaskRow = ({ children, date, onClick }: TaskRowProps) => {
    const [isSelected, setIsSelected] = useState(false);
    const onChange = (isOn: boolean) => {
        setIsSelected(!isSelected);
        onClick(isOn);
    }
  return (
    <div className='container border-b border-gray-400'>
        <div className={`grid grid-cols-12 gap-2 px-4 py-2 rounded-md w-full ${!isSelected ? "bg-white" : "bg-slate-300/20"}`}>
            <div className='col-span-1 flex items-center'>
                <Checkbox checked={isSelected} onCheckedChange={() => onChange(isSelected)}/>
            </div>
            
            <div className='col-span-7 flex items-center'>
                <p className="flex-grow">
                    {children}
                </p>
            </div>

            <div className='col-span-3 flex items-center'>
                <p>
                    {date}
                </p>
            </div>

            <div className="col-span-1 flex justify-end items-center">
                <HiDotsVertical />
            </div>

        </div>
    </div>
  )
}