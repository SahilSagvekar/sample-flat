// lib/api.ts
import { prisma } from "@/lib/prisma";

export async function getAllProperties() {
  try {
    const properties = await prisma.property.findMany({
      // No need to filter by id not null, as id is always present
      where: {},
      orderBy: {
        createdAt: "desc",
      },
    });

    return properties;
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}
