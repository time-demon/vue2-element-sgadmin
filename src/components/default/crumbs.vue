<!-- 路由面包屑 -->
<template>
    <div class="crumbs_container" style="padding-left: 10px;">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item v-for="item in crumbs" :to="{ path: item.path }">
                {{item.meta.title}}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    data() {
        return {
            crumbs: [],// 面包屑数据
        }
    },
    watch: {
        $route: {
            handler: function (val, oldVal) {
                // 面包屑
                this.crumbs = this.$route.matched.filter((item, index) => index != 0 && item.path != '/home');
            },
            // 深度观察监听
            deep: true
        },
    },
    mounted() {
        // 获取面包屑
        this.crumbs = this.$route.matched.filter((item, index) => index != 0 && item.path != '/home');
    },
}
</script>

<style lang="scss" scoped>
.crumbs_container {
    min-width: 50px;
    height: 50px;
    display: flex;
    vertical-align: top;
    justify-content: center;
    align-items: center;
    font-size: 23px;
}
</style>