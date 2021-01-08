module.exports = {
    search: {

    }

}

export const LIST_CONFIG = [
    {
        name: '输入框',
        config: {
            label: '',
            model: '',
            maxlength: '50',
            placeholder: '请输入'
        }
    },
    {
        name: '选择框',
        config: {
            label: '',
            model: '',
            options: [],
            isConst: true, // 选项是否前端固定写死
            canSearch: false, // 是否可搜索
            isMulti: false, // 是否多选
            optionsUrl: '',
            placeholder: '请选择'
        }
    }
]
