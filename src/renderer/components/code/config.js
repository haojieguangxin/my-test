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
    },
    {
        label: '时间区域选择',
        value: 'search_date_area',
        config: {
            type: 'search_date_area',
            label: '',
            startModel: '',
            endModel: '',
            dateType: 'date',
            format: 'YYYY-MM-DD'
        }
    },
    {
        label: '查询按钮',
        value: 'search_button_query',
        config: {
            type: 'search_button_query',
            label: '查询',
            buttonType: 'primary'
        }
    },
    {
        label: '重置按钮',
        value: 'search_button_reset',
        config: {
            type: 'search_button_reset',
            label: '重置',
            buttonType: ''
        }
    },
    {
        label: '导出按钮',
        value: 'search_button_export',
        config: {
            type: 'search_button_export',
            label: '重置',
            buttonType: ''
        }
    }
]

export const LIST_ACTION_CONFIG = [
    {
        label: '按钮',
        value: 'button',
        config: {
            type: 'button',
            label: '',
            buttonType: ''
        }
    }
]

export const LIST_TABLE_CONFIG = [
    {
        label: '表格',
        value: 'table',
        config: {
            type: 'table',
            label: '',
            buttonType: ''
        }
    }
]
