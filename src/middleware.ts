import authConfig from "~/server/auth.config"
import NextAuth from "next-auth"
import { NextRequest, NextResponse } from "next/server"
 
const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req: NextRequest) {
  // Your custom middleware logic goes here
  const session = await auth();
  const { nextUrl } = req;
  

  const ApiAuthPrefix = "/api/auth/";

  const isLoggedIn = !!session;

  if (nextUrl.pathname.startsWith(ApiAuthPrefix)){
    return NextResponse.next();
  }

  if (nextUrl.pathname == "/"){
    if (isLoggedIn){
        return Response.redirect(new URL("/calendar", nextUrl))
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && nextUrl.pathname != "/"){
    return Response.redirect(new URL("/", nextUrl))
  }

  return NextResponse.next();

})

export const config = {
    matcher: [// Skip Next.js internals and all static files, unless found in search params
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      // Always run for API routes
      '/(api|trpc)(.*)',
    // '/'
  ],
  }