export default [
    {
        name: '单选框',
        icon: 'radio',
        label: '替换Label',
        html: [
            {
                htmlLabel: 'el-radio-group',
                props: [
                    { name: 'v-model', desc: '绑定值' },
                    { name: 'size', desc: '单选框组尺寸，仅对按钮形式的 Radio 或带有边框的 Radio 有效', options: ['medium', 'small', 'mini'] },
                    { name: 'disabled', desc: '是否禁用' },
                    { name: 'text-color', desc: '按钮形式的 Radio 激活时的文本颜色' },
                    { name: 'fill', desc: '按钮形式的 Radio 激活时的填充色和边框色' }
                ],
                children: [
                    {
                        htmlLabel: 'el-radio',
                        props: [
                            { name: 'label', desc: 'Radio 的 value' },
                            { name: 'disabled', desc: '是否禁用' },
                            { name: 'border', desc: '是否显示边框' },
                            { name: 'size', desc: 'Radio 的尺寸，仅在 border 为真时有效', options: ['medium', 'small', 'mini'] },
                            { name: 'name', desc: '原生 name 属性' }
                        ],
                        selected: true
                    },
                    {
                        htmlLabel: 'el-radio-button',
                        props: [
                            { name: 'label', desc: 'Radio 的 value' },
                            { name: 'disabled', desc: '是否禁用' },
                            { name: 'name', desc: '原生 name 属性' }
                        ],
                        selected: false
                    }
                ],
                selected: true
            }
        ]
    },
    {
        name: '复选框',
        icon: 'checkbox',
        label: '替换Label',
        html: [
            {
                htmlLabel: 'el-checkbox-group',
                props: [
                    { name: 'v-model', desc: '绑定值' },
                    { name: 'size', desc: '多选框组尺寸，仅对按钮形式的 Checkbox 或带有边框的 Checkbox 有效', options: ['medium', 'small', 'mini'] },
                    { name: 'disabled', desc: '是否禁用' },
                    { name: 'min', desc: '可被勾选的 checkbox 的最小数量' },
                    { name: 'max', desc: '可被勾选的 checkbox 的最大数量' },
                    { name: 'text-color', desc: '按钮形式的 Checkbox 激活时的文本颜色' },
                    { name: 'fill', desc: '按钮形式的 Checkbox 激活时的填充色和边框色' }
                ],
                children: [
                    {
                        htmlLabel: 'el-checkbox',
                        props: [
                            { name: 'componentLabel', desc: '组件对应的label名称', default: '替换Label' },
                            { name: 'label', desc: '选中状态的值（只有在checkbox-group或者绑定对象类型为array时有效）' },
                            { name: 'true-label', desc: '选中时的值' },
                            { name: 'false-label', desc: '没有选中时的值' },
                            { name: 'disabled', desc: '是否禁用' },
                            { name: 'border', desc: '是否显示边框' },
                            { name: 'size', desc: 'Checkbox 的尺寸，仅在 border 为真时有效', options: ['medium', 'small', 'mini'] },
                            { name: 'name', desc: '原生 name 属性' },
                            { name: 'checked', desc: '当前是否勾选' },
                            { name: 'indeterminate', desc: '设置 indeterminate 状态，只负责样式控制' }
                        ],
                        selected: true
                    }
                ],
                selected: true
            }
        ]
    },
    {
        name: '输入框',
        icon: 'input',
        label: '替换Label',
        html: [
            {
                htmlLabel: 'el-input',
                props: [
                    { name: 'type', desc: '类型: text，textarea 和其他 原生 input 的 type 值' },
                    { name: 'v-model', desc: '绑定值' },
                    { name: 'maxlength', desc: '原生属性，最大输入长度' },
                    { name: 'minlength', desc: '原生属性，最小输入长度' },
                    { name: 'placeholder', desc: '输入框占位文本' },
                    {
                        name: 'clearable',
                        desc: '是否可清空',
                        options: [
                            { value: true, label: '是' },
                            { value: false, label: '否' }
                        ],
                        value: false
                    }
                ],
                selected: true
            }
        ]
    },
    {
        name: '选择器',
        icon: 'select',
        label: '替换Label',
        html: [
            {
                htmlLabel: 'el-select',
                props: [
                    { name: 'v-model', desc: '绑定值' },
                    { name: 'multiple', desc: '是否多选' },
                    { name: 'disabled', desc: '是否禁用' },
                    { name: 'value-key', desc: '作为 value 唯一标识的键名，绑定值为对象类型时必填' },
                    { name: 'size', desc: '输入框尺寸', options: ['medium', 'small', 'mini'] },
                    { name: 'placeholder', desc: '占位符' },
                    { name: 'clearable', desc: '是否可清空' },
                    { name: 'collapse-tags', desc: '多选时是否将选中值按文字的形式展示' },
                    { name: 'multiple-limit', desc: '多选时用户最多可以选择的项目数，为 0 则不限制' },
                    { name: 'name', desc: 'select input 的 name 属性' },
                    { name: 'autocomplete', desc: 'select input 的 autocomplete 属性' },
                    { name: 'filterable', desc: '是否可搜索' },
                    { name: 'allow-create', desc: '是否允许用户创建新条目，需配合 filterable 使用' },
                    { name: 'filter-method', desc: '自定义搜索方法' },
                    { name: 'remote', desc: '是否为远程搜索' },
                    { name: 'remote-method', desc: '远程搜索方法' },
                    { name: 'loading', desc: '是否正在从远程获取数据' },
                    { name: 'loading-text', desc: '远程加载时显示的文字' },
                    { name: 'no-match-text', desc: '搜索条件无匹配时显示的文字，也可以使用slot="empty"设置' },
                    { name: 'no-data-text', desc: '选项为空时显示的文字，也可以使用slot="empty"设置' },
                    { name: 'popper-class', desc: 'Select 下拉框的类名' },
                    { name: 'reserve-keyword', desc: '多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词' },
                    { name: 'default-first-option', desc: '在输入框按下回车，选择第一个匹配项。需配合 filterable 或 remote 使用' },
                    { name: 'popper-append-to-body', desc: '是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false' },
                    { name: 'automatic-dropdown', desc: '对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单' }
                ],
                children: [
                    {
                        htmlLabel: 'el-option',
                        props: [
                            { name: 'value', desc: '选项的值', value: '' },
                            { name: 'label', desc: '选项的标签，若不设置则默认与 value 相同', value: '全部' },
                            { name: 'disabled', desc: '是否禁用该选项' }
                        ],
                        selected: true
                    }
                ],
                selected: true
            }
        ]
    },
    {
        name: '级联选择器',
        icon: 'cascader',
        label: '替换Label',
        html: [
            {
                htmlLabel: 'el-cascader',
                props: [
                    { name: 'v-model', desc: '选中项绑定值' },
                    { name: 'options', desc: '可选项数据源，键名可通过 Props 属性配置' },
                    { name: 'props', desc: '配置选项' },
                    {
                        name: 'size',
                        desc: '尺寸',
                        options: [
                            { value: 'medium', label: 'medium' },
                            { value: 'small', label: 'small' },
                            { value: 'mini', label: 'mini' }
                        ]
                    },
                    { name: 'placeholder', desc: '输入框占位文本' },
                    {
                        name: 'disabled',
                        desc: '是否禁用',
                        options: [
                            { value: true, label: '是' },
                            { value: false, label: '否' }
                        ]
                    },
                    { name: 'clearable', desc: '是否支持清空选项' },
                    { name: 'show-all-levels', desc: '输入框中是否显示选中值的完整路径' },
                    { name: 'collapse-tags', desc: '多选模式下是否折叠Tag' },
                    { name: 'separator', desc: '选项分隔符' },
                    { name: 'filterable', desc: '是否可搜索选项' },
                    { name: 'filter-method', desc: '自定义搜索逻辑，第一个参数是节点node，第二个参数是搜索关键词keyword，通过返回布尔值表示是否命中' },
                    { name: 'debounce', desc: '搜索关键词输入的去抖延迟，毫秒' },
                    { name: 'before-filter', desc: '筛选之前的钩子，参数为输入的值，若返回 false 或者返回 Promise 且被 reject，则停止筛选' },
                    { name: 'popper-class', desc: '自定义浮层类名' }
                ],
                selected: true
            }
        ]
    },
    {
        name: '开关',
        icon: 'switch',
        label: '替换Label',
        html: [
            {
                htmlLabel: 'el-switch',
                props: [
                    { name: 'v-model', desc: '选中项绑定值' },
                    { name: 'options', desc: '可选项数据源，键名可通过 Props 属性配置' },
                    { name: 'props', desc: '配置选项' },
                    { name: 'size', desc: '尺寸', options: ['medium', 'small', 'mini'] },
                    { name: 'placeholder', desc: '输入框占位文本' },
                    { name: 'disabled', desc: '是否禁用' },
                    { name: 'clearable', desc: '是否支持清空选项' },
                    { name: 'show-all-levels', desc: '输入框中是否显示选中值的完整路径' },
                    { name: 'collapse-tags', desc: '多选模式下是否折叠Tag' },
                    { name: 'separator', desc: '选项分隔符' },
                    { name: 'filterable', desc: '是否可搜索选项' },
                    { name: 'filter-method', desc: '自定义搜索逻辑，第一个参数是节点node，第二个参数是搜索关键词keyword，通过返回布尔值表示是否命中' },
                    { name: 'debounce', desc: '搜索关键词输入的去抖延迟，毫秒' },
                    { name: 'before-filter', desc: '筛选之前的钩子，参数为输入的值，若返回 false 或者返回 Promise 且被 reject，则停止筛选' },
                    { name: 'popper-class', desc: '自定义浮层类名' }
                ],
                selected: true
            }
        ]
    },
    {
        name: '滑块',
        icon: 'slider',
        label: '替换Label',
        html: [
            {
                htmlLabel: 'el-slider',
                props: [
                    { name: 'v-model', desc: '绑定值' },
                    { name: 'min', desc: '最小值' },
                    { name: 'max', desc: '最大值' },
                    { name: 'disabled', desc: '是否禁用' },
                    { name: 'step', desc: '步长' },
                    { name: 'show-input', desc: '是否显示输入框，仅在非范围选择时有效' },
                    { name: 'show-input-controls', desc: '在显示输入框的情况下，是否显示输入框的控制按钮' },
                    { name: 'input-size', desc: '输入框的尺寸' },
                    { name: 'show-stops', desc: '是否显示间断点' },
                    { name: 'show-tooltip', desc: '是否显示 tooltip' },
                    { name: 'format-tooltip', desc: '格式化 tooltip message' },
                    { name: 'range', desc: '是否为范围选择' },
                    { name: 'vertical', desc: '是否竖向模式' },
                    { name: 'height', desc: 'Slider 高度，竖向模式时必填' },
                    { name: 'label', desc: '屏幕阅读器标签' },
                    { name: 'debounce', desc: '输入时的去抖延迟，毫秒，仅在show-input等于true时有效' },
                    { name: 'tooltip-class', desc: 'tooltip 的自定义类名' },
                    { name: 'marks', desc: '标记， key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标记可以单独设置样式' }
                ],
                selected: true
            }
        ]
    },
    {
        name: '日期选择器',
        icon: 'date',
        label: '替换Label',
        html: [
            {
                htmlLabel: 'el-date-picker',
                props: [
                    { name: 'v-model', desc: '绑定值' },
                    { name: 'readonly', desc: '完全只读' },
                    { name: 'disabled', desc: '是否禁用' },
                    { name: 'editable', desc: '文本框可输入' },
                    { name: 'clearable', desc: '是否显示清除按钮' },
                    { name: 'size', desc: '输入框尺寸' },
                    { name: 'placeholder', desc: '非范围选择时的占位内容' },
                    { name: 'start-placeholder', desc: '范围选择时开始日期的占位内容' },
                    { name: 'end-placeholder', desc: '范围选择时结束日期的占位内容' },
                    { name: 'type', desc: '显示类型' },
                    { name: 'format', desc: '显示在输入框中的格式' },
                    { name: 'align', desc: '对齐方式' },
                    { name: 'popper-class', desc: 'DatePicker 下拉框的类名' },
                    { name: 'picker-options', desc: '当前时间日期选择器特有的选项参考下表' },
                    { name: 'range-separator', desc: '选择范围时的分隔符' },
                    { name: 'default-value', desc: '可选，选择器打开时默认显示的时间' },
                    { name: 'default-time', desc: '范围选择时选中日期所使用的当日内具体时刻' },
                    { name: 'value-format', desc: '可选，绑定值的格式。不指定则绑定值为 Date 对象' },
                    { name: 'name', desc: '原生属性' },
                    { name: 'unlink-panels', desc: '在范围选择器里取消两个日期面板之间的联动' },
                    { name: 'prefix-icon', desc: '自定义头部图标的类名' },
                    { name: 'clear-icon', desc: '自定义清空图标的类名' },
                    { name: 'validate-event', desc: '输入时是否触发表单的校验' }
                ],
                selected: true
            }
        ]
    }
]
