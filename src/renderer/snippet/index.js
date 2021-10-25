import Vue from 'vue'
export default {
    name: 'componentItem',
    props: {
        item: {
            required: true,
            desc: 'config文件中定义的组件配置信息'
        }
    },
    methods: {
        codeGenerate (config) {
            let selected = config.filter(item => item.selected)[0]
            let result = `<${selected.htmlLabel}>`
            if (selected.children) {
                result += this.codeGenerate(selected.children)
            }
            result += `</${selected.htmlLabel}>`
            console.log(result)
            return result
        }
    },
    render (h) {
        const code = this.codeGenerate(this.item.html)
        // 这里是关键，将string字符串转换成模板
        // 难点是String中包含了自定义组件，使用v-html是解析不了的
        const result = Vue.extend({
            template: code
        })
        return h(result, {})
    }
}
