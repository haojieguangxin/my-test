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

// 代码信息表
if (!db.has('codeInfo').value()) {
    db.set('codeInfo', []).write()
}

// swagger配置表
if (!db.has('swaggerConfig').value()) {
    db.set('swaggerConfig', []).write()
}
export default db
