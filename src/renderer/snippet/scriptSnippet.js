export const START_PICKER_OPTIONS = (config) => {
    return `
    ${config.startModel}PickerOptions () {
        return {
            disabledDate: (time) => {
                let endDateVal = this.queryParams.${config.endModel}
                if (endDateVal) {
                    return time.getTime() > new Date(endDateVal).getTime()
                }
            }
        }
    }
    `
}

export const END_PICKER_OPTIONS = (config) => {
    return `
    ${config.endModel}PickerOptions () {
        return {
            disabledDate: (time) => {
                let beginDateVal = this.queryParams.${config.startModel}
                if (beginDateVal) {
                    return time.getTime() < new Date(beginDateVal).getTime()
                }
            }
        }
    }
    `
}

// 类目搜索的时候，类目可选项
export const CATEGORY_OPTIONS = () => {
    return `
    ...mapGetters('category', {
        categoryOptions: 'categoryOptions'
    })
    `
}

/**
 * Table相关methods Start
 */
export const ON_CURRENT_CHANGE = () => {
    return `
    onCurrentChange (val) {
        this.queryParams.pageNumber = val.pageNumber
        this.onQuery()
    }
    `
}

export const ON_SIZE_CHANGE = () => {
    return `
    onSizeChange (val) {
        this.queryParams.pageSize = val
        this.onQuery()
    }
    `
}
/**
 * Table相关methods End
 */

export const ON_RESET = () => {
    return `
    onReset () {}
    `
}

export const ON_QUERY = () => {
    return `
    onQuery () {}
    `
}

export const ON_EXPORT = () => {
    return `
    onExport () {}
    `
}
