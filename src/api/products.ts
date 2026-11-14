import type { Product, ProductInput } from '../types'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000'

interface ApiResponse<T> {
  status: boolean
  message: string
  data: T
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  let response: Response
  try {
    response = await fetch(`${API_URL}/api/products${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
    })
  } catch {
    throw new Error('Tidak dapat terhubung ke server. Pastikan backend sudah berjalan.')
  }

  const body = (await response.json().catch(() => null)) as ApiResponse<T> | null
  if (!response.ok || !body?.status) {
    throw new Error(body?.message ?? `Terjadi kesalahan (${response.status})`)
  }
  return body.data
}

export const getProducts = () => request<Product[]>('')

export const createProduct = (input: ProductInput) =>
  request<Product>('', { method: 'POST', body: JSON.stringify(input) })

export const updateProduct = (id: number, input: ProductInput) =>
  request<Product>(`/${id}`, { method: 'PUT', body: JSON.stringify(input) })

export const deleteProduct = (id: number) => request<Product>(`/${id}`, { method: 'DELETE' })
