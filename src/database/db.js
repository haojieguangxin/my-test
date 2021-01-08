import Datastore from 'lowdb'
import LodashId from 'lodash-id'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
import fs from 'fs-extra'
import { remote, app } from 'electron'

const APP = process.type === 'renderer' ? remote.app : app
const STORE_PATH = APP.getPath('userData')

if (process.type !== 'renderer') {
    if (!fs.pathExistsSync(STORE_PATH)) {
        fs.mkdirpSync(STORE_PATH)
    }
}
console.log(STORE_PATH)
const adapter = new FileSync(path.join(STORE_PATH, '/data.json'))

const db = Datastore(adapter)
db._.mixin(LodashId)

// 城市信息表
if (!db.has('cityInfo').value()) {
    db.set('cityInfo', []).write()
}
// 商品表
if (!db.has('productInfo').value()) {
    db.set('productInfo', []).write()
}
// 订单信息表
if (!db.has('orderInfo').value()) {
    db.set('orderInfo', []).write()
}
// 订单来源表
if (!db.has('orderSourceInfo').value()) {
    db.set('orderSourceInfo', []).write()
}
// 销售计划表
if (!db.has('salesPlan').value()) {
    db.set('salesPlan', []).write()
}

export default db
