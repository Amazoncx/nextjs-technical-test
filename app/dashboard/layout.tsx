import { ReactNode } from "react";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard search",
};


export default async function LayoutPrivate({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="w-full h-screen">{children}</div>;
}
