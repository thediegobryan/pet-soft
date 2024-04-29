"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePetContext } from "@/lib/hooks";
import { addPet, editPet } from "@/actions/actions";
import PetFormBtn from "./pet-form-btn";
import { toast } from "sonner";
import { act } from "react-dom/test-utils";

type petFormProps = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

export default function PetForm({
  actionType,
  onFormSubmission,
}: petFormProps) {
  const { selectedPet } = usePetContext();

  return (
    <form
      action={async (formData) => {
        if (actionType === "add") {
          const error = await addPet(formData);
          if (error) {
            toast.error(error.message);
            return;
          }
        } else if (actionType === "edit") {
          const error = await editPet(selectedPet!.id, formData);
          if (error) {
            toast.error(error.message);
            return;
          }
        }
        onFormSubmission();
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
