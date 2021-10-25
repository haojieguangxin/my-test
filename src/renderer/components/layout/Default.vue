<template>
    <el-container class="body-container">
        <el-container class="container clearfix">
            <el-aside class="aside" :class="isCollapse ? 'close' : 'open'">
                <div class="menufixed">
                    <NavMenuAside @back-event="menuBack" />
                </div>
            </el-aside>
            <el-main ref="mainContent" class="content">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import NavMenuAside from './NavMenuAside'
export default {
    name: 'default-layout',
    components: {
        NavMenuAside
    },
    data () {
        return {
            isCollapse: false
        }
    },
    watch: {
        '$route' (val) {
            this.$refs.mainContent.$el.scrollTop = 0
        }
    },
    methods: {
        menuBack (val) {
            this.isCollapse = val
        }
    }
}
</script>

<style lang="scss" scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    height: 50px !important;
    background-color: $blackColor;
}
.body-container {
    height: 100%;
}
.container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #efeff4;
}

.aside::-webkit-scrollbar {
    width: 0px;
}

.aside {
    position: relative;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: $blackLight;
}
.content {
    position: relative;
    overflow: overlay;
}
.minLeft {
    left: 64px;
    transition: 0.3s;
}
.maxLeft {
    left: 200px;
    transition: 0.3s;
}
/deep/ .el-loading-spinner i {
    color: $hosjoyColor;
}
/deep/ .el-loading-spinner .el-loading-text {
    color: $hosjoyColor;
}
/deep/ .el-loading-parent--relative {
    position: relative !important;
    overflow: hidden;
}
/deep/ .el-loading-mask {
    position: fixed;
    z-index: 9999;
    background-color: rgba(255, 255, 255, 0.9);
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    -webkit-transition: opacity 0.3s;
    transition: opacity 0.3s;
}
</style>
