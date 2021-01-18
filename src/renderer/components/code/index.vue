<template>
    <div class="code-main">
        <div class="code-content" @click="onProxy">
            <div v-if="layout">
                <Preview :code="code" :codeConfig="codeConfig"></Preview>
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
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="layoutVisible = false">取 消</el-button>
                <el-button type="primary" @click="onTemplateSelected">确 定</el-button>
            </span>
        </el-dialog>
        <el-drawer :title="editTitle" :visible.sync="editVisible" :before-close="onEditCancel" size='580px'>
            <ul class="options-item-wrapper">
                <li v-for="(item, index) in editForm[editKey]" :key="index" class="options-item">
                    <el-input v-model="item.config.label" class="mr10"></el-input>
                    <el-select v-model="item.config.type" @change="onChangeItemType($event, index)">
                        <el-option v-for="item in itemTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <i class="el-icon-circle-plus-outline" @click="onAddItem(index)"></i>
                    <i class="el-icon-remove-outline" @click="onRemoveItem(index)"></i>
                    <i class="el-icon-edit-outline" @click="onEditItem(index)"></i>
                </li>
            </ul>
        </el-drawer>
        <el-dialog class="edit-dialog" title="编辑" :visible.sync="editItemVisible" width="600px" :modal=false>
            <el-form ref="itemForm" :model="itemForm" :rules="layoutRules" label-width="100px">
                <template v-for="(item, index) in itemFormOptions" >
                    <el-form-item :label="item.key" label-width='100px' :key="index" :prop="item.key"
                        v-if="item.isShow()">
                        <template v-if="item.key === 'model' || item.key.indexOf('Model') !== -1">
                            <el-input v-model="itemForm[item.key]">
                                <template slot="prepend">queryParams.</template>
                            </el-input>
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
                        <template v-else-if="item.key === 'isConst' || item.key === 'isMulti' || item.key === 'canSearch'">
                            <el-radio v-model="itemForm[item.key]" :label="true">是</el-radio>
                            <el-radio v-model="itemForm[item.key]" :label="false">否</el-radio>
                        </template>
                        <template v-else-if="item.key === 'options'">
                            <ul>
                                <li v-for="(obj, index) in itemForm[item.key]" :key="index" class="options-item">
                                    <el-input v-model="obj.label" class="mr10" placeholder="请输入label"></el-input>
                                    <el-input v-model="obj.value" class="mr10" placeholder="请输入value"></el-input>
                                    <i class="el-icon-circle-plus-outline" @click="onAddSelectOption(index)"></i>
                                    <i class="el-icon-remove-outline" @click="onRemoveSelectOption(index)"></i>
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
            <h-button type="primary" @click="onShowExport">导出代码</h-button>
        </div>
    </div>
</template>

<script>
import fs from 'fs-extra'
import * as snippet from '@/snippet/snippet'
import Preview from './preview'
import { generateHtml } from '@/helper/code_helper'
import * as config from './config'
import { LIST_CLASS, OPTIONS } from './const'
export default {
    name: 'auto_code',
    components: {
        Preview
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
            layout: '',
            layoutForm: {
                template: ''
            },
            layoutRules: {
                template: [
                    { required: true, message: '请选择模板', trigger: 'change' }
                ]
            },
            code: '',
            codeConfig: [], // 生成Code的Config
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
        itemTypeOptions () {
            return config[this.editKey.toUpperCase() + '_CONFIG']
        },
        // itemForm () {
        //     if (this.editKey) {
        //         console.log(JSON.parse(JSON.stringify(this.editForm[this.editKey][this.editIndex].config)))
        //         return JSON.parse(JSON.stringify(this.editForm[this.editKey][this.editIndex].config))
        //         // return this.editForm[this.editKey][this.editIndex].config
        //     }
        //     return {}
        // },
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
        editForm: {
            handler (val) {
                this.codeConfig = this.codeConfig.map(item => {
                    if (item.type === this.editKey.toUpperCase()) {
                        item.children = this.editForm[this.editKey]
                    }
                    return item
                })
            },
            deep: true
        },
        codeConfig: {
            handler (val) {
                console.log(val)
                this.code = snippet['LAYOUT_SNIPPET'](generateHtml(val, snippet).join('\n\r'))
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
        onAddSelectOption (index) {
            this.itemForm.options.splice(index + 1, 0, {label: '', value: ''})
        },
        onRemoveSelectOption (index) {
            this.itemForm.options.splice(index, 1)
        },
        onChangeItemType (val, index) {
            const selectedItem = this.itemTypeOptions.filter(item => item.value === val)
            const selectedConfig = JSON.parse(JSON.stringify(selectedItem[0].config))
            // 当没有设置默认值的时候，label为我们设置的label，一般设置默认值的都是不需要修改的label
            if (!selectedConfig.label) {
                selectedConfig.label = this.editForm[this.editKey][index].config.label
            }
            this.editForm[this.editKey][index].config = selectedConfig
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
                    fs.writeFile(this.exportForm.path + '/' + exportFileName, '<template>' + this.code + '</template>', (err) => {
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
