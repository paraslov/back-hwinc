import { app, db } from '../src/app'
import { testVideo } from '../src/repositories/db'
import { HttpStatusCode } from '../src/enums/HttpStatusCodes'
import { RoutesList } from '../src/routes'
import { ResolutionsTypes } from '../src/model/videos/VideosEnums'
import supertest = require('supertest')

const request = supertest(app)

const updateVideoBody = {
  "title": "Updated title",
  "author": "Updated author",
  "availableResolutions": [ ResolutionsTypes.P144, ResolutionsTypes.P2160 ],
  "canBeDownloaded": true,
  "minAgeRestriction": 18,
  "publicationDate": "2024-02-04T00:54:17.719Z"
}

describe('/videos route tests: ', () => {
  beforeAll(async () => {
  })

  beforeEach(async () => {
    await request.delete(`${RoutesList.TESTING}/all-data`)
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

  it('POST /videos bad title: ', async () => {
    const res = await request.post(RoutesList.VIDEOS)
      .send({ title: '', author: 'Sergio', availableResolutions: [ResolutionsTypes.P720, ResolutionsTypes.P1080] })
      .expect(HttpStatusCode.BAD_REQUEST_400)

    expect(res.body.errorsMessages.length).toBe(1)
    expect(res.body.errorsMessages[0].field).toBe('title')
    expect(res.body.errorsMessages[0].message).toStrictEqual(expect.any(String))
    expect(db.videos.length).toBe(0)
  })

  it('POST /videos bad author: ', async () => {
    const res = await request.post(RoutesList.VIDEOS)
      .send({ title: 'Sergio`s JS', author: '', availableResolutions: [ResolutionsTypes.P720, ResolutionsTypes.P1080] })
      .expect(HttpStatusCode.BAD_REQUEST_400)

    expect(res.body.errorsMessages.length).toBe(1)
    expect(res.body.errorsMessages[0].field).toBe('author')
    expect(res.body.errorsMessages[0].message).toStrictEqual(expect.any(String))
    expect(db.videos.length).toBe(0)
  })

  it('POST /videos bad availableResolutions: ', async () => {
    const res = await request.post(RoutesList.VIDEOS)
      .send({ title: 'Sergio`s JS', author: 'Sergio', availableResolutions: [] })
      .expect(HttpStatusCode.BAD_REQUEST_400)

    expect(res.body.errorsMessages.length).toBe(1)
    expect(res.body.errorsMessages[0].field).toBe('availableResolutions')
    expect(res.body.errorsMessages[0].message).toStrictEqual(expect.any(String))
    expect(db.videos.length).toBe(0)
  })

  it('GET /videos by id success: ', async () => {
    db.videos = [testVideo]

    const res = await request.get(`${RoutesList.VIDEOS}/${testVideo.id}`).expect(HttpStatusCode.OK_200)

    expect(res.body).toStrictEqual(testVideo)
  })

  it('GET /videos by id not found: ', async () => {
    db.videos = [testVideo]

    await request.get(`${RoutesList.VIDEOS}/91827398123981293871`).expect(HttpStatusCode.NOT_FOUND_404)
  })

  it('PUT /videos by id success: ', async () => {
    db.videos = [testVideo]

    await request.put(`${RoutesList.VIDEOS}/${testVideo.id}`)
      .send(updateVideoBody)
      .expect(HttpStatusCode.NO_CONTENT_204)

    expect(db.videos.length).toBe(1)
    expect(db.videos[0].title).toBe(updateVideoBody.title)
    expect(db.videos[0].availableResolutions).toStrictEqual(updateVideoBody.availableResolutions)
    expect(db.videos[0].id).toStrictEqual(testVideo.id)
  })

  it('PUT /videos by id nullable success: ', async () => {
    db.videos = [testVideo]

    await request.put(`${RoutesList.VIDEOS}/${testVideo.id}`)
      .send({ ...updateVideoBody, availableResolutions: null, minAgeRestriction: null })
      .expect(HttpStatusCode.NO_CONTENT_204)

    expect(db.videos.length).toBe(1)
    expect(db.videos[0].minAgeRestriction).toBe(null)
    expect(db.videos[0].availableResolutions).toStrictEqual(null)
    expect(db.videos[0].id).toStrictEqual(testVideo.id)
  })

  it('PUT /videos by id bad minAgeRestriction: ', async () => {
    db.videos = [testVideo]

    const res = await request.put(`${RoutesList.VIDEOS}/${testVideo.id}`)
      .send({ ...updateVideoBody, minAgeRestriction: 22 })
      .expect(HttpStatusCode.BAD_REQUEST_400)

    expect(res.body.errorsMessages.length).toBe(1)
    expect(res.body.errorsMessages[0].field).toBe('minAgeRestriction')
    expect(res.body.errorsMessages[0].message).toStrictEqual(expect.any(String))
    expect(db.videos.length).toBe(1)
    expect(db.videos[0].id).toStrictEqual(testVideo.id)
    expect(db.videos[0].minAgeRestriction).toStrictEqual(testVideo.minAgeRestriction)
  })

  it('PUT /videos by id bad canBeDownloaded: ', async () => {
    db.videos = [testVideo]

    const res = await request.put(`${RoutesList.VIDEOS}/${testVideo.id}`)
      .send({ ...updateVideoBody, canBeDownloaded: 22 })
      .expect(HttpStatusCode.BAD_REQUEST_400)

    expect(res.body.errorsMessages.length).toBe(1)
    expect(res.body.errorsMessages[0].field).toBe('canBeDownloaded')
    expect(res.body.errorsMessages[0].message).toStrictEqual(expect.any(String))
    expect(db.videos.length).toBe(1)
    expect(db.videos[0].id).toStrictEqual(testVideo.id)
    expect(db.videos[0].canBeDownloaded).toStrictEqual(testVideo.canBeDownloaded)
  })

  it('PUT /videos by id bad publicationDate: ', async () => {
    db.videos = [testVideo]

    const res = await request.put(`${RoutesList.VIDEOS}/${testVideo.id}`)
      .send({ ...updateVideoBody, publicationDate: null })
      .expect(HttpStatusCode.BAD_REQUEST_400)

    expect(res.body.errorsMessages.length).toBe(1)
    expect(res.body.errorsMessages[0].field).toBe('publicationDate')
    expect(res.body.errorsMessages[0].message).toStrictEqual(expect.any(String))
    expect(db.videos.length).toBe(1)
    expect(db.videos[0].id).toStrictEqual(testVideo.id)
    expect(db.videos[0].publicationDate).toStrictEqual(testVideo.publicationDate)
  })
})
