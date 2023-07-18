import { useEffect, useState } from 'react'

export const useElementSize = (element?: HTMLElement | null) => {
  const [size, setSize] = useState([
    element?.clientWidth || 0,
    element?.clientHeight || 0
  ])

  useEffect(() => {
    if (!element) {
      return
    }

    setSize([element.clientWidth, element.clientHeight])

    const handler = () => {
      setSize([element.clientWidth, element.clientHeight])
    }

    window.addEventListener('resize', handler)

    return () => {
      window.removeEventListener('resize', handler)
    }
  }, [element])

  return size
}
