import { VideosViewModel } from '../model/videos/VideosViewModel'
import { ResolutionsTypes } from '../model/videos/VideosEnums'

export const createDB = (): DbModel => {
  return {
    videos: [
      testVideo,
    ]
  }
}

type DbModel = {
  videos: VideosViewModel[]
}

export const testVideo = {
  author: 'Sergio',
  availableResolutions: [ResolutionsTypes.P720, ResolutionsTypes.P1080, ResolutionsTypes.P480],
  canBeDownloaded: true,
  createdAt: '2023-08-08',
  id: 1,
  minAgeRestriction: 18,
  publicationDate: '2023-07-08',
  title: 'Reactions on JS refactor to TS',
}
