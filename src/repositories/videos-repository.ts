import { db } from '../app'
import { VideosBodyModel } from '../model/videos/VideosBodyModel'
import { VideosViewModel } from '../model/videos/VideosViewModel'

export const videosRepository = {
  async getVideos() {
    return db.videos
  },
  async getVideoById(id?: number) {
    if (typeof id !== 'number') return

    return db.videos.find((video) => video.id === id)
  },
  async createVideo(payload: VideosBodyModel) {
    const createdVideo = this._mapCreatedVideo(payload)

    db.videos.push(createdVideo)

    return createdVideo
  },
  _mapCreatedVideo(payload: VideosBodyModel): VideosViewModel {
    const { title, author, availableResolutions } = payload

    return {
      title,
      author,
      availableResolutions,
      id: Date.now(),
      canBeDownloaded: true,
      minAgeRestriction: 0,
      createdAt: new Date().toDateString(),
      publicationDate: new Date().toDateString(),
    }
  }
}
