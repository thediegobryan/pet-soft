"use client";
import { addPet } from "@/actions/actions";
import { Pet } from "@/lib/types";
import React, { createContext, useState } from "react";

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleChangeSelectedPetId: (id: string) => void;
  handleCheckoutPet: (id: string) => void;
  handleAddPet: (newPet: Omit<Pet, "id">) => void;
  handleEditPet: (editedPet: Pet) => void;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  data: pets,
  children,
}: PetContextProviderProps) {
  //State
  // const [pets, setPets] = useState(data);

  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  //Derived State
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = pets.length;
  //Event Handlers
  const handleAddPet = async (newPet: Omit<Pet, "id">) => {
    // await addPet(newPet);
    // setPets((prevPets) => [
    //   ...prevPets,
    //   { id: Date.now().toString(), ...newPet },
    // ]);
  };

  const handleEditPet = (editedPet: Pet) => {};

  const handleCheckoutPet = (id: string) => {
    setSelectedPetId(null);
  };

  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };
  return (
    <PetContext.Provider
      value={{
        pets,
        numberOfPets,
        selectedPetId,
        selectedPet,
        handleChangeSelectedPetId,
        handleCheckoutPet,
        handleAddPet,
        handleEditPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
