import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const localhostApiBaseUrl = 'http://localhost:8000/api'

export const apiBaseUrl = codespaceName
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`
  : localhostApiBaseUrl

export function buildApiUrl(endpoint) {
  const normalizedEndpoint = endpoint.startsWith('/api/')
    ? endpoint.replace('/api', '')
    : `/${endpoint.replace(/^\/+|\/+$/g, '')}/`

  return `${apiBaseUrl}${normalizedEndpoint}`
}

export function normalizeApiResponse(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.records)) {
    return payload.records
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  return []
}

export function useApiResource(endpoint) {
  const [records, setRecords] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadResource() {
      try {
        setStatus('loading')
        setError('')

        const response = await fetch(buildApiUrl(endpoint), {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`)
        }

        const payload = await response.json()

        setRecords(normalizeApiResponse(payload))
        setStatus('success')
      } catch (requestError) {
        if (requestError.name === 'AbortError') {
          return
        }

        setRecords([])
        setError(requestError.message)
        setStatus('error')
      }
    }

    loadResource()

    return () => controller.abort()
  }, [endpoint])

  return { records, status, error, apiBaseUrl }
}