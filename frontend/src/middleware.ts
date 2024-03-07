import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  console.log('Middleware')



  // const token = await getToken({req: request, secret: process.env.JWTKEY as string})
  // console.log({token})
  // console.log({currentUser, pathName: request.nextUrl.pathname, headers: request.headers})
  // if (
  //   currentUser &&
  //   (request.nextUrl.pathname.startsWith('/login') ||
  //     request.nextUrl.pathname.startsWith('/signup'))
  // ) {
  //   return Response.redirect(new URL('/', request.url));
  // }

  // if (
  //   !currentUser &&
  //   !request.nextUrl.pathname.startsWith('/login') &&
  //   !request.nextUrl.pathname.startsWith('/signup')
  // ) {
  //   return Response.redirect(new URL('/login', request.url));
  // }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
