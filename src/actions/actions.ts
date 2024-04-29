"use server";
import { Pet } from "@/lib/types";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { sleep } from "@/lib/utils";

export async function addPet(formData: FormData) {
  // await sleep(2000);
  try {
    await prisma.pet.create({
      data: {
        name: formData.get("name") as string,
        ownerName: formData.get("ownerName") as string,
        imageUrl:
          (formData.get("imageUrl") as string) ||
          "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
        age: Number(formData.get("age")),
        notes: formData.get("notes") as string,
      },
    });
  } catch {
    return {
      message: "Could not add pet",
    };
  }

  revalidatePath("/app", "layout");
}

export async function editPet(petId: string, formData: FormData) {
  // await sleep(2000);

  try {
    await prisma.pet.update({
      where: {
        id: petId,
      },
      data: {
        name: formData.get("name") as string,
        ownerName: formData.get("ownerName") as string,
        imageUrl: formData.get("imageUrl") as string,
        age: Number(formData.get("age")),
        notes: formData.get("notes") as string,
      },
    });
  } catch {
    return {
      message: "Could not edit pet",
    };
  }
  revalidatePath("/app", "layout");
}

export async function deletePet(petId: string) {
  // await sleep(2000);
  try {
    await prisma.pet.delete({
      where: {
        id: petId,
      },
    });
  } catch {
    return {
      message: "Could not delete pet",
    };
  }
  revalidatePath("/app", "layout");
}
