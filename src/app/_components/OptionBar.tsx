import React from 'react'
import { Checkbox } from '~/components/ui/checkbox';
import { HiCheck } from "react-icons/hi";
import { HiCheckCircle } from "react-icons/hi";
import { HiTrash } from "react-icons/hi";

export const OptionBar = () => {
    return(
        <div className="fixed bottom-0 w-full h-fit bg-slate-600 border-b border-zinc-300 z-[100]">
            <div className="h-full flex items-center justify-between gap-2 px-5 py-2 w-full">
                <div className='flex gap-4 justify-evenly items-center'>
                    <Checkbox className='border-secondary data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground w-6 h-6'/>
                    <h2 className='text-white text-xl'>Select All</h2>
                </div>
                <div className='flex gap-4 justify-evenly items-center'>
                    <div className='flex items-center gap-2 hover:bg-slate-500 p-2 rounded-md justify-evenly'>
                        <HiCheckCircle className='text-white w-8 h-8'/>
                        <p className='text-white'>Mark as completed</p>
                    </div>
                    <div className='flex items-center gap-2 hover:bg-slate-500 p-2 rounded-md justify-center'>
                        <HiTrash className='text-white w-8 h-8'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

