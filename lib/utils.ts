import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function resolveAsset(path: string): string {
  if (!path) return ''
  // If already a full URL or data URI, return as-is
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path
  }
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${basePath}${cleanPath}`
}
