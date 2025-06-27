// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function POST(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const propertyId = params.id;

//   await prisma.property.update({
//     where: { id: propertyId },
//     data: { status: "approved" },
//   });

//   return NextResponse.redirect(new URL("/dashboard/admin", req.url));
// }


import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This is the correct type for route params in App Router
type RouteContext = {
  params: {
    id: string;
  };
};

export async function POST(
  req: NextRequest,
  context: { params: Record<string, string> }
) {
  const propertyId = context.params.id;

  await prisma.property.update({
    where: { id: propertyId },
    data: { status: "approved" },
  });

  return NextResponse.redirect(new URL("/dashboard/admin", req.url));
}
  