import type { SVGProps } from "react";

/**
 * Next.js logo icon (simplified mark – uses currentColor for theme).
 */
export function NextJsIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M11.572 0c.946 0 1.687.111 2.357.332.67.222 1.244.535 1.687.95.444.413.756.9.946 1.423.19.523.285 1.09.285 1.687v12.095h-2.59V4.392c0-.413-.063-.756-.19-1.023a1.756 1.756 0 0 0-.602-.697 2.2 2.2 0 0 0-.887-.348 5.9 5.9 0 0 0-1.022-.079H9.358v14.286H6.768V2.357c0-.597.095-1.164.285-1.687.19-.523.502-1.01.946-1.423.443-.415 1.017-.728 1.687-.95C10.357.11 11.098 0 12.044 0h-.472zm9.858 6.857v14.286h-2.59V6.857h2.59z" />
    </svg>
  );
}
