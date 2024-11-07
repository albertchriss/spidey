import React from 'react'
import { ProvidersButton } from './_components/ProvidersButton'
import { auth } from '~/server/auth'
import { redirect } from "next/navigation";

const LandingPage = async () => {
  const session = await auth();
  if (session){
    redirect("/tasklist")
  }
  return (
    <div className='flex flex-col justify-center items-center min-h-screen w-full gap-4'>
      <div className='mb-4 space-y-4'>
        <h1 className="text-7xl font-extrabold text-center">
          Welcome to Spidey
        </h1>
        <p className='text-center text-xl text-slate-500'>
          Your Friendly Neighborhood Tasks Management App
        </p>
      </div>
      {/* <Link href="/api/auth/signIn"> */}
      <ProvidersButton provider='google'/>
      {/* </Link> */}
    </div>
  )
}

export default LandingPage