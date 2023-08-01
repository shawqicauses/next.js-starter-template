// DONE REVIEWING: GITHUB COMMIT
import {useEffect, useReducer, useRef} from "react"
import client from "../helpers/client"

interface State<T> {
  data?: T
  error?: Error
}

type Cache<T> = {[url: string]: T}

// Discriminated Union Type
type Action<T> =
  | {type: "data/loading"}
  | {type: "data/loaded"; payload: T}
  | {type: "error"; payload: Error}

const useFetch = function useFetch<T = unknown>(
  url?: string,
  options?: RequestInit
): State<T> {
  const cache = useRef<Cache<T>>({})

  // Used to prevent state update if component is unmounted
  const requestCancel = useRef<boolean>(false)

  const stateInitial: State<T> = {
    data: undefined,
    error: undefined
  }

  // Keep state logic separated
  const fetchReducer = function fetchReducer(
    state: State<T>,
    action: Action<T>
  ): State<T> {
    switch (action.type) {
      case "data/loading":
        return {...stateInitial}
      case "data/loaded":
        return {...stateInitial, data: action.payload}
      case "error":
        return {...stateInitial, error: action.payload}
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(fetchReducer, stateInitial)

  useEffect(() => {
    // Do nothing if url is not given
    if (!url) return

    requestCancel.current = false

    const fetchData = async function fetchData() {
      dispatch({type: "data/loading"})

      // IF a cache exists for this url return it
      if (cache.current[url]) {
        dispatch({type: "data/loaded", payload: cache.current[url]})
        return
      }

      try {
        const data = await client(url, options)
        cache.current[url] = data
        if (requestCancel.current) return
        dispatch({type: "data/loaded", payload: data})
      } catch (error) {
        if (requestCancel.current) return
        dispatch({type: "error", payload: error as Error})
      }
    }

    fetchData()

    // Use clean-up function for avoiding a possibly ..
    // .. state update after component was rendered
    return () => {
      requestCancel.current = true
    }
  }, [url, options])

  return state
}

export default useFetch
