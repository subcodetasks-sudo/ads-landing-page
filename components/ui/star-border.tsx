import * as React from "react"

import { cn } from "@/lib/utils"

type StarBorderProps<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> & {
    as?: T
    className?: string
    innerClassName?: string
    children?: React.ReactNode
    color?: string
    speed?: React.CSSProperties["animationDuration"]
    thickness?: number
  }

function StarBorder<T extends React.ElementType = "button">({
  as,
  className,
  innerClassName,
  color = "white",
  speed = "6s",
  thickness = 1,
  children,
  style,
  ...rest
}: StarBorderProps<T>) {
  const Component = as || "button"

  return (
    <Component
      className={cn(
        "relative inline-block overflow-hidden rounded-[20px]",
        className
      )}
      style={{
        padding: `${thickness}px`,
        ...style,
      }}
      {...rest}
    >
      <div
        className="absolute inset-0 z-0 rounded-[inherit]"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, ${color} 0, transparent 10%),
            radial-gradient(circle at 80% 35%, ${color} 0, transparent 8%),
            radial-gradient(circle at 35% 80%, ${color} 0, transparent 9%),
            conic-gradient(
              from 0deg,
              transparent 0deg,
              transparent 285deg,
              ${color} 320deg,
              transparent 345deg,
              transparent 360deg
            )
          `,
          animation: `star-border-spin ${speed} linear infinite`,
          filter: "saturate(1.35) brightness(1.25)",
        }}
      />
      <div
        className="absolute inset-0 z-0 rounded-[inherit] opacity-90 blur-lg"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, ${color} 0, transparent 12%),
            radial-gradient(circle at 80% 35%, ${color} 0, transparent 10%),
            radial-gradient(circle at 35% 80%, ${color} 0, transparent 11%),
            conic-gradient(
              from 180deg,
              transparent 0deg,
              transparent 285deg,
              ${color} 320deg,
              transparent 345deg,
              transparent 360deg
            )
          `,
          animation: `star-border-spin ${speed} linear infinite reverse`,
          filter: "saturate(1.4) brightness(1.3)",
        }}
      />
      <div
        className={cn(
          "relative z-1 rounded-[20px] border border-gray-800 bg-linear-to-b from-black to-gray-900 px-6.5 py-4 text-center text-[16px] text-white",
          innerClassName
        )}
      >
        {children}
      </div>
    </Component>
  )
}

export default StarBorder
