// import { cookies } from 'next/headers';
// import { prisma } from './prisma';

// export async function auth() {
//   const cookieStore = cookies();
//   const token = cookieStore.get('auth_token')?.value;

//   if (!token) {
//     return { userId: null };
//   }

//   try {
//     // Look up the user by their session token
//     const session = await prisma.session.findUnique({
//       where: { token },
//       include: { user: true },
//     });

//     if (!session || !session.user) {
//       return { userId: null };
//     }

//     return {
//       userId: session.user.id,
//       user: session.user,
//     };
//   } catch (error) {
//     console.error('auth() error:', error);
//     return { userId: null };
//   }
// }
