"use client";
//REDUX-TOOLKIT
import { Provider } from "react-redux";
import { store } from "./store";
import { JSX } from "react";

export function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <Provider store={store}>{children}</Provider>;
}
