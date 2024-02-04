import express from 'express'
import { createDB } from './repositories/db'
import { videosRouter } from './routes/videos-routes/videosRouter'
import { RoutesList } from './routes'
import { testingRouter } from './routes/testing/testingRouter'

export const app = express()

const parseBodyMiddleware = express.json()
app.use(parseBodyMiddleware)

export const db = createDB()

app.use(RoutesList.VIDEOS, videosRouter);
app.use(RoutesList.TESTING, testingRouter);

app.get(RoutesList.BASE, (req, res) => {
  res.send('Welcome to joyme studios back-hwinc project')
})
app.get(RoutesList.VERSION, (req, res) => {
  res.json('back-hwinc: v1.2.0')
})
