//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { useEffect, useRef } from 'react';

//-----------------------------------------------------------------------------
// Use Interval
//-----------------------------------------------------------------------------
export const useInterval = (
  callback: any, 
  delay: number
) => {

  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [ callback ])

  useEffect(() => {
    // @ts-ignore
    const handler = (...args: any) => savedCallback && savedCallback.current && savedCallback.current(...args)
    if (delay !== null) {
      const id = setInterval(handler, delay)
      return () => clearInterval(id)
    }
  }, [ delay ])
}

//-----------------------------------------------------------------------------
// Export
//-----------------------------------------------------------------------------
export default useInterval;