export const LIST_LAYOUT = [
    {
        name: 'search',
        type: 'LIST_SEARCH',
        config: {}
    },
    {
        name: 'action',
        type: 'LIST_ACTION',
        config: {}
    },
    {
        name: 'table',
        type: 'LIST_TABLE',
        config: {}
    }
]

// export const LIST_SEARCH_CONFIG = [
//     {
//         label: '输入框',
//         value: 'input',
//         config: [
//             { title: 'label', default: '' },
//             { title: 'model', default: '' },
//             { title: 'maxlength', default: '50' },
//             { title: 'placeholder', default: '请输入' }
//         ]
//     },
//     {
//         label: '选择框',
//         value: 'select',
//         config: [
//             { title: 'label', default: '' },
//             { title: 'model', default: '' },
//             { title: 'isConst', default: true },
//             { title: 'options', default: [] }, // isConst为true时显示
//             { title: 'optionsUrl', default: '' }, // isConst为false时显示
//             { title: 'placeholder', default: '请选择' },
//             { title: 'canSearch', default: false },
//             { title: 'isMulti', default: false }
//         ]
//     }
// ]

export const LIST_SEARCH_CONFIG = [
    {
        label: '输入框',
        value: 'search_input',
        config: {
            type: 'search_input',
            label: '',
            model: '',
            maxlength: '50',
            placeholder: '请输入'
        }
    },
    {
        label: '选择框',
        value: 'search_select',
        config: {
            type: 'search_select',
            label: '',
            model: '',
            options: [{label: '', value: ''}],
            isConst: true, // 选项是否前端固定写死
            canSearch: false, // 是否可搜索
            isMulti: false, // 是否多选
            optionsUrl: '',
            placeholder: '请选择'
        }
    }
]
