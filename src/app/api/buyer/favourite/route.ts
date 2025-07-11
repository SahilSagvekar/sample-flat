// // File: /app/api/user/favorites/route.ts

// import { auth } from "@clerk/nextjs/server";
// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const { userId } = await auth();
//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const body = await req.json();
//   const { propertyId } = body;

//   if (!propertyId) {
//     return NextResponse.json({ error: "Property ID required" }, { status: 400 });
//   }

//   try {
//     // Check if the favorite already exists
//     const existing = await prisma.favorite.findUnique({
//       where: {
//         userId_propertyId: {
//           userId,
//           propertyId,
//         },
//       },
//     });

//     if (existing) {
//       return NextResponse.json({ message: "Already favorited" });
//     }

//     // Create new favorite
//     const favorite = await prisma.favorite.create({
//       data: {
//         userId,
//         propertyId,
//       },
//     });

//     return NextResponse.json(favorite);
//   } catch (error) {
//     console.error("Favorite creation error:", error);
//     return NextResponse.json({ error: "Something went wrong", details: error }, { status: 500 });
//   }
// }

// export async function GET() {
//   const { userId } = await auth();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   try {
//     const favorites = await prisma.favorite.findMany({
//       where: { userId },
//       include: {
//         property: true,
//       },
//     });

//     return NextResponse.json(favorites);
//   } catch (error) {
//     console.error("Favorite fetch error:", error);
//     return NextResponse.json({ error: "Something went wrong", details: error }, { status: 500 });
//   }
// }
// export async function DELETE(req: Request) {
//     const { userId } = await auth();
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }
  
//     const body = await req.json();
//     const { propertyId } = body;
  
//     if (!propertyId) {
//       return NextResponse.json({ error: "Property ID required" }, { status: 400 });
//     }
  
//     try {
//       await prisma.favorite.delete({
//         where: {
//           userId_propertyId: {
//             userId,
//             propertyId,
//           },
//         },
//       });
  
//       return NextResponse.json({ message: "Removed from favorites" });
//     } catch (error) {
//       console.error("Favorite deletion error:", error);
//       return NextResponse.json({ error: "Something went wrong", details: error }, { status: 500 });
//     }
//   }

// File: /app/api/user/favorites/route.ts

// 2) import { auth } from "@clerk/nextjs/server";
// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const { userId } = await auth();
//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const body = await req.json();
//   const { propertyId } = body;

//   if (!propertyId) {
//     return NextResponse.json({ error: "Property ID required" }, { status: 400 });
//   }

//   try {
//     const existing = await prisma.favorite.findUnique({
//       where: {
//         userId_propertyId: {
//           userId,
//           propertyId,
//         },
//       },
//     });

//     if (existing) {
//       return NextResponse.json({ message: "Already favorited" });
//     }

//     const favorite = await prisma.favorite.create({
//       data: {
//         userId,
//         propertyId,
//       },
//     });

//     return NextResponse.json(favorite);
//   } catch (error) {
//     console.error("Favorite creation error:", error);
//     return NextResponse.json({ error: "Something went wrong", details: error }, { status: 500 });
//   }
// }

// export async function GET() {
//   const { userId } = await auth();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   try {
//     const favorites = await prisma.favorite.findMany({
//       where: { userId },
//       include: {
//         property: {
//           include: {
//             seller: true,
//           },
//         },
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     return NextResponse.json(favorites);
//   } catch (error) {
//     console.error("Favorite fetch error:", error);
//     return NextResponse.json({ error: "Something went wrong", details: error }, { status: 500 });
//   }
// }

// export async function DELETE(req: Request) {
//   const { userId } = await auth();
//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const body = await req.json();
//   const { propertyId } = body;

//   if (!propertyId) {
//     return NextResponse.json({ error: "Property ID required" }, { status: 400 });
//   }

//   try {
//     await prisma.favorite.delete({
//       where: {
//         userId_propertyId: {
//           userId,
//           propertyId,
//         },
//       },
//     });

//     return NextResponse.json({ message: "Removed from favorites" });
//   } catch (error) {
//     console.error("Favorite deletion error:", error);
//     return NextResponse.json({ error: "Something went wrong", details: error }, { status: 500 });
//   }
// }

//3)

// File: /app/api/user/favorites/route.ts

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { propertyId } = body;

  if (!propertyId) {
    return NextResponse.json({ error: "Property ID required" }, { status: 400 });
  }

  try {
    const existing = await prisma.favorite.findUnique({
      where: {
        userId_propertyId: {
          userId,
          propertyId,
        },
      },
    });

    if (existing) {
      return NextResponse.json({ message: "Already favorited" });
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId,
        propertyId,
      },
    });

    return NextResponse.json(favorite);
  } catch (error) {
    console.error("Favorite creation error:", error);
    return NextResponse.json({ error: "Something went wrong", details: error }, { status: 500 });
  }
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        property: {
          include: {
            seller: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(favorites);
  } catch (error) {
    console.error("Favorite fetch error:", error);
    return NextResponse.json({ error: "Something went wrong", details: error }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { propertyId } = body;

  if (!propertyId) {
    return NextResponse.json({ error: "Property ID required" }, { status: 400 });
  }

  try {
    await prisma.favorite.delete({
      where: {
        userId_propertyId: {
          userId,
          propertyId,
        },
      },
    });

    return NextResponse.json({ message: "Removed from favorites" });
  } catch (error) {
    console.error("Favorite deletion error:", error);
    return NextResponse.json({ error: "Something went wrong", details: error }, { status: 500 });
  }
}

