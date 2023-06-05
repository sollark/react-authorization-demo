import { Request, Response, NextFunction } from 'express'

const sensitiveData = ['__v', '_id', 'identifier']

export function deleteSensitiveData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log('deleteSensitiveData middleware')

  const originalJson = res.json
  res.json = function (body) {
    if (body) {
      deleteSensitivePropertiesRecursive(body)
    }
    return originalJson.call(this, body)
  }

  next()
}

function deleteSensitivePropertiesRecursive(obj: any) {
  if (Array.isArray(obj)) {
    obj.forEach((item) => deleteSensitivePropertiesRecursive(item))
  } else if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (sensitiveData.includes(key)) {
          console.log('deleting', key)
          delete obj[key]
          console.log('deleted', obj[key])
        } else {
          deleteSensitivePropertiesRecursive(obj[key])
        }
      }
    }
  }
}
