import { useEffect, useState } from 'react'

export const useWindowSize = () => {
  const [size, setSize] = useState([
    typeof window !== 'undefined' && window.innerWidth,
    typeof window !== 'undefined' && window.innerHeight
  ])

  useEffect(() => {
    const handler = () => {
      setSize([window.innerWidth, window.innerHeight])
    }

    window.addEventListener('resize', handler)

    return () => {
      window.removeEventListener('resize', handler)
    }
  }, [])

  return size
}
