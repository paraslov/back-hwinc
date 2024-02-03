import { Request, Response, Router } from 'express'
import { VideosViewModel } from '../../model/videos/VideosViewModel'
import { videosRepository } from '../../repositories/videos-repository'
import { RequestBody } from '../../model'
import { VideosBodyModel } from '../../model/videos/VideosBodyModel'
import { HttpStatusCode } from '../../enums/HttpStatusCodes'

export const videosRouter = Router()

videosRouter.get('/', async (req: Request, res: Response<VideosViewModel[]>) => {
  const videos = await videosRepository.getVideos()

  res.status(HttpStatusCode.OK_200).json(videos)
})

videosRouter.post('/', async (req: RequestBody<VideosBodyModel>, res: Response<VideosViewModel>) => {
  const createdVideo = await videosRepository.createVideo(req.body)

  res.status(HttpStatusCode.CREATED_201).json(createdVideo)
})
