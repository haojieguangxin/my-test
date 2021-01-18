import Vue from 'vue'
export default {
    name: 'PREVIEW',
    props: {
        code: {
            required: true
        },
        codeConfig: {},
        scriptCodeConfig: {
            default: () => {
                return {
                    data: {},
                    methods: []
                }
            }
        }
    },
    render (h) {
        let methods = {}
        if (this.codeConfig[0].children) {
            const modelItems = this.codeConfig[0].children.filter(item => {
                return item.config.model || item.config.startModel || item.config.endModel
            })
            modelItems.forEach(item => {
                if (item.config.type === 'search_date_area') {
                    // 时间搜索区域method，处理开始日期和结束日期disabled
                    methods = {
                        ...methods,
                        [item.config.startModel + 'PickerOptions'] () {
                            return {
                                disabledDate: (time) => {
                                    let beginDateVal = this.queryParams[item.config.endModel]
                                    if (beginDateVal) {
                                        return time.getTime() > new Date(beginDateVal).getTime()
                                    }
                                }
                            }
                        },
                        [item.config.endModel + 'PickerOptions'] () {
                            return {
                                disabledDate: (time) => {
                                    let beginDateVal = this.queryParams[item.config.startModel]
                                    if (beginDateVal) {
                                        return time.getTime() < new Date(beginDateVal).getTime()
                                    }
                                }
                            }
                        }
                    }
                }
            })
        }
        let options = this.scriptCodeConfig.data
        // 这里是关键，将string字符串转换成模板
        // 难点是String中包含了自定义组件，使用v-html是解析不了的
        const result = Vue.extend({
            template: this.code,
            data () {
                return {
                    tempModel: '', // 當model沒有設置的時候，v-model臨時設置為tempModel
                    tempModelOptions: [{ label: '', value: '' }],
                    ...options
                }
            },
            methods: {
                tempModelPickerOptions () { },
                onQuery () { },
                onReset () { },
                onTempClick () { },
                ...methods
            }
        })
        return h(result, {})
    }
}
