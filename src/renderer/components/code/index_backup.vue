<template>
    <div class="code-main">
        <div class="code-content" @click="onProxy">
            <div v-if="layout">
                <Preview :code="code" :codeConfig="codeConfig" :scriptCodeConfig="scriptCodeConfig"></Preview>
            </div>
            <i class="el-icon-circle-plus-outline add-template" @click="onShowLayout" v-else></i>
        </div>
        <el-dialog title="选择模板" :visible.sync="layoutVisible" width="500px" :modal=false>
            <el-form ref="layoutForm" :model="layoutForm" :rules="layoutRules" label-width="100px">
                <el-form-item label="模板:" label-width='100px' prop='template'>
                    <el-select v-model="layoutForm.template" clearable>
                        <el-option v-for="(item, index) in layoutOptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <template v-if="layoutForm.template === 'LIST'">
                    <el-form-item label="网关:" label-width='100px' prop='gateway'>
                        <el-select v-model="layoutForm.gateway" clearable>
                            <el-option v-for="(item, index) in gatewayOptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="业务:" label-width='100px' prop='business'>
                        <el-select v-model="layoutForm.business" clearable>
                            <el-option v-for="(item, index) in businessOptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="列表URL:" label-width='100px' prop='url'>
                        <el-select v-model="layoutForm.url" clearable>
                            <el-option v-for="(item, index) in backendApisOptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </template>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="layoutVisible = false">取 消</el-button>
                <el-button type="primary" @click="onTemplateSelected">确 定</el-button>
            </span>
        </el-dialog>
        <el-drawer :title="editTitle" :visible.sync="editVisible" :before-close="onEditCancel" size='580px'>
            <draggable v-model="editForm[editKey]" class="options-item-wrapper">
                <div v-for="(item, index) in editForm[editKey]" :key="index" class="options-item">
                    <el-input v-model="item.config.label" class="mr10"></el-input>
                    <el-select v-model="item.config.type" @change="onChangeItemType($event, index)">
                        <el-option v-for="item in itemTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <i class="el-icon-circle-plus-outline" @click="onAddItem(index)"></i>
                    <i class="el-icon-remove-outline" @click="onRemoveItem(index)"></i>
                    <i class="el-icon-edit-outline" @click="onEditItem(index)"></i>
                </div>
            </draggable>
        </el-drawer>
        <el-dialog class="edit-dialog" title="编辑" :visible.sync="editItemVisible" width="600px" :modal=false>
            <el-form ref="itemForm" :model="itemForm" :rules="layoutRules" label-width="100px">
                <template v-for="(item, index) in itemFormOptions" >
                    <el-form-item :label="item.key" label-width='100px' :key="index" :prop="item.key"
                        v-if="item.isShow()">
                        <template v-if="item.key === 'model' || item.key.indexOf('Model') !== -1">
                            <template v-if="queryParamsOptions.length > 0">
                                <el-select v-model="itemForm[item.key]">
                                    <el-option v-for="item in queryParamsOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </template>
                            <template v-else>
                                <el-input v-model="itemForm[item.key]">
                                    <template slot="prepend">queryParams.</template>
                                </el-input>
                            </template>
                        </template>
                        <template v-else-if="item.key === 'dateType' && itemForm.type === 'search_date_area'">
                            <el-select v-model="itemForm[item.key]">
                                <el-option v-for="(obj, index) in options.dateAreaType" :key="index" :label="obj.label" :value="obj.value"></el-option>
                            </el-select>
                        </template>
                        <template v-else-if="item.key === 'format' && itemForm.type === 'search_date_area'">
                            <el-select v-model="itemForm[item.key]">
                                <el-option v-for="(obj, index) in options.dateAreaFormat" :key="index" :label="obj.label" :value="obj.value"></el-option>
                            </el-select>
                        </template>
                        <template v-else-if="item.key === 'buttonType'">
                            <el-select v-model="itemForm[item.key]">
                                <el-option v-for="(obj, index) in options.buttonType" :key="index" :label="obj.label" :value="obj.value"></el-option>
                            </el-select>
                        </template>
                        <template v-else-if="item.key === 'isConst' || item.key === 'isMulti' || item.key === 'canSearch'">
                            <el-radio v-model="itemForm[item.key]" :label="true">是</el-radio>
                            <el-radio v-model="itemForm[item.key]" :label="false">否</el-radio>
                        </template>
                        <template v-else-if="item.key === 'options'">
                            <ul>
                                <li v-for="(obj, index) in itemForm[item.key]" :key="index" class="options-item">
                                    <el-input v-model="obj.label" class="mr10" placeholder="请输入label"></el-input>
                                    <el-input v-model="obj.value" class="mr10" placeholder="请输入value"></el-input>
                                    <i class="el-icon-circle-plus-outline" @click="onAddSelectOption(index, 'options')"></i>
                                    <i class="el-icon-remove-outline" @click="onRemoveSelectOption(index, 'options')"></i>
                                </li>
                            </ul>
                        </template>
                        <template v-else-if="item.key === 'tableLabel'">
                            <ul>
                                <li v-for="(obj, index) in itemForm[item.key]" :key="index" class="options-item">
                                    <el-input v-model="obj.label" class="mr10" placeholder="请输入label"></el-input>
                                    <!-- <el-select v-model="obj.prop" class="mr10" placeholder="请输入prop">
                                        <el-option v-for="(obj, index) in responseOptions" :key="index" :label="obj.label" :value="obj.value"></el-option>
                                    </el-select> -->
                                    <i class="el-icon-circle-plus-outline" @click="onAddSelectOption(index, 'tableLabel')"></i>
                                    <i class="el-icon-remove-outline" @click="onRemoveSelectOption(index, 'tableLabel')"></i>
                                </li>
                            </ul>
                        </template>
                        <template v-else>
                            <el-input v-model="itemForm[item.key]"></el-input>
                        </template>
                    </el-form-item>
                </template>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editItemVisible = false">取 消</el-button>
                <el-button type="primary" @click="onEditItemOK">确 定</el-button>
            </span>
        </el-dialog>
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
import draggable from 'vuedraggable'
import axios from 'axios'
import * as snippet from '@/snippet/snippet'
import * as scriptSnippet from '@/snippet/scriptSnippet'
import Preview from './preview'
import { generateHtml, generateScript } from '@/helper/code_helper'
import * as config from './config'
import { LIST_CLASS, OPTIONS } from './const'
export default {
    name: 'auto_code',
    components: {
        Preview,
        draggable
    },
    data () {
        return {
            layoutVisible: false,
            editVisible: false,
            editItemVisible: false,
            exportVisible: false,
            layoutOptions: [
                { label: '列表', value: 'LIST' },
                { label: '表单', value: 'FORM' }
            ],
            gatewayOptions: [
                { label: 'hbp', value: 'http://192.168.20.248:30000' },
                { label: 'b2b', value: 'http://192.168.20.248:40000' }
            ],
            layout: '',
            layoutForm: {
                template: '',
                gateway: '',
                business: '',
                url: ''
            },
            businessOptions: [],
            backendApis: [],
            layoutRules: {
                template: [
                    { required: true, message: '请选择模板', trigger: 'change' }
                ]
            },
            code: '',
            codeConfig: [], // 生成Code的Config
            scriptCode: '',
            scriptCodeConfig: {
                data: {},
                methods: []
            },
            selectArea: '', // 当前选择的区域
            editTitle: '搜索区域编辑',
            editKey: '',
            editForm: {
                list_search: [
                    { type: 'SEARCH_ITEM', config: { label: '', type: '' } }
                ],
                list_action: [
                    { type: '', config: { label: '', type: '' } }
                ],
                list_table: [
                    { type: '', config: { label: '', type: '' } }
                ]
            },
            editIndex: 0,
            itemForm: {},
            exportForm: {
                fileName: 'index',
                path: ''
            },
            options: OPTIONS
        }
    },
    computed: {
        /**
         * start 这部分是swagger相关信息部分
         */
        backendApisOptions () {
            let result = []
            if (this.backendApis.paths) {
                result = Object.entries(this.backendApis.paths).filter(item => item[1].get).map(item => ({label: item[0], value: item[0]}))
            }
            return result
        },
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
                        console.log(ref)
                        console.log(this.backendApis.definitions[ref].properties)
                        result = Object.entries(this.backendApis.definitions[ref].properties).map(([key, value]) => ({
                            label: value.description || key,
                            value: key
                        }))
                    }
                }
            }
            console.log(result)
            return result
        },
        /**
         * end 这部分是swagger相关信息部分
         */
        itemTypeOptions () {
            return config[this.editKey.toUpperCase() + '_CONFIG']
        },
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
        async 'layoutForm.gateway' (val) {
            if (val) {
                const { data } = await axios.get(val + '/v3/api-docs/swagger-config')
                const result = data.urls.map(item => {
                    item.label = item.name
                    item.value = item.url
                    return item
                })
                this.businessOptions = result
            }
        },
        // 选择指定业务之后，获取该业务下面所有的api
        async 'layoutForm.business' (val) {
            const { data } = await axios.get(this.layoutForm.gateway + val)
            this.backendApis = data
        },
        editForm: {
            handler (val) {
                // editForm是配置展示项的Form，当配置项发生变化，代码配置重新调整
                // editForm中的属性和LIST_LAYOUT中的type做对应关系，editKey记录的是editForm中对应的key值
                this.codeConfig = this.codeConfig.map(item => {
                    if (item.type === this.editKey.toUpperCase()) {
                        item.children = this.editForm[this.editKey]
                    }
                    return item
                })
                let queryParams = {}
                let options = {}
                let methods = []
                this.codeConfig.map(item => {
                    if (item.children) {
                        item.children.forEach(item => {
                            if (item.script && item.script.methods) {
                                methods.concat(item.script.methods.map(obj => scriptSnippet[obj](item.config)))
                            }
                        })
                        const modelItems = item.children.filter(item => {
                            return item.config.model || item.config.startModel || item.config.endModel
                        })
                        modelItems.forEach(item => {
                            if (item.config.type === 'search_select') {
                                // 选择框可选项定义
                                options[item.config.model + 'Options'] = []
                            }
                            if (item.config.model) {
                                queryParams[item.config.model] = ''
                            }
                            if (item.config.startModel) {
                                queryParams[item.config.startModel] = ''
                            }
                            if (item.config.endModel) {
                                queryParams[item.config.endModel] = ''
                            }
                        })
                    }
                })
                options.queryParams = queryParams
                this.scriptCodeConfig.data = options
                this.scriptCodeConfig.methods = methods
            },
            deep: true
        },
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
        // 寻找点击的区域
        _findClickArea (target) {
            if (target.className) {
                const classArr = LIST_CLASS.filter(item => target.className.includes(item.class))
                if (classArr.length > 0) {
                    return classArr[0]
                }
            }
            if (!target.parentNode) {
                // 当寻找到最外层，发现没有对应可以编辑的区域，直接返回空
                return ''
            }
            return this._findClickArea(target.parentNode)
        },
        onShowLayout () {
            this.layoutVisible = true
        },
        onTemplateSelected () {
            this.layout = this.layoutForm.template
            this.codeConfig = config[this.layoutForm.template + '_LAYOUT']
            this.code = snippet['LAYOUT_SNIPPET'](generateHtml(this.codeConfig, snippet).join('\n\r'))
            this.layoutVisible = false
        },
        onProxy (e) {
            // 使用事件代理，用className判定点击的是哪个
            const clickArea = this._findClickArea(e.target)
            // 当点击不可编辑区域，直接返回
            if (!clickArea) {
                return false
            }
            this.editVisible = true
            this.editTitle = clickArea.name + '编辑'
            this.editKey = clickArea.key
        },
        onShowConfig () {

        },
        onEditCancel () {
            this.editVisible = false
        },
        onAddItem (index) {
            if (this.editKey === 'list_search') {
                this.editForm[this.editKey].splice(index + 1, 0, {type: 'SEARCH_ITEM', config: {label: '', type: ''}})
            } else {
                this.editForm[this.editKey].splice(index + 1, 0, {type: '', config: {label: '', type: ''}})
            }
        },
        onRemoveItem (index) {
            if (this.editForm[this.editKey].length === 1) {
                this.$alert('至少保留一个选项', '提示', {
                    confirmButtonText: '确定'
                })
                return
            }
            this.editForm[this.editKey].splice(index, 1)
        },
        onEditItem (index) {
            this.editIndex = index
            this.editItemVisible = true
            this.itemForm = JSON.parse(JSON.stringify(this.editForm[this.editKey][this.editIndex].config))
        },
        onEditItemOK () {
            this.editForm[this.editKey][this.editIndex].config = JSON.parse(JSON.stringify(this.itemForm))
            this.editItemVisible = false
        },
        onAddSelectOption (index, name) {
            this.itemForm[name].splice(index + 1, 0, {label: '', value: ''})
        },
        onRemoveSelectOption (index) {
            this.itemForm[name].splice(index, 1)
        },
        onChangeItemType (val, index) {
            const selectedItem = this.itemTypeOptions.filter(item => item.value === val)
            console.log(JSON.stringify(selectedItem[0].config))
            const selectedConfig = JSON.parse(JSON.stringify(selectedItem[0].config))
            console.log(selectedConfig)
            // 当没有设置默认值的时候，label为我们设置的label，一般设置默认值的都是不需要修改的label
            if (!selectedConfig.label) {
                selectedConfig.label = this.editForm[this.editKey][index].config.label
            }
            this.editForm[this.editKey][index].config = selectedConfig
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
/deep/ .el-drawer__header>:first-child {
    outline-style: none
}
</style>
