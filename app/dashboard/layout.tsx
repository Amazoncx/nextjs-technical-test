import { ReactNode } from "react";
import './style.css'

export default async function LayoutPrivate({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="p-10 max-w-6xl mx-auto max-sm:p-4 max-sm:min-h-dvh bg-slate-100">
    {children}
  </div>;
}
