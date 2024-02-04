import { Request, Response, Router } from 'express'
import { VideosViewModel } from '../../model/videos/VideosViewModel'
import { videosRepository } from '../../repositories/videos-repository'
import { RequestBody, RequestParams } from '../../model'
import { VideosBodyModel } from '../../model/videos/VideosBodyModel'
import { HttpStatusCode } from '../../enums/HttpStatusCodes'
import { videosValidations } from '../../validations/videosValidations'
import { inputValidationMiddleware } from '../../middleware/input-validation-middleware'

export const videosRouter = Router()

videosRouter.get('/', async (req: Request, res: Response<VideosViewModel[]>) => {
  const videos = await videosRepository.getVideos()

  res.status(HttpStatusCode.OK_200).json(videos)
})

videosRouter.post('/',
  videosValidations.title,
  videosValidations.author,
  videosValidations.availableResolutions,
  inputValidationMiddleware,
  async (req: RequestBody<VideosBodyModel>, res: Response<VideosViewModel>) => {
  const createdVideo = await videosRepository.createVideo(req.body)

  res.status(HttpStatusCode.CREATED_201).json(createdVideo)
})

videosRouter.get('/:id', async (req: RequestParams<{id: string}>, res: Response<VideosViewModel>) => {
  const video = await videosRepository.getVideoById(Number(req.params.id))

  if (!video) {
    res.sendStatus(HttpStatusCode.NOT_FOUND_404)

    return
  }

  res.status(HttpStatusCode.OK_200).json(video)
})
