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
