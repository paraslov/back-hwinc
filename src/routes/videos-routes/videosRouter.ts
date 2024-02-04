import { Request, Response, Router } from 'express'
import { VideosViewModel } from '../../model/videos/VideosViewModel'
import { videosRepository } from '../../repositories/videos-repository'
import { RequestBody, RequestParams, RequestParamsBody } from '../../model'
import { VideosBodyModel } from '../../model/videos/VideosBodyModel'
import { HttpStatusCode } from '../../enums/HttpStatusCodes'
import { videosValidations } from '../../validations/videosValidations'
import { inputValidationMiddleware } from '../../middleware/input-validation-middleware'
import { IdParamsModel } from '../../model/URIParamsModel'

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

videosRouter.get('/:id', async (req: RequestParams<IdParamsModel>, res: Response<VideosViewModel>) => {
  const video = await videosRepository.getVideoById(Number(req.params.id))

  if (!video) {
    res.sendStatus(HttpStatusCode.NOT_FOUND_404)

    return
  }

  res.status(HttpStatusCode.OK_200).json(video)
})

videosRouter.put('/:id',
  videosValidations.title,
  videosValidations.author,
  videosValidations.availableResolutions,
  videosValidations.canBeDownloaded,
  videosValidations.minAgeRestriction,
  videosValidations.publicationDate,
  inputValidationMiddleware,
  async (req: RequestParamsBody<IdParamsModel, VideosBodyModel>, res: Response<VideosViewModel>) => {
    const isVideoUpdated = await videosRepository.updateVideo(Number(req.params.id), req.body)

    if (!isVideoUpdated) {
      res.sendStatus(HttpStatusCode.NOT_FOUND_404)

      return
    }

    res.sendStatus(HttpStatusCode.NO_CONTENT_204)
  })
