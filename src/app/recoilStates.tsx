"use client";

import { atom, RecoilRoot } from "recoil";
import React from "react";

export const apiDataState = atom({
  key: "apiDataState",
  default: [],
});

export const previousSearchesState = atom({
  key: "previousSearchesState",
  default: [] as { query: string; results: any[] }[],
});

export default function RecoilContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
