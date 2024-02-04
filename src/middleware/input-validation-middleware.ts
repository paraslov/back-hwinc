import { ValidationError, validationResult } from 'express-validator'
import { NextFunction, Request, Response } from 'express'

// @ts-ignore
export function inputValidationMiddleware(req: Request<any>, res: Response, next: NextFunction) {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = formatErrors(errors.array({ onlyFirstError: true }))

    return res.status(400).json({ errorsMessages: formattedErrors });
  }

  next()
}

function formatErrors(errors: ValidationError[]) {
  return errors.map((error) => {
    return {
      field: error.type === 'field' ? error.path : '',
      message: error.msg,
    }
  })
}
