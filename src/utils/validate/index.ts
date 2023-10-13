import { Request, Response, NextFunction } from 'express'
import { AnyZodObject } from 'zod'
import getHttpCode from '../getHttpCode'
import getResponse from '../getResponse'
import errorHandle from '../errorHandle'
const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params
    })
    return next()
  } catch (error) {
    return getResponse(res, getHttpCode.BAD_REQUEST, 'Gagal', errorHandle(error))
  }
}

export default validate
