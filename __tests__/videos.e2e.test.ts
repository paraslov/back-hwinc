import { app, db } from '../src/app'
import { testVideo } from '../src/repositories/db'
import { HttpStatusCode } from '../src/enums/HttpStatusCodes'
import { RoutesList } from '../src/routes'
import { ResolutionsTypes } from '../src/model/videos/VideosEnums'
import supertest = require('supertest')

const request = supertest(app)

describe('/videos route tests: ', () => {
  beforeAll(async () => {

  })

  afterEach(async () => {
    db.videos = []
  })

  it('GET /videos: ', async () => {
    db.videos = [testVideo]

    const res = await request.get(RoutesList.VIDEOS).expect(HttpStatusCode.OK_200)

    expect(res.body.length).toBe(1)
    expect(res.body).toStrictEqual([testVideo])
  })

  it('POST /videos success: ', async () => {
    const res = await request.post(RoutesList.VIDEOS)
      .send({ title: 'Sergio`s JS', author: 'Sergio', availableResolutions: [ResolutionsTypes.P720, ResolutionsTypes.P1080] })
      .expect(HttpStatusCode.CREATED_201)

    expect(res.body.title).toBe('Sergio`s JS')
    expect(res.body.author).toBe('Sergio')
    expect(res.body.availableResolutions).toStrictEqual([ResolutionsTypes.P720, ResolutionsTypes.P1080])
    expect(db.videos.length).toBe(1)
  })

  it('POST /videos bad body data: ', async () => {
    const res = await request.post(RoutesList.VIDEOS)
      .send({ title: '', author: 'Sergio', availableResolutions: [ResolutionsTypes.P720, ResolutionsTypes.P1080] })
      .expect(HttpStatusCode.BAD_REQUEST_400)

    expect(res.body.errorsMessages.length).toBe(1)
    expect(res.body.errorsMessages[0].field).toBe('title')
    expect(db.videos.length).toBe(0)
  })
})
