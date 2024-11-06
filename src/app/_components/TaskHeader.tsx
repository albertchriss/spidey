"use client"
import React, { useState } from 'react'

import { HiDotsVertical } from "react-icons/hi";

interface TaskHeaderProps {
    children : React.ReactNode;
    date : string;
}

export const TaskHeader = ({ children, date }: TaskHeaderProps) => {
  return (
    <div className='container border-b border-gray-400'>
        <div className= "grid grid-cols-12 gap-2 px-4 py-3 rounded-t-md w-full bg-gray-500/20" >
            <div className='col-span-1 flex items-center'>
                <p className="flex-grow text-slate-700 text-lg">
                    Select
                </p>
            </div>
            
            <div className='col-span-7 flex items-center'>
                <p className="flex-grow text-slate-700 text-lg">
                    {children}
                </p>
            </div>

            <div className='col-span-4 flex items-center'>
                <p className="text-slate-700 text-lg">
                    {date}
                </p>
            </div>


        </div>
    </div>
  )
}