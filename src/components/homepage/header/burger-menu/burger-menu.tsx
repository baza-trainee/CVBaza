import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";

import Image from "next/image";

import { MenuContent } from "./menu-content";

export const BurgerMenu = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const layerRef = useRef<HTMLDivElement>(null);
  const closeMenu = () => setOpen(false);
  useEffect(() => {
    layerRef.current?.addEventListener("click", closeMenu);
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => layerRef.current!.removeEventListener("click", closeMenu);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  return (
    <>
      <div
        className="block lg:hidden transition-all ease-out duration-300  absolute top-0 z-50 w-full ms:w-[70%]  md:w-[50%]  h-screen bg-blue-900"
        style={
          open
            ? { transform: "translateX(0)", opacity: 1 }
            : { transform: "translateX(-100%)", opacity: 0 }
        }
      >
        <MenuContent closeMenu={closeMenu} />
        <span className="absolute block right-3 top-4 size-10 text-white" onClick={closeMenu}>
          <div className="relative size-full fill-white">
            <Image src={"/icons/cross.svg"} fill alt="cross" />
          </div>
        </span>
      </div>
      <div
        ref={layerRef}
        className="fixed top-0 z-40 w-screen h-screen bg-[rgba(255, 255, 255, 0.7)] backdrop-blur"
        style={open ? { display: "block" } : { display: "none" }}
      ></div>
    </>
  );
};
