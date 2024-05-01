import React from "react";
import { Button } from "./ui/button";

type PetFormBtnProps = {
  actionType: "add" | "edit";
};

export default function PetFormBtn({ actionType }: PetFormBtnProps) {
  return (
    <Button type="submit" className="self-end">
      {actionType === "edit" ? "Edit pet" : "Add pet"}
    </Button>
  );
}
