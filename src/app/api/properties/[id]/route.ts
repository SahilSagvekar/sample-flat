// app/api/properties/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: Request, { params }: Params) {
  try {
    const property = await prisma.property.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, property });
  } catch (error: any) {
    console.error("❌ Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// export async function DELETE(req: Request, { params }: { params: { id: string } }) {
//   const { userId } = await auth();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   try {
//     // Check ownership first
//     const property = await prisma.property.findUnique({
//       where: { id: params.id },
//     });

//     if (!property || property.userId !== userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     await prisma.property.delete({
//       where: { id: params.id },
//     });
//     return NextResponse.json({ success: true });
//   } catch (err) {
//     return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
//   }
// }

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  // ✅ Must await this
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = context.params;

  // Optional: check if property belongs to user before deleting
  const property = await prisma.property.findUnique({
    where: { id },
  });

  // if (!property || property.userId !== userId) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  await prisma.property.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
