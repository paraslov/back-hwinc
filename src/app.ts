import express, { Request, Response } from 'express'
import { createDB } from './db'

export const app = express()
app.use(express.json())

export const db = createDB()

type ParamsType = {
  id: string
}

export const getVideos = (req: Request<ParamsType>, res: Response) => {
  res.status(200).json(db.videos)
}

app.get('/videos', getVideos);
