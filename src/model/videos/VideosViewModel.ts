import { ResolutionsTypes } from './VideosEnums'

export type VideosViewModel = {
  id?: number
  title: string
  author: string
  canBeDownloaded?: boolean
  minAgeRestriction?: number
  createdAt?: string
  publicationDate?: string
  availableResolutions?: ResolutionsTypes[]
}
