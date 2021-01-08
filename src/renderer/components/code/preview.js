export default {
    name: 'PREVIEW',
    props: {
        code: {
            required: true
        }
    },
    render (h) {
        console.log(this.code({search: '', button: '', table: ''}))
        return this.code({search: '', button: '', table: ''}, h)
    }
}
