import { z } from 'zod'

export const ArtistSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export const SetSchema = z.object({
  id: z.string(),
  artist: ArtistSchema,
  startTime: z.string(),
  endTime: z.string(),
})

export const StageSchema = z.object({
  id: z.string(),
  name: z.string(),
  sets: z.array(SetSchema),
})

export const FestivalSummarySchema = z.object({
  id: z.string(),
  name: z.string(),
  timezone: z.string(),
  startTime: z.string(),
  endTime: z.string(),
})

export const FestivalSchema = FestivalSummarySchema.extend({
  stages: z.array(StageSchema),
})

export const FestivalListResponseSchema = z.object({
  data: z.array(FestivalSummarySchema),
})

export const FestivalResponseSchema = z.object({
  data: FestivalSchema,
})

export type Artist = z.infer<typeof ArtistSchema>
export type Set = z.infer<typeof SetSchema>
export type Stage = z.infer<typeof StageSchema>
export type FestivalSummary = z.infer<typeof FestivalSummarySchema>
export type Festival = z.infer<typeof FestivalSchema>
export type FestivalListResponse = z.infer<typeof FestivalListResponseSchema>
export type FestivalResponse = z.infer<typeof FestivalResponseSchema>