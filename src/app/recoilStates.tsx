"use client";

import { atom, RecoilRoot } from "recoil";
import React from "react";

export const apiDataState = atom({
  key: "apiDataState",
  default: [],
});

export default function RecoilContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
