
"use client"
import { OTPInput, type SlotProps } from 'input-otp'


export default function OtpVerify({ setOtp }: { setOtp: any }) {
  return (


    <OTPInput
      onChange={(value: any) => setOtp(value)}
      maxLength={4}
      containerClassName="group flex items-center has-[:disabled]:opacity-30 justify-center "
      render={({ slots }: { slots: SlotProps[] }) => (
        <div className="flex">
          {slots.slice(0, 4).map((slot, idx) => (
            <Slot key={idx} {...slot} />
          ))}
        </div>
      )}
    />
  )
}

// Feel free to copy. Uses @shadcn/ui tailwind colors.
function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        'relative w-16 h-12 text-[18px] text-white mx-3 bg-[#4a2c1a]/50 ',
        'flex items-center justify-center text-white mx-3 ',
        'transition-all duration-300 text-white mx-3 ',
        ' rounded-l-md rounded-r-md',
        'group-hover:border-accent-foreground/20 group-focus-within:border-accent-foreground/20',
        'bg-[#4a2c1a]/50 border border-[#6e4a2f]',
        { 'outline-1 outline-accent-foreground': props.isActive },
      )}
    >
      <div className="group-has-[input[data-input-otp-placeholder-shown]]:opacity-20">
        {props.char ?? props.placeholderChar}
      </div>
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  )
}

function FakeCaret() {
  return (
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center animate-caret-blink">
      <div className="w-px h-8 bg-white" />
    </div>
  )
}

function FakeDash() {
  return (
    <div className="flex w-10 justify-center items-center">
      <div className="w-3 h-1 rounded-full bg-border" />
    </div>
  )
}

// tailwind.config.ts for the blinking caret animation.
const config = {
  theme: {
    extend: {
      keyframes: {
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
      },
      animation: {
        'caret-blink': 'caret-blink 1.2s ease-out infinite',
      },
    },
  },
}

// Small utility to merge class names.
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
