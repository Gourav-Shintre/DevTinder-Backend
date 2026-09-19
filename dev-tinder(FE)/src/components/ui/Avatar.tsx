import { useState } from 'react'
import { cn } from '@/lib/cn'

interface AvatarProps {
  src?: string
  name: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'h-10 w-10 text-sm',
  md: 'h-14 w-14 text-base',
  lg: 'h-full w-full text-5xl',
}

/** Shows the photo, or the user's initials if there is no photo / it fails to load. */
export function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  const [hasImageError, setHasImageError] = useState(false)
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const showImage = src && !hasImageError

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-rose-100 font-semibold text-rose-600',
        sizeClasses[size],
        className,
      )}
    >
      {showImage ? (
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover"
          onError={() => setHasImageError(true)}
        />
      ) : (
        initials
      )}
    </div>
  )
}
