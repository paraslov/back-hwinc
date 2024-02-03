import { body } from 'express-validator'

export const createStringChain = (field: string) => body(field).isString().trim().notEmpty()
