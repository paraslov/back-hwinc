import { db } from '../app'

export const videosRepository = {
  async getVideos() {
    return db.videos
  }
}
