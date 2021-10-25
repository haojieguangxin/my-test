import db from '../../database/db.js'

export const findSwaggerConfig = (params) => {
    if (params.pageNumber && params.pageSize) {
        const start = (params.pageNumber - 1) * params.pageSize
        const end = params.pageNumber * params.pageSize
        return {
            pageNumber: params.pageNumber,
            pageSize: params.pageSize,
            total: db.get('swaggerConfig').value().length,
            data: db.get('swaggerConfig').slice(start, end).value()
        }
    }
    return {
        pageNumber: 1,
        pageSize: 10000,
        total: db.get('swaggerConfig').value().length,
        data: db.get('swaggerConfig').value()
    }
}

export const createSwaggerConfig = (params) => db.get('swaggerConfig').insert(params).write()

export const editSwaggerConfig = (params) => db.get('swaggerConfig').find({id: params.id}).assign(params).write()

export const findCodes = (params) => {
    if (params.pageNumber && params.pageSize) {
        const start = (params.pageNumber - 1) * params.pageSize
        const end = params.pageNumber * params.pageSize
        return {
            pageNumber: params.pageNumber,
            pageSize: params.pageSize,
            total: db.get('codeInfo').value().length,
            data: db.get('codeInfo').slice(start, end).value()
        }
    }
    return {
        pageNumber: 1,
        pageSize: 10000,
        total: db.get('codeInfo').value().length,
        data: db.get('codeInfo').value()
    }
}

export const createCode = (params) => db.get('codeInfo').insert(params).write()
