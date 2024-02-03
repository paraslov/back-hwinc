import { Router } from 'express'
import { db } from '../../app'
import { HttpStatusCode } from '../../enums/HttpStatusCodes'

export const testingRouter = Router()

testingRouter.delete('/all-data', (req, res) => {
  db.videos = []

  res.sendStatus(HttpStatusCode.NO_CONTENT_204)
})
