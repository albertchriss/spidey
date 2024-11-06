"use client"
import React, { useState } from 'react'
import { SignOutButton } from '~/app/_components/SignOutButton'
import { TaskTable } from '~/app/_components/TaskTable';
import { OptionBar } from '~/app/_components/OptionBar';

const CalendarPage = () => {
  const [showOptionBar, setShowOptionBar] = useState(false);
  const onSelect = (isOn: boolean) => {
    if (isOn){
      setShowOptionBar(true);
    }
    else{
      setShowOptionBar(false);
    }
  }
  return (
    <div className='flex flex-col items-center min-h-screen h-full font-inter my-2 w-full '>
        
        <SignOutButton />
        <TaskTable onSelect={(isOn) => onSelect(isOn)}/>
        
        {
          showOptionBar 
          ? <OptionBar />
          : null
        }

    </div>
  )
}

export default CalendarPage