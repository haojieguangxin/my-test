<template>
    <div class="code-main">
        <div class="code-content">
            <div v-if="layoutForm.template">
                <Preview :code="code" @callback="onShowItemEdit"></Preview>
            </div>
            <i class="el-icon-circle-plus-outline add-template" @click="onShowLayout" v-else></i>
        </div>
        <LayoutForm :layoutVisible="layoutVisible" @callback="layoutCallback"></LayoutForm>
        <el-drawer class="edit-dialog" title="编辑" :visible.sync="editItemVisible" width="600px" :modal=false>
            <el-form ref="itemForm" :model="itemForm" label-width="100px">
                <template v-for="(item, index) in itemForm.props" >
                    <el-form-item :label="item.name" label-width='100px' :key="index" :prop="item.name">
                        <!-- 当存在options的时候，说明是下拉选项 -->
                        <template v-if="item.options">
                            <el-select  v-model="item.value">
                                <el-option v-for="oItem in item.options" :key="oItem.value" :value="oItem.value" :label="oItem.label"></el-option>
                            </el-select>
                        </template>
                        <template v-else>
                            <el-input v-model="item.value"></el-input>
                        </template>
                    </el-form-item>
                </template>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editItemVisible = false">取 消</el-button>
                <el-button type="primary" @click="onEditItemOK">确 定</el-button>
            </span>
        </el-drawer>
        <el-drawer title="导出代码配置" :visible.sync="exportVisible" size='580px'>
            <el-form ref="exportForm" :model="exportForm" label-width="100px">
                <el-form-item label="导出位置" label-width='100px' prop="path">
                    <el-input v-model="exportForm.path"></el-input>
                </el-form-item>
                <el-form-item label="文件名称" label-width='100px' prop="fileName">
                    <el-input v-model="exportForm.fileName"></el-input>
                </el-form-item>
            </el-form>
            <div class="drawer-footer">
                <h-button @click="exportVisible = false">取消</h-button>
                <h-button type='primary' @click="onExport">导出</h-button>
            </div>
        </el-drawer>
        <div class="operate">
            <h-button type="primary" @click="onSaveConfig">保存配置</h-button>
            <h-button type="primary" @click="onShowExport">导出代码</h-button>
        </div>
    </div>
</template>

