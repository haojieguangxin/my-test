export const LAYOUT_SNIPPET = (children) => `
<div class="page-body B2b">
    <div class="page-body-cont">
        ${children}
    </div>
</div>
`

export const LIST_SEARCH_SNIPPET = ({children}) => {
    return `
<div class="query-cont__row">
    ${children || '点击此处编辑'}
</div>
`
}

export const LIST_ACTION_SNIPPET = ({children}) => `
<div class="button-cont">
    ${children || '点击此处编辑'}
</div>
`

export const LIST_TABLE_SNIPPET = ({children}) => `
<div class="list-table">
    ${children || '点击此处编辑'}
</div>
`
export const SEARCH_ITEM_SNIPPET = (data) => {
    if (!data.type) {
        return ''
    }
    // 使用eval解决字符串转换成函数执行问题
    // eslint-disable-next-line
    const item = eval(data.type.toUpperCase() + '_SNIPPET')(data)
    return `
<div class="query-cont__col">
    <div class="query-col__label">${data.label}：</div>
    <div class="query-col__input">${item}</div>
</div>
`
}

export const SEARCH_INPUT_SNIPPET = (data) => `
<el-input v-model="queryParams" placeholder="${data.placeholder}" maxlength="${data.maxlength}"></el-input>
`

export const SEARCH_SELECT_SNIPPET = (data) => `
<el-select v-model="queryParams">
    <el-option label="全部" value=""></el-option>
</el-select>
`

export const SEARCH_DATE_AREA_SNIPPET = (data) => {
    const type = data.type || 'date'
    const format = data.format || 'YYYY-MM-DD'
    const startPlaceholder = '开始' + (type === 'date' ? '日期' : '时间')
    const endPlaceholder = '结束' + (type === 'date' ? '日期' : '时间')
    return `
<el-date-picker v-model="queryParams.${data.modelStart}" type="${type}" value-format="${format}" placeholder="${startPlaceholder}" :picker-options="${data.modelStart}Options">
</el-date-picker>
<span class="ml10">-</span>
<el-date-picker v-model="queryParams.${data.modelEnd}" type="${type}" value-format="${format}" placeholder="${endPlaceholder}" :picker-options="${data.modelEnd}Options">
</el-date-picker>
`
}
