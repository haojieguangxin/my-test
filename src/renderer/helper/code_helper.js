import pretty from 'pretty'
export const generateScript = (data) => {
    let script = `

<script>
    export default{
        data () {
            return ${JSON.stringify(data.data)}
        },
        methods: {
            ${data.methods.join(',')}
        }
    }
</script>
    `
    return pretty(script).replace('"', '\'').replace(';', '')
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
        const type = item.type || item.config.type
        if (item.children) {
            item.config.children = generateHtml(item.children, snippet).join('\n\r')
            result.push(snippet[type.toUpperCase() + '_SNIPPET'](item.config))
        } else if (type) {
            result.push(snippet[type.toUpperCase() + '_SNIPPET'](item.config))
        }
    })
    return result
}
