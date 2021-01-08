<template>
    <div class="code-main">
        <div class="code-item">
            1234455
        </div>
        <div class="code-content">
            <div v-if="config.layout">
                <!-- <div v-html="code"></div> -->
                <Preview :code="code"></Preview>
            </div>
            <i class="el-icon-circle-plus-outline add-template" @click="onShowLayout" v-else></i>
        </div>
        <el-dialog title="选择模板" :visible.sync="layoutVisible" width="500px" :modal=false>
            <el-form ref="layoutForm" :model="layoutForm" :rules="layoutRules" label-width="120px">
                <el-form-item label="模板:" label-width='120px' prop='template'>
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
    </div>
</template>

<script>
import * as snippet from '@/snippet/index'
import Preview from './preview'
export default {
    name: 'auto_code',
    components: {
        Preview
    },
    data () {
        return {
            layoutVisible: false,
            layoutOptions: [
                { label: '列表', value: 'LIST' },
                { label: '表单', value: 'FORM' }
            ],
            config: {},
            layoutForm: {
                template: ''
            },
            layoutRules: {
                template: [
                    { required: true, message: '请选择模板', trigger: 'change' }
                ]
            },
            code: ''
        }
    },
    methods: {
        onShowLayout () {
            this.layoutVisible = true
        },
        onTemplateSelected () {
            console.log(111)
            this.config.layout = this.layoutForm.template
            this.code = snippet[this.layoutForm.template + '_LAYOUT_SNIPPET']
            this.layoutVisible = false
        }
    }
}
</script>

<style scoped>
.code-main {
    display: flex;
}
.code-content {
    flex-grow: 4;
}
.code-item {
    padding: 10px;
    border-right: 1px solid#ccc;
}
.add-template {
    display: block;
    margin: 0 auto;
    width: 40px;
    font-size: 40px;
    line-height: 100vh;
}
</style>
