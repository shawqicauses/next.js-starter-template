// DONE REVIEWING: GITHUB COMMIT
const localStorageKey = "TOKEN"

const client = function client(url: string, options?: RequestInit) {
  let token: string | null = null
  if (typeof window !== "undefined") {
    token = localStorage.getItem(localStorageKey)

    const headers: HeadersInit = {"content-type": "application/json"}
    if (token) headers.Authorization = `Bearer ${token}`

    const config: RequestInit = {
      method: options?.method || "GET",
      headers: {...headers, ...options?.headers}
    }

    if (options?.body) config.body = options?.body

    return fetch(
      !/^(https?:)?\/\//.test(url)
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`
        : url,
      config
    ).then((response) => {
      if (response.status === 401) {
        localStorage.removeItem("TOKEN")
        window.location.assign(window.location.origin)
        return Promise.reject(new Error("UN_AUTHENTICATED_USER"))
      }

      if (response.ok) return response.json()
      response.text().then((message) => Promise.reject(new Error(message)))
    })
  }
}

export default client
