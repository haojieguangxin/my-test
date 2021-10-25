import Vue from 'vue'
import draggable from 'vuedraggable'
import componentItem from '@/snippet/index.js'
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
            components: {
                draggable,
                componentItem
            },
            template: this.code,
            data () {
                return {
                    list1: [],
                    list2: [],
                    list3: []
                }
            },
            methods: {
                onDragged () {
                },
                onShowItemEdit (item) {
                    // 由于是子组件中包含的子组件，所有emit的时候不会到index.vue中
                    this.$emit('onShowItemEdit', item)
                }
            }
        })
        return h(result, {
            // 这里很重要，必须使用箭头函数获取当前this
            // 这才是真正的子组件中的方法
            on: {
                onShowItemEdit: (item) => {
                    this.$emit('callback', item)
                }
            }
        })
    }
}
