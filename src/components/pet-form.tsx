"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePetContext } from "@/lib/hooks";
import PetFormBtn from "./pet-form-btn";

type petFormProps = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

export default function PetForm({
  actionType,
  onFormSubmission,
}: petFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  return (
    <form
      action={async (formData) => {
        onFormSubmission();
        const petData = {
          name: formData.get("name") as string,
          ownerName: formData.get("ownerName") as string,
          imageUrl:
            (formData.get("imageUrl") as string) ||
            "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
          age: Number(formData.get("age")),
          notes: formData.get("notes") as string,
        };

        if (actionType === "add") {
          await handleAddPet(petData);
        } else if (actionType === "edit") {
          await handleEditPet(selectedPet!.id, petData);
        }
      }}
      className="flex flex-col"
    >
      <div className="grid gap-1 py-1">
        <div className="grid grid-cols-4 items-center gap-2">
          <Label htmlFor="name" className="col-span-4">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            defaultValue={actionType === "edit" ? selectedPet?.name : ""}
            className="col-span-4"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-2">
          <Label htmlFor="ownerName" className="col-span-4">
            Owner Name
          </Label>
          <Input
            id="ownerName"
            name="ownerName"
            defaultValue={actionType === "edit" ? selectedPet?.ownerName : ""}
            className="col-span-4"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-2">
          <Label htmlFor="imageUrl" className="col-span-4">
            Image URL
          </Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            defaultValue={actionType === "edit" ? selectedPet?.imageUrl : ""}
            className="col-span-4"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-2">
          <Label htmlFor="age" className="col-span-4">
            Age
          </Label>
          <Input
            id="age"
            name="age"
            defaultValue={actionType === "edit" ? selectedPet?.age : ""}
            className="col-span-4"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-2">
          <Label htmlFor="notes" className="">
            Notes
          </Label>
          <Textarea
            rows={3}
            name="notes"
            className="col-span-4"
            defaultValue={actionType === "edit" ? selectedPet?.notes : ""}
          />
        </div>
      </div>
      <PetFormBtn actionType={actionType} />
    </form>
  );
}
