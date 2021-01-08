export const LIST_LAYOUT_SNIPPET = (slot, h) => {
    return (<div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                {slot.search}
                <div class="query-cont__col">
                    <h-button type="primary">查询</h-button>
                    <h-button>重置</h-button>
                    {slot.isExport ? '<h-button @click="onReset">重置</h-button>' : ''}
                </div>
            </div>
            {slot.button}
            {slot.table}
        </div>
    </div>)
}

export const SEARCH_ITEM_SNIPPET = (data) => `
<div class="query-cont__col">
    <div class="query-col__lable">${data.label}</div>
    <div class="query-col__input">
        <el-input v-model="queryParams.${data.model}" placeholder="${data.placeholder}" maxlength="${data.maxlength}"></el-input>
    </div>
</div>
`
export const SEARCH_INPUT_SNIPPET = (data) => `
<el-input v-model="queryParams.${data.model}" placeholder="${data.placeholder}" maxlength="${data.maxlength}"></el-input>
`
export const SEARCH_SELECT_SNIPPET = (data) => `
<el-select v-model="queryParams.${data.model}">
    <el-option v-for="item in ${data.model}Options" :key="item.value" :label="item.label" :value="item.value">
    </el-option>
</el-select>
`
export const SEARCH_DATE_AREA_SNIPPET = (data) => `
<el-date-picker v-model="queryParams.${data.modelStart}" type="${data.type}" value-format="${data.format}" placeholder="${data.placeholder}" :picker-options="${data.modelStart}Options">
</el-date-picker>
<span class="ml10">-</span>
<el-date-picker v-model="queryParams.${data.modelEnd}" type="${data.type}" value-format="${data.format}" placeholder="${data.placeholder}" :picker-options="${data.modelEnd}Options">
</el-date-picker>
`

export const QUERY_FUNC = 'onQuery'

export const RESET_FUNC = 'onReset'
