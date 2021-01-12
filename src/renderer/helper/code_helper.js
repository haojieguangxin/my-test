export const getVueScript = (data) => {
    let script = `
    <script>
        export default{
            data () {
                return {
                    ${data.data}
                }
            },
            methods: {
                ${data.methods}
            }
        }
    </script>
    `
    return script
}

/**
 * 参数data就是一个数组，数组格式
 * [{ type: '', config: {} }]
 *
 * @param {*} data 数组
 */
export const generateHtml = (data, snippet) => {
    let result = []
    data.map(item => {
        if (item.children) {
            item.config.children = generateHtml(item.children, snippet).join('\n\r')
            result.push(snippet[item.type.toUpperCase() + '_SNIPPET'](item.config))
        } else {
            result.push(snippet[item.type.toUpperCase() + '_SNIPPET'](item.config))
        }
    })
    return result
}
