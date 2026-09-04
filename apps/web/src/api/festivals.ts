import type {
  Festival,
  FestivalListResponse,
} from '@festival/contracts'

export async function getFestivals(): Promise<FestivalListResponse> {
  const response = await fetch('/api/festivals')

  if (!response.ok) {
    throw new Error('Failed to fetch festivals')
  }

  return response.json()
}

export async function getFestival(
  festivalId: string,
): Promise<{ data: Festival }> {
  const response = await fetch(`/api/festivals/${festivalId}`)

  if (!response.ok) {
    throw new Error('Failed to fetch festival')
  }

  return response.json()
}