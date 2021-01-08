<template>
    <div id="wrapper">
        <div>
            <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
            <div class="welcome">IoT简易销售系统</div>
            <div class="tips">数据库地址：{{address}}</div>
            <div class="tips">
                <el-button @click="onShowBackup">备份数据</el-button>
            </div>
        </div>
        <el-drawer title="数据备份" :visible.sync="backupDrawer" :wrapperClosable="false" size="400px" @close="backupDrawer = false" >
            <div class="drawer-content">
                <el-form label-width="100px" @submit.native.prevent>
                    <el-form-item label="备份地址：" prop="backupPath">
                        <el-input v-model="backupPath" placeholder="请填写备份地址"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="drawer-footer">
                <div class="drawer-footer-btn flr">
                    <el-button type="primary" :loading="backuping" @click="onBackup">备份</el-button>
                    <el-button @click="backupDrawer = false">取消</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import { remote } from 'electron'
import fs from 'fs-extra'
import moment from 'moment'
export default {
    name: 'landing-page',
    data () {
        return {
            backupPath: '',
            backuping: false,
            backupDrawer: false
        }
    },
    computed: {
        address () {
            return remote.app.getPath('userData')
        }
    },
    methods: {
        onBackup () {
            if (!this.backupPath) {
                this.$alert('请先指定备份地址', '提示', {
                    confirmButtonText: '关闭'
                })
                return
            }
            this.backuping = true
            const backupFileName = moment(new Date()).format('YYYYMMDDHHMMSS') + 'Backup.json'
            // 如果没有目录则创建
            fs.ensureDir(this.backupPath, (err) => {
                if (err) {
                    this.backuping = false
                    this.$message.success('目录创建失败：' + err)
                } else {
                    fs.copy(this.address + '/data.json', this.backupPath + '/' + backupFileName, (err) => {
                        if (err) {
                            this.backuping = false
                            this.$message.success('备份失败：' + err)
                        } else {
                            this.backuping = false
                            this.$message.success('备份成功')
                        }
                    })
                }
            })
        },
        onShowBackup () {
            this.backupDrawer = true
        }
    }
}
</script>

<style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body { font-family: 'Source Sans Pro', sans-serif; }

#wrapper {
    background:
      radial-gradient(
          ellipse at top left,
          rgba(255, 255, 255, 1) 40%,
          rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
}

.welcome {
    margin-top: 80px;
    text-align: center;
    width: 100vw;
    color: #555;
    font-size: 48px;
}
.tips {
    margin-top: 80px;
    text-align: center;
    width: 100vw;
    color: #555;
}
</style>
