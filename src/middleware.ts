// import { clerkMiddleware, getAuth } from '@clerk/nextjs/server';
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export default clerkMiddleware(async (auth, req: NextRequest) => {
//   const { userId, sessionId } = await auth();

//   // If not logged in, let Clerk handle it
//   if (!userId || !sessionId) return NextResponse.next();

//   // Fetch the user's role using getAuth
//   const { sessionClaims } = getAuth(req);
//   const role = (sessionClaims?.publicMetadata as { role?: string })?.role;

//   const pathname = req.nextUrl.pathname;

//   // 🛑 Block access to /dashboard/seller for buyers
//   if (pathname.startsWith('/dashboard/seller') && role !== 'seller') {
//     return NextResponse.redirect(new URL('/unauthorized', req.url));
//   }

//   // 🛑 Block access to /dashboard/buyer for sellers
//   if (pathname.startsWith('/dashboard/buyer') && role !== 'buyer') {
//     return NextResponse.redirect(new URL('/unauthorized', req.url));
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: [
//     // Skip static files and Next internals
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };


// middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Match everything except static files and Next.js internals
    '/((?!_next|.*\\..*).*)',
    // Include API routes explicitly
    '/(api|trpc)(.*)',
  ],
};
