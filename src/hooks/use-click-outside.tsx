import React from 'react'

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  callback: () => void
) => {
  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [callback, ref])

  return ref
}