import type { ReactNode, SVGProps } from 'react'

const paths = {
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  arrowRight: <path d="M5 12h14m-6-6 6 6-6 6" />,
  bag: (
    <>
      <path d="M5.5 8h13l-1 12.5h-11L5.5 8Z" />
      <path d="M9 8V7a3 3 0 0 1 6 0v1" />
    </>
  ),
  tag: (
    <>
      <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z" />
      <circle cx="7.5" cy="7.5" r="1.25" />
    </>
  ),
  sparkle: (
    <path d="M12 3.5 13.9 9a1.5 1.5 0 0 0 1 1l5.6 2-5.6 2a1.5 1.5 0 0 0-1 1L12 20.5 10.1 15a1.5 1.5 0 0 0-1-1l-5.6-2 5.6-2a1.5 1.5 0 0 0 1-1L12 3.5Z" />
  ),
  gift: (
    <>
      <path d="M4 11h16v9H4zM3 7.5h18V11H3zM12 7.5V20" />
      <path d="M12 7.5S10.5 3.5 8 4.2c-2 .6-1.2 3.3 1 3.3M12 7.5s1.5-4 4-3.3c2 .6 1.2 3.3-1 3.3" />
    </>
  ),
} satisfies Record<string, ReactNode>

export type IconName = keyof typeof paths

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName
}

export function Icon({ name, className = 'size-5', ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {paths[name]}
    </svg>
  )
}
