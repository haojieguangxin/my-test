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
