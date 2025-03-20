import { type ReactNode } from "react";

export function Card({
  title,
  children,
  onClick,
}: {
  title: string;
  children: ReactNode;
  href: string;
  onClick?: () => void;
}) {
  return (
    <button
      className="ui-group ui-rounded-lg ui-border ui-border-transparent ui-px-5 ui-py-4 ui-transition-colors hover:ui-border-neutral-700 hover:ui-bg-neutral-800/30"
      rel="noopener noreferrer"
      onClick={onClick}
    >
      <h2 className="ui-mb-3 ui-text-2xl ui-font-semibold">
        {title}{" "}
        <span className="ui-inline-block ui-transition-transform group-hover:ui-translate-x-1 motion-reduce:ui-transform-none">
          -&gt;
        </span>
      </h2>
      <p className="ui-m-0 ui-max-w-[30ch] ui-text-sm ui-opacity-50">
        {children}
      </p>
    </button>
  );
}
