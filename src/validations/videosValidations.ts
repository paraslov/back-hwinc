import { body } from 'express-validator'
import { createStringChain } from './index'

export const videosValidations = {
  title: createStringChain('title').isLength({ max: 40 }).withMessage('Title should be from 1 to 40 symbols'),
  author: createStringChain('author').isLength({ max: 20 }).withMessage('Title should be from 1 to 20 symbols'),
  availableResolutions: body('availableResolutions').optional().isArray().notEmpty(),
}
