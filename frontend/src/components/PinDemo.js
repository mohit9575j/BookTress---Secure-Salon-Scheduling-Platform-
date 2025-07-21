"use client";
import React from "react";
import { PinContainer } from "./ui/3d-pin";

export function AnimatedPinDemo() {
  return (
    <div className="h-[30rem] w-full flex items-center justify-center ">
      <PinContainer title="Book Now" href="#">
        <div
          className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
            Modern Haircut
          </h3>
          <div className="text-base !m-0 !p-0 font-normal">
            <span className="text-slate-500 ">
              Book your next haircut with ease and style. Experience the best in modern haircuts with our top-rated salons.
             </span>
          </div>
            <div className="flex flex-1 w-full rounded-lg mt-4 overflow-hidden">
  <img
    src="https://t3.ftcdn.net/jpg/05/06/74/32/360_F_506743235_coW6QAlhxlBWjnRk0VNsHqaXGGH9F4JS.jpg"
    alt="demo"
    className="object-cover w-full h-full rounded-lg"
  />
</div>
        </div>
      </PinContainer>
    </div>
  );
}
