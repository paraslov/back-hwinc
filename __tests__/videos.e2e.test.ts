import { app, db } from '../src/app'
import supertest = require('supertest')

const request = supertest(app)

describe('/videos', () => {
  beforeAll(async () => {

  })

  afterAll(async () => {
    db.videos = []
  })

  it('GET /videos', async () => {
    db.videos = [{title: 'Boltiks and AI'}]

    const res = await request.get('/videos').expect(200)

    console.log('body: ', res.body)
    expect(res.body.length).toBe(1)
    expect(res.body).toStrictEqual([{title: 'Boltiks and AI'}])
  })
})
