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
    // 当选择button的时候，item的样式不一样，不需要label
    if (data.type.toUpperCase().indexOf('SEARCH_BUTTON_') !== -1) {
        return `
        <div class="query-cont__col">
            ${item}
        </div>
        `
    }
    return `
    <div class="query-cont__col">
        <div class="query-col__label">${data.label}：</div>
        <div class="query-col__input">
            ${item}
        </div>
    </div>
    `
}

export const SEARCH_INPUT_SNIPPET = (data) => {
    const model = data.model ? `queryParams.${data.model}` : 'tempModel'
    return `
    <el-input v-model="${model}" placeholder="${data.placeholder}" maxlength="${data.maxlength}"></el-input>
    `
}

export const SEARCH_SELECT_SNIPPET = (data) => {
    const model = data.model ? `queryParams.${data.model}` : 'tempModel'
    const isMulti = data.isMulti ? 'multiple' : ''
    const canSearch = data.canSearch ? 'filterable' : ''
    return `
    <el-select v-model="${model}" ${isMulti} ${canSearch} placeholder="${data.placeholder}">
        <el-option label="全部" value=""></el-option>
        <el-option v-for="item in ${model}Options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    `
}

export const SEARCH_DATE_AREA_SNIPPET = (data) => {
    const startModel = data.startModel ? data.startModel : 'tempModel'
    const endModel = data.endModel ? data.endModel : 'tempModel'
    const type = data.dateType || 'date'
    const format = data.format || 'YYYY-MM-DD'
    const startPlaceholder = '开始' + (type === 'date' ? '日期' : '时间')
    const endPlaceholder = '结束' + (type === 'date' ? '日期' : '时间')
    return `
    <el-date-picker v-model="queryParams.${startModel}" type="${type}" value-format="${format}" placeholder="${startPlaceholder}" :picker-options="${startModel}PickerOptions">
    </el-date-picker>
    <span class="ml10">-</span>
    <el-date-picker v-model="queryParams.${endModel}" type="${type}" value-format="${format}" placeholder="${endPlaceholder}" :picker-options="${endModel}PickerOptions">
    </el-date-picker>
    `
}

// 搜索项：区间范围  例如：金额区间，折扣区间，数量区间
export const SEARCH_NUMBER_AREA_SNIPPET = (data) => {
    const startModel = data.startModel ? data.startModel : 'tempModel'
    const endModel = data.endModel ? data.endModel : 'tempModel'
    const decimal = data.decimal ? `v-isNum:${data.decimal}` : 'v-isNum'
    return `
    <el-input v-model="queryParams.${startModel}" ${decimal} placeholder="${data.startPlaceholder}" maxlength="${data.maxlength}"></el-input>
    ~
    <el-input v-model="queryParams.${endModel}" ${decimal} placeholder="${data.endPlaceholder}" maxlength="${data.maxlength}"></el-input>
    `
}

export const BUTTON_SNIPPET = (data) => {
    if (data.buttonType) {
        return `
        <h-button type="${data.buttonType}" @click="${data.clickEvent}">${data.label}</h-button>
        `
    } else {
        return `
        <h-button @click="${data.clickEvent}">${data.label}</h-button>
        `
    }
}

export const SEARCH_BUTTON_QUERY_SNIPPET = (data) => {
    data.clickEvent = 'onQuery'
    return BUTTON_SNIPPET(data)
}

export const SEARCH_BUTTON_RESET_SNIPPET = (data) => {
    data.clickEvent = 'onReset'
    return BUTTON_SNIPPET(data)
}

export const SEARCH_BUTTON_EXPORT_SNIPPET = (data) => {
    data.clickEvent = 'onExport'
    return BUTTON_SNIPPET(data)
}

// 商品类目搜索
export const SEARCH_CATEGORY_SNIPPET = (data) => {
    /**
     *   ...mapGetters('category', {
     *       categoryOptions: 'categoryOptions'
     *   })
     *
     *   onSearchCategoryChange () {
     *       // 有点复杂啊这个搜索项
     *   }
     *
     */
    return `
    <el-cascader :options="categoryOptions" v-model="categoryIdArr" clearable @change="onSearchCategoryChange"></el-cascader>
    `
}

// 省市区搜索
export const SEARCH_DISTRICT_SNIPPET = (data) => {
    /**
     *   ...mapGetters('category', {
     *       categoryOptions: 'categoryOptions'
     *   })
     *
     *   onSearchCategoryChange () {
     *       // 有点复杂啊这个搜索项
     *   }
     *
     */
    return `
    <el-cascader :options="categoryOptions" v-model="categoryIdArr" clearable @change="onSearchCategoryChange"></el-cascader>
    `
}
