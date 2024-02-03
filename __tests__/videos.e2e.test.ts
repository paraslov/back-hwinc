import { app, db } from '../src/app'
import supertest = require('supertest')
import { testVideo } from '../src/repositories/db'

const request = supertest(app)

describe('/videos route tests: ', () => {
  beforeAll(async () => {

  })

  afterAll(async () => {
    db.videos = []
  })

  it('GET /videos: ', async () => {
    db.videos = [testVideo]

    const res = await request.get('/videos').expect(200)

    expect(res.body.length).toBe(1)
    expect(res.body).toStrictEqual([testVideo])
  })
})
