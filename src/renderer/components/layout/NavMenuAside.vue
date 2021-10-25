<template>
    <div class="nav-menu-aside">
        <el-menu mode="vertical" :collapse="isCollapse" active-text-color="#FF7A45" unique-opened style="padding-bottom: 60px">
            <el-submenu index="1">
                <template slot="title">
                    <span>Form</span>
                </template>
                <draggable v-model="menuItems" :group="{ name: 'component', pull: 'clone', put: false }">
                    <transition-group>
                        <el-menu-item v-for="(item, index) in menuItems" :key="index">
                            <i :class="[`iconfont icon-${item.icon}`]"></i>
                            <span>{{item.name}}</span>
                        </el-menu-item>
                    </transition-group>
                </draggable>
            </el-submenu>
        </el-menu>
        <div class="menusSwitch" :class="isCollapse?'close':'open'">
            <div @click="onSwitch">
                <i :class="isCollapse?'iconfont icon-hosjoy_outdent':'iconfont icon-hosjoy_indent'"></i>
                <span>收起</span>
            </div>
        </div>
    </div>
</template>
<script>
import draggable from 'vuedraggable'
import menuItems from '@/config/index'
export default {
    name: 'NavMenuAside',
    components: {
        draggable
    },
    data () {
        return {
            isCollapse: false,
            menuItems: menuItems
        }
    },
    watch: {
        isCollapse (val) {
            this.$emit('back-event', val)
        }
    },
    methods: {
        onSwitch () {
            this.isCollapse = !this.isCollapse
        }
    }
}
</script>
<style lang="scss" scoped>
.nav-menu-aside {
    position: relative;
    padding-bottom: 60px;
    .menusSwitch {
        position: fixed;
        bottom: 0;
        left: 0;
        height: 60px;
        text-align: left;
        line-height: 60px;
        background: $blackLight;
        color: $whiteColor;

        i {
            margin-right: 10px;
            font-size: 16px;
            color: #bfbfbf;
        }
        span {
            font-size: 12px;
            color: #bfbfbf;
        }
        div {
            margin: 0 24px;
            border-top: 1px solid #292929;
        }
    }
}

/deep/ .el-menu {
    border: 0;
    background-color: $blackLight;
    .el-menu-item,
    .el-submenu {
        text-align: left;
        font-size: 14px;
        .el-menu-item {
            padding-left: 50px !important;
            font-size: 12px;
            color: #bfbfbf;
        }
        .el-submenu {
            font-size: 12px;
            color: #bfbfbf;

            .el-submenu__title {
                padding-left: 50px !important;
                font-size: 12px;
                color: #bfbfbf;
            }
            .el-menu-item {
                padding-left: 70px !important;
            }
        }
    }
}
/deep/ .el-menu-item {
    padding-left: 24px !important;
    color: #bfbfbf;

    i {
        margin-right: 10px;
    }
}
/deep/ .el-submenu__title {
    padding-left: 24px !important;
    color: #bfbfbf;

    i {
        margin-right: 10px;
    }
}
</style>
<style lang="scss">
.el-menu--vertical ul {
    background: rgba($color: #191919, $alpha: 0.9);

    .el-menu-item,
    .el-submenu {
        color: #bfbfbf;
        font-size: 12px;

        .el-submenu__title {
            color: #bfbfbf;
            font-size: 12px;
        }
    }
}
.el-menu-item:focus {
    background-color: $blackColor !important;
}
.el-menu-item:hover {
    background-color: $blackColor !important;
}
.el-submenu__title:hover {
    background-color: $blackColor !important;
}
</style>
