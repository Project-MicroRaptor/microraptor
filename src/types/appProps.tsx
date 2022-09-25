import type { NextComponentType, NextPage } from "next"
import type { AppProps } from "next/app"

//Add custom appProp type then use union to add it
export type AuthAppProps = AppProps & {
  Component: NextComponentType & {requireAuth?: boolean} // add auth type
};

export type AuthNextPage = NextPage & {requireAuth?: boolean};
