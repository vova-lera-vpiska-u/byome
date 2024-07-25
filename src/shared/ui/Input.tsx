import { InputHTMLAttributes } from 'react'

export const Input = ({
  value,
  setValue,
  forwardedRef,
  ...props
}: {
  value: string
  setValue: (value: string) => void
  forwardedRef: React.RefObject<HTMLInputElement>
} & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      ref={forwardedRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...props}
    />
  )
}
