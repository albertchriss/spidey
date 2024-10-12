import React from 'react'
import { auth } from '~/server/auth'
import { SignOutButton } from '../_components/SignOutButton';

const CalendarPage = async () => {
    const session = await auth();
  return (
    <div className='flex flex-col items-center min-h-screen font-inter my-2'>
        <p>
            { JSON.stringify(session)} 
        </p>
        <SignOutButton />
    </div>
  )
}

export default CalendarPage