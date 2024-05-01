"use client";

import { usePetContext } from "@/lib/hooks";
import Image from "next/image";
import React from "react";
import PetButton from "./pet-button";
import { Pet } from "@prisma/client";

export default function PetDetails() {
  const { selectedPet } = usePetContext();

  return (
    <section className="flex flex-col h-full w-full">
      {!selectedPet ? (
        <EmptyView />
      ) : (
        <>
          <TopBar pet={selectedPet} />
          <OtherInfo pet={selectedPet} />
          <Note pet={selectedPet} />
        </>
      )}
    </section>
  );
}

type Props = {
  pet: Pet;
};

function TopBar({ pet }: Props) {
  const { handleCheckoutPet } = usePetContext();

  return (
    <div className="flex items-center bg-white px-8 py-5 border-b border-black/[.08]">
      <Image
        src={pet.imageUrl}
        alt="Selected Pet Image"
        height={75}
        width={75}
        className="h-[75px] w-[75px] rounded-full object-cover"
      />
      <h2 className="text-3xl font-semibold leading-7 ml-5">{pet.name}</h2>
      <div className="ml-auto flex gap-3">
        <PetButton actionType="edit">Edit</PetButton>
        <PetButton
          actionType="checkout"
          onClick={async () => {
            await handleCheckoutPet(pet.id);
          }}
        >
          Checkout
        </PetButton>
      </div>
    </div>
  );
}

function OtherInfo({ pet }: Props) {
  return (
    <div className="flex justify-between py-10 px-5 text-center">
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">
          Owner Name
        </h3>
        <p className="mt-1 text-lg text-zinc-800">{pet.ownerName}</p>
      </div>
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">Age</h3>
        <p className="mt-1 text-lg text-zinc-800">{pet.age}</p>
      </div>
    </div>
  );
}

function Note({ pet }: Props) {
  return (
    <div className="flex-1 bg-white px-7 py-5 rounded-md mx-5 mb-5 border border-light">
      {pet?.notes}
    </div>
  );
}

function EmptyView() {
  return (
    <div className="h-full flex justify-center items-center">
      <p className="text-2xl font-medium">No Pet Selected</p>
    </div>
  );
}
