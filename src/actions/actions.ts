"use server";
import { Pet } from "@/lib/types";
import prisma from "@/lib/db";

export async function addPet(formData) {
  await prisma.pet.create({
    data: {
      name: formData.get("name"),
      ownerName: formData.get("ownerName"),
      imageUrl: formData.get("imageUrl"),
      age: Number(formData.get("age")),
      notes: formData.get("notes"),
    },
  });
}
