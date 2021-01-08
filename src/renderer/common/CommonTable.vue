<template>
    <div class="page-table clearfix">
        <!-- 列表 -->
        <el-table :data="tableData" :row-key="rowKey" @select="handleSelect" @select-all="handleSelectAll" @selection-change="handleSelectionChange" :border="border" :stripe="stripe" :actionMinWidth="actionMinWidth" :span-method="spanMethod" :lazy="true" :max-height="maxHeight"
            :show-summary="isShowSum" :summary-method="getSum" :tree-props="{ hasChildren: 'hasChildren', children: 'children' }" :load="load" @sort-change="handleSortChange" :indent="indent" :row-class-name="rowClassName" @row-click="handleRowClick" @expand-change="handleExpandChange">
            <el-table-column type="expand" v-if="isExpand" align="center" fixed="left">
                <template slot-scope="scope">
                    <slot name="expand" :data="scope"></slot>
                </template>
            </el-table-column>
            <el-table-column type="selection" v-if="isMultiple" align="center" :selectable="selectable"></el-table-column>
            <el-table-column v-if="isShowIndex" type="index" label="序号" :index="indexMethod" align="center" width="60"></el-table-column>
            <el-table-column v-for="item in tableLabel" :key="item.label" :label="item.label" :prop="item.prop" :sortable="item.sortable" :align="item.align||'center'" :fixed="item.position||false" :min-width="item.width?item.width:'160'" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <slot v-if="item.formatter === 'money'" :name="item.prop" :data="scope">{{scope.row[item.prop] | money(item.fixed)}}</slot>
                    <slot v-else-if="item.formatter === 'moneyShow'" :name="item.prop" :data="scope">{{scope.row[item.prop] | moneyShow(item.fixed)}}</slot>
                    <slot v-else-if="item.formatter === 'moneyNum'" :name="item.prop" :data="scope">{{scope.row[item.prop] | moneyNum(item.fixed)}}</slot>
                    <slot v-else-if="item.formatter === 'dateTime'" :name="item.prop" :data="scope">{{scope.row[item.prop] | formatterTime}}</slot>
                    <slot v-else-if="item.formatter === 'dateTimes'" :name="item.prop" :data="scope">{{scope.row[item.prop] | formatterTimes}}</slot>
                    <slot v-else-if="item.formatter === 'date'" :name="item.prop" :data="scope">{{scope.row[item.prop] | formatterDate}}</slot>
                    <slot v-else :name="item.prop" :data="scope">{{formatter(scope.row[item.prop])}}</slot>
                </template>
            </el-table-column>
            <el-table-column ref="action" label="操作" v-if="isAction" align="center" :min-width="minWidth" :fixed="actionFixed" class-name="action">
                <template slot-scope="scope">
                    <slot name="action" :data="scope"></slot>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination :total="paginationInfo.total" layout="total, prev, pager, next,jumper" :current-page="paginationInfo.pageNumber" :page-size.sync="paginationInfo.pageSize" @current-change="handleCurrentChange" v-if="isPagination && paginationInfo.total"></el-pagination>
    </div>
</template>
<script>
export default {
    data () {
        return {
            minWidth: '',
            paginationInfo: {}
        }
    },
    props: {
        stripe: {
            type: Boolean,
            default: false
        },
        border: {
            type: Boolean,
            default: true
        },
        isExpand: {
            type: Boolean,
            default: false
        },
        isMultiple: {
            type: Boolean,
            default: false
        },
        isAction: {
            type: Boolean,
            default: false
        },
        isPagination: {
            type: Boolean,
            default: true
        },
        isShowIndex: {
            type: Boolean,
            default: false
        },
        isShowSum: {
            type: Boolean,
            default: false
        },
        isBlank: {
            type: Boolean,
            default: false,
            desc: '当数据为空的时候是否空白显示，false的时候默认显示为-'
        },
        tableData: {
            type: Array,
            default: () => {

            }
        },
        tableLabel: {
            type: Array,
            default: () => {

            }
        },
        pagination: {
            type: Object,
            default: () => {
                return {
                    total: 0,
                    pageSize: 10,
                    pageNumber: 1
                }
            }
        },
        multiSelection: {
            type: Array,
            default: () => ([])
        },
        actionMinWidth: {
            type: Number,
            default: 100
        },
        selectable: {
            type: Function,
            default: () => true
        },
        rowClassName: {
            type: Function,
            default: () => ''
        },
        spanMethod: {
            type: Function,
            default: () => true
        },
        getSum: {
            type: Function,
            default: () => true
        },
        load: {
            type: Function,
            default: () => true
        },
        rowKey: {
            type: String,
            default: ''
        },
        treeProps: {
            type: Object,
            default: () => ({ children: 'children', hasChildren: 'hasChildren' })
        },
        indent: {
            type: Number,
            default: 4
        },
        maxHeight: {
            type: Number,
            default: 10000
        },
        actionFixed: {
            type: String,
            default: 'right'
        }
    },
    watch: {
        pagination: {
            handler (val) {
                this.paginationInfo = val
            },
            immediate: true
        }
    },
    methods: {
        initWidth () {
            if (this.actionMinWidth) {
                this.minWidth = this.actionMinWidth
            }
        },
        handleSelectionChange (val) {
            this.$emit('update:multiSelection', val)
        },
        handleCurrentChange (val) {
            this.paginationInfo.pageNumber = val
            this.$emit('onCurrentChange', this.paginationInfo)
        },
        handleSortChange (val) {
            this.$emit('onSortChange', val)
        },
        handleSelect (selection, row) {
            this.$emit('select', selection, row)
        },
        handleSelectAll (selection) {
            this.$emit('selectAll', selection)
        },
        handleRowClick (row, column, event) {
            this.$emit('rowClick', row, column, event)
        },
        handleExpandChange (row, type) {
            this.$emit('expandChange', row, type)
        },
        indexMethod (index) {
            if (this.isPagination) {
                return this.paginationInfo.pageSize * (this.paginationInfo.pageNumber - 1) + index + 1
            } else {
                return index + 1
            }
        },
        formatter (data) {
            return (data || data === 0) ? data : (this.isBlank ? '' : '-')
        }
    },
    mounted () {
        this.initWidth()
    }
}
</script>

<style lang="scss" scoped>
.el-pagination {
    margin: 20px 0;
    float: right;
    text-align: right;
}
/deep/ .el-pagination__editor.el-input {
    width: 50px !important;
}
/deep/ .el-table th {
    color: #000000;
    font-size: 12px;
    font-weight: 400;
    background: rgba(242, 242, 244, 1);
}
// 暂无数据
/deep/ .el-table__empty-block {
    min-height: 49px;
}
/deep/ .el-table__empty-text {
    line-height: 49px;
}
/deep/ .el-table td {
    font-size: 12px;
    &:last-child {
        .cell span:not(:first-child) {
            margin-left: 10px;
        }
    }
}
/deep/ .el-table-column--selection .cell {
    padding-left: 10px;
    padding-right: 10px;
}
/deep/ .action {
    // .cell {
    //     display: flex;
    //     flex-direction: row;
    //     width: 100%;
    // }
}
</style>
