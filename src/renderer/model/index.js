import db from '../../database/db.js'
import axios from 'axios'

export const findCities = (params) => {
    if (params.pageNumber && params.pageSize) {
        const start = (params.pageNumber - 1) * params.pageSize
        const end = params.pageNumber * params.pageSize
        return {
            pageNumber: params.pageNumber,
            pageSize: params.pageSize,
            total: db.get('cityInfo').value().length,
            data: db.get('cityInfo').slice(start, end).value()
        }
    }
    return {
        pageNumber: 1,
        pageSize: 10000,
        total: db.get('cityInfo').value().length,
        data: db.get('cityInfo').value()
    }
}

export const createCity = (params) => db.get('cityInfo').insert(params).write()

export const findProducts = (params) => {
    if (params.pageNumber && params.pageSize) {
        const start = (params.pageNumber - 1) * params.pageSize
        const end = params.pageNumber * params.pageSize
        return {
            pageNumber: params.pageNumber,
            pageSize: params.pageSize,
            total: db.get('productInfo').value().length,
            data: db.get('productInfo').slice(start, end).value()
        }
    }
    return {
        pageNumber: 1,
        pageSize: 10000,
        total: db.get('productInfo').value().length,
        data: db.get('productInfo').value()
    }
}

export const createProduct = (params) => db.get('productInfo').insert(params).write()

export const findOrderSources = (params) => {
    if (params.pageNumber && params.pageSize) {
        const start = (params.pageNumber - 1) * params.pageSize
        const end = params.pageNumber * params.pageSize
        return {
            pageNumber: params.pageNumber,
            pageSize: params.pageSize,
            total: db.get('orderSourceInfo').value().length,
            data: db.get('orderSourceInfo').slice(start, end).value()
        }
    }
    return {
        pageNumber: 1,
        pageSize: 10000,
        total: db.get('orderSourceInfo').value().length,
        data: db.get('orderSourceInfo').value()
    }
}

export const createOrderSource = (params) => db.get('orderSourceInfo').insert(params).write()

export const findOrderList = (params) => {
    if (params.pageNumber && params.pageSize) {
        const start = (params.pageNumber - 1) * params.pageSize
        const end = params.pageNumber * params.pageSize
        return {
            pageNumber: params.pageNumber,
            pageSize: params.pageSize,
            total: db.get('orderInfo').value().length,
            data: db.get('orderInfo').slice(start, end).value()
        }
    }
    return {
        pageNumber: 1,
        pageSize: 10000,
        total: db.get('orderInfo').value().length,
        data: db.get('orderInfo').value()
    }
}

export const createOrderInfo = (params) => db.get('orderInfo').insert(params).write()

export const findOrderInfo = (params) => db.get('orderInfo').filter(params).value()

export const findSalesPlans = (params) => {
    if (params.pageNumber && params.pageSize) {
        const start = (params.pageNumber - 1) * params.pageSize
        const end = params.pageNumber * params.pageSize
        return {
            pageNumber: params.pageNumber,
            pageSize: params.pageSize,
            total: db.get('salesPlan').value().length,
            data: db.get('salesPlan').slice(start, end).value()
        }
    }
    return {
        pageNumber: 1,
        pageSize: 10000,
        total: db.get('salesPlan').value().length,
        data: db.get('salesPlan').value()
    }
}

export const createSalesPlan = (params) => db.get('salesPlan').insert(params).write()

export const findSalesPlanByMonth = ({ beginMonth, endMonth }) => {
    const data = db.get('salesPlan').filter(function (item) {
        return item.month >= beginMonth && item.month <= endMonth
    }).value()
    return data
}

export const findOrderByMonth = ({ beginMonth, endMonth }) => {
    return db.get('orderInfo').filter(function (item) {
        const orderTime = item.orderTime.substr(0, 7)
        return orderTime >= beginMonth && orderTime <= endMonth
    }).value()
}

export const findDistrictOptions = () => axios.get('https://restapi.amap.com/v3/config/district?key=9b0253ef1009aa4c752dda63b04bc35f&subdistrict=2')
