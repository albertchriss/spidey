import React from 'react'
import { auth } from '~/server/auth'
import { SignOutButton } from '../_components/SignOutButton';

const CalendarPage = async () => {
    const session = await auth();
  return (
    <div>
        <p>
            { JSON.stringify(session)} 
        </p>
        <SignOutButton />
    </div>
  )
}

export default CalendarPage