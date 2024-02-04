import { body } from 'express-validator'
import { createStringChain } from './index'

export const videosValidations = {
  title: createStringChain('title').isLength({ max: 40 }).withMessage('Title should be from 1 to 40 symbols'),
  author: createStringChain('author').isLength({ max: 20 }).withMessage('Author should be from 1 to 20 symbols'),
  availableResolutions: body('availableResolutions').optional({ nullable: true }).isArray({ min: 1 }).withMessage('Resolutions should not be empty'),
  canBeDownloaded: body('canBeDownloaded').optional().isBoolean().withMessage('Should be boolean'),
  minAgeRestriction: body('minAgeRestriction').optional({ nullable: true }).custom(isNumber({ min: 1, max: 18 })).withMessage('Restricted age should be between 1 and 18'),
  publicationDate: body('publicationDate').optional().custom(idValidDateString).withMessage('Should be a date-string'),
}

function isNumber(options?: { min?: number, max?: number }) {
  return function (value: any) {
    if (typeof value !== 'number') return false

    let min = options?.min ?? value
    let max = options?.max ?? value

    return value >= min && value <= max
  }
}

function idValidDateString(value: any) {
  if (typeof value !== 'string') return false

  const regex = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/

  return value.match(regex)
}
