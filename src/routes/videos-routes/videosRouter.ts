import { Request, Response, Router } from 'express'
import { VideosViewModel } from '../../model/videos/VideosViewModel'
import { videosRepository } from '../../repositories/videos-repository'

export const videosRouter = Router()

videosRouter.get('/', async (req: Request, res: Response<VideosViewModel[]>) => {
  const videos = await videosRepository.getVideos()

  res.status(200).json(videos)
})
