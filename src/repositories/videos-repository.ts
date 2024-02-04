import { db } from '../app'
import { VideosBodyModel } from '../model/videos/VideosBodyModel'
import { VideosViewModel } from '../model/videos/VideosViewModel'
import { testVideo } from './db'

export const videosRepository = {
  async getVideos() {
    return db.videos
  },
  async getVideoById(id: number) {
    return this._findVideoById(id)
  },
  async createVideo(payload: VideosBodyModel) {
    const createdVideo = this._mapCreatedVideo(payload)

    db.videos.push(createdVideo)

    return createdVideo
  },
  async updateVideo(id: number, payload: VideosBodyModel) {
    const updatedVideo = this._findVideoById(id)

    if (updatedVideo) {
      db.videos = db.videos.map((video) => {
        if (video.id === id) {
          return {
            ...video,
            canBeDownloaded: false,
            ...payload,
          }
        }
        return video
      })
    }

    return !!updatedVideo
  },
  async deleteVideo(id: number) {
    const video = this._findVideoById(id)

    if (video) {
      db.videos = db.videos.filter((video) => video.id !== id)
    }

    return !!video
  },
  _mapCreatedVideo(payload: VideosBodyModel): VideosViewModel {
    const { title, author, availableResolutions } = payload

    return {
      title,
      author,
      availableResolutions,
      id: Date.now(),
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: testVideo.createdAt,
      publicationDate: testVideo.publicationDate,
    }
  },
  _findVideoById(id: number) {
    return db.videos.find((video) => video.id === id)
  }
}
