import Vue from 'vue'
export default {
    name: 'PREVIEW',
    props: {
        code: {
            required: true
        }
    },
    render (h) {
        // 这里是关键，将string字符串转换成模板
        // 难点是String中包含了自定义组件，使用v-html是解析不了的
        const result = Vue.extend({
            template: this.code,
            data () {
                return {
                    queryParams: ''
                }
            }
        })
        return h(result, {})
    }
}
