<template>
    <div class="main-wrap">
        <div class="ope-area">
            <el-button type="primary" @click="onShowSwaggerAdd">新增swagger配置</el-button>
        </div>
        <basicTable :tableData="tableData" :tableLabel="tableLabel" :isShowIndex="true" :pagination="paginationData" @onCurrentChange="onCurrentChange"></basicTable>
        <el-drawer title="新增swagger配置" :visible.sync="swaggerDrawer" :wrapperClosable="false" size="400px" @close="swaggerDrawer = false" @open="onOpenDrawer()">
            <div class="drawer-content">
                <el-form ref="form" :model="form" label-width="100px" @submit.native.prevent>
                    <el-form-item label="业务名：" prop="business">
                        <el-input v-model="form.business" maxlength="50"></el-input>
                    </el-form-item>
                    <el-form-item label="域名：" prop="domain">
                        <el-input v-model="form.domain"></el-input>
                    </el-form-item>
                    <el-form-item label="版本：" prop="version">
                        <el-select v-model="form.version">
                            <el-option v-for="item in versionOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="drawer-footer">
                <div class="drawer-footer-btn flr">
                    <el-button type="primary" @click="onAddSwaggerConfig">确认新增</el-button>
                    <el-button @click="swaggerDrawer = false">取消</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import { findSwaggerConfig, createSwaggerConfig } from '@/model/index'
export default {
    name: 'swagger',
    data () {
        return {
            queryParams: {
                pageSize: 10,
                pageNumber: 1
            },
            tableData: [],
            tableLabel: [
                { label: '业务', prop: 'business' },
                { label: '域名', prop: 'domain' },
                { label: '版本', prop: 'version' }
            ],
            swaggerDrawer: false,
            form: {
                business: '',
                domain: '',
                version: ''
            },
            versionOptions: [
                {label: 'v3', value: 'v3'},
                {label: 'v2', value: 'v2'}
            ],
            paginationData: {}
        }
    },
    methods: {
        findSwaggerConfig () {
            const json = findSwaggerConfig(this.queryParams)
            this.tableData = json.data
            this.paginationData = {
                pageNumber: json.pageNumber,
                pageSize: json.pageSize,
                total: json.total
            }
        },
        onOpenDrawer () {
            this.$nextTick(function () {
                this.$refs.form.resetFields()
            })
        },
        onAddSwaggerConfig () {
            createSwaggerConfig(this.form)
            this.swaggerDrawer = false
            this.findSwaggerConfig()
        },
        onShowSwaggerAdd () {
            this.swaggerDrawer = true
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.findSwaggerConfig()
        }
    },
    mounted () {
        this.findSwaggerConfig()
    }
}
</script>

<style scoped>
.main-wrap {
    padding: 20px;
}
.ope-area {
    margin-bottom: 10px;
}
</style>
