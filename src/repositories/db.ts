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
  createdAt: '2024-02-04T02:11:28.944Z',
  id: 777888,
  minAgeRestriction: 18,
  publicationDate: '2024-02-05T02:11:28.944Z',
  title: 'Reactions on JS refactor to TS',
}
