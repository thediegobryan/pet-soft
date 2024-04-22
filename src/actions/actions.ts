"use server";
import { Pet } from "@/lib/types";
import prisma from "@/lib/db";

export async function addPet(formData: FormData) {
  await prisma.pet.create({
    data: {
      name: formData.get("name") as string,
      ownerName: formData.get("ownerName") as string,
      imageUrl: formData.get("imageUrl") as string,
      age: Number(formData.get("age")),
      notes: formData.get("notes") as string,
    },
  });
}
