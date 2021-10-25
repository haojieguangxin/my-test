<template>
    <el-dialog title="选择模板" :visible.sync="layoutVisible" width="500px" :modal="false">
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
            <el-button @click="onCancel">取 消</el-button>
            <el-button type="primary" @click="onTemplateSelected">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import axios from 'axios'
export default {
    name: 'swaggerForm',
    props: {
        layoutVisible: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            layoutOptions: [
                { label: '列表', value: 'LIST' },
                { label: '表单', value: 'FORM' }
            ],
            // TODO: 这里根据版本不同链接可能不同
            gatewayOptions: [
                { label: 'hbp', value: 'http://192.168.20.248:30000' },
                { label: 'b2b', value: 'http://192.168.20.248:40000' }
            ],
            layoutForm: {
                template: '',
                gateway: '',
                business: '',
                url: ''
            },
            layoutRules: {
                template: [
                    { required: true, message: '请选择模板', trigger: 'change' }
                ]
            },
            businessOptions: [],
            backendApis: []
        }
    },
    computed: {
        backendApisOptions () {
            let result = []
            if (this.backendApis.paths) {
                result = Object.entries(this.backendApis.paths).filter(item => item[1].get).map(item => ({label: item[0], value: item[0]}))
            }
            return result
        }
    },
    watch: {
        async 'layoutForm.gateway' (val) {
            if (val) {
                // TODO: 这里根据版本不同链接可能不同
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
        }
    },
    methods: {
        onCancel () {
            this.$emit('callback', {layoutVisible: false})
        },
        onTemplateSelected () {
            this.$emit('callback', {
                layoutVisible: false,
                layoutForm: this.layoutForm,
                backendApis: this.backendApis
            })
        }
    }
}
</script>

<style scoped>

</style>