<script>
import fs from 'fs-extra'
import * as snippet from '@/snippet/snippet'
// import * as scriptSnippet from '@/snippet/scriptSnippet'
import Preview from './preview'
import { generateHtml, generateScript } from '@/helper/code_helper'
// import * as config from './config'
import { OPTIONS } from './const'
import LayoutForm from './components/layoutForm'
export default {
    name: 'auto_code',
    components: {
        Preview,
        LayoutForm
    },
    data () {
        return {
            /**
             *  ========  模板选择弹出层 ============
             */
            layoutVisible: false,
            layoutForm: {
                template: '',
                gateway: '',
                business: '',
                url: ''
            },
            backendApis: [],
            /**
             *  ========  组件配置 ============
             */
            editItemVisible: false,
            itemForm: {},
            /**
             *  ========  导出操作 ============
             */
            exportVisible: false,
            code: '',
            codeConfig: [], // 生成Code的Config
            scriptCode: '',
            scriptCodeConfig: {
                data: {},
                methods: []
            },
            exportForm: {
                fileName: 'index',
                path: ''
            },
            options: OPTIONS
        }
    },
    computed: {
        queryParamsOptions () {
            let result = []
            if (this.backendApis.paths) {
                const matchedUrlInfo = Object.keys(this.backendApis.paths).filter(item => item.indexOf(this.layoutForm.url) !== -1)
                if (matchedUrlInfo.length > 0) {
                    if (this.backendApis.paths[matchedUrlInfo[0]].get.parameters) {
                        // 暂时只支持swagger get请求不使用ref的情况  使用ref的时候in='body'
                        result = this.backendApis.paths[matchedUrlInfo[0]].get.parameters.filter(item => item.in === 'query').map(item => {
                            return {
                                label: item.description,
                                value: item.name
                            }
                        })
                    }
                }
            }
            return result
        },
        responseOptions () {
            let result = []
            if (this.backendApis.paths) {
                const matchedUrlInfo = Object.keys(this.backendApis.paths).filter(item => item.indexOf(this.layoutForm.url) !== -1)
                if (matchedUrlInfo.length > 0) {
                    if (this.backendApis.paths[matchedUrlInfo[0]].get.responses) {
                        // 暂时只支持swagger get请求不使用ref的情况  使用ref的时候in='body'
                        const ref = this.backendApis.paths[matchedUrlInfo[0]].get.responses['200'].schema.$ref.replace('#/definitions/', '')
                        result = Object.entries(this.backendApis.definitions[ref].properties).map(([key, value]) => ({
                            label: value.description || key,
                            value: key
                        }))
                    }
                }
            }
            return result
        },
        /**
         * end 这部分是swagger相关信息部分
         */
        itemFormOptions () {
            return Object.keys(this.itemForm).map(item => {
                const result = {
                    key: item,
                    isShow: () => {
                        return !(item === 'type' || (item === 'options' && !this.itemForm.isConst) || (item === 'optionsUrl' && this.itemForm.isConst))
                    }
                }
                return result
            })
        }
    },
    watch: {
        codeConfig: {
            handler (val) {
                // 每次codeConfig发生变化。就重新生成代码进行展示
                this.code = snippet['LAYOUT_SNIPPET'](generateHtml(val, snippet).join('\n\r'))
                console.log(this.code)
            },
            deep: true
        },
        scriptCodeConfig: {
            handler (val) {
                this.scriptCode = generateScript(val)
            },
            deep: true
        }
    },
    methods: {
        onShowLayout () {
            this.layoutVisible = true
        },
        layoutCallback (params) {
            this.layoutVisible = params.layoutVisible
            if (params.backendApis) {
                this.backendApis = params.backendApis
            }
            if (params.layoutForm) {
                this.layoutForm = params.layoutForm
                this.code = snippet[this.layoutForm.template + '_LAYOUT_SNIPPET']
            }
        },
        onShowItemEdit (item) {
            this.editItemVisible = true
            this.itemForm = item.html.filter(i => i.selected)[0]
        },
        onEditItemOK () {
            this.editItemVisible = false
        },
        onAddSelectOption (index, name) {
            this.itemForm[name].splice(index + 1, 0, {label: '', value: ''})
        },
        onRemoveSelectOption (index) {
            this.itemForm[name].splice(index, 1)
        },
        /**
         * 下面的方法，都是保存和导出代码相关方法
         */
        onSaveConfig () {

        },
        onShowExport () {
            this.exportVisible = true
        },
        onExport () {
            if (!this.exportForm.path) {
                this.$alert('请先指定生成代码地址', '提示', {
                    confirmButtonText: '关闭'
                })
                return
            }
            this.exporting = true
            const exportFileName = this.exportForm.fileName + '.vue'
            // 如果没有目录则创建
            fs.ensureDir(this.exportForm.path, (err) => {
                if (err) {
                    this.exporting = false
                    this.$message.success('目录创建失败：' + err)
                } else {
                    const html = '<template>' + this.code + '</template>'
                    const script = this.scriptCode
                    fs.writeFile(this.exportForm.path + '/' + exportFileName, html + script, (err) => {
                        if (err) {
                            this.exporting = false
                            this.$message.success('导出失败：' + err)
                        } else {
                            this.exporting = false
                            this.$message.success('导出成功')
                        }
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.code-main {
    display: flex;
}
.code-content {
    flex-grow: 4;
}
.code-select {
    padding: 10px;
    border-right: 1px solid#ccc;
}
.code-item {
    margin-bottom: 10px;
}
.add-template {
    display: block;
    margin: 0 auto;
    width: 40px;
    font-size: 40px;
    line-height: 100vh;
}
.mask {
    position: absolute;
    display: none;
    background-color: #ccc;
    opacity: 0.5;
}
.mask i {
    width: 100%;
    text-align: center;
    font-size: 20px;
    transform: translateY(50%);
}
.options-item-wrapper {
    padding-left: 20px;
}
.options-item {
    display: flex;
    margin-bottom: 10px;
    padding-right: 10px;
    i {
        padding: 0 5px;
        font-size: 20px;
        line-height: 40px;
    }
}
.operate {
    position: fixed;
    bottom: 10px;
    left: 10px;
}
.drawer-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 12px 24px;
    border-top: 1px solid #e5e5ea;
    background: #fff;
    z-index: 1000;
    button {
        flex: 1;
    }
    .drawer-button {
        text-align: right;
    }
}
.edit-dialog /deep/ .el-dialog .el-input {
    width: 400px;
}
/deep/ .B2b .query-cont__row {
    padding-top: 20px;
    border: 1px dotted;
}
/deep/ .B2b .query-cont__row+.button-cont {
    border: 1px dotted;
}
/deep/ .el-drawer__header>:first-child {
    outline-style: none
}
</style>
