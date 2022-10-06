<!-- 后台首页布局 -->
<template>
    <div class="page-container">
        <leftSidebarVue :sidebarState="sidebarState" />
        <rightContainerVue :sidebarState="sidebarState" />
        <lrToolsVue />
    </div>
</template>

<script>
import leftSidebarVue from '@/components/leftSidebar.vue';// 侧边栏容器
import rightContainerVue from '@/components/rightContainer.vue';// 右边容器
import lrToolsVue from '@/components/default/lrTools.vue';// 右小角悬浮工具
export default {
    components: { leftSidebarVue, rightContainerVue, lrToolsVue },
    data() {
        return {
            loading: true,// 整页loading
            sidebarState: 'open',// 侧边栏控制：open展开，close关闭，fold折叠
        }
    },
    mounted() {


        // console.log(this.$route.fullPath);
        let thisPagefullPath = this.$route.fullPath;
        // console.log(this.$router.options.routes[0].children);
        let nowRoutes = this.$router.options.routes[0].children;
        let a = []
        // console.log(nowRoutes.length);
        // 遍历一级导航
        for (let i = 0; i < nowRoutes.length; i++) {
            // 验证是否是当前页面
            if ('/' + nowRoutes[i].path == thisPagefullPath) {
                a.push('/' + nowRoutes[i].path)
                break
            }
            // 如果一级导航有二级导航
            if (nowRoutes[i].children != undefined && nowRoutes[i].children.length != 0) {
                // 遍历二级导航
                for (let j = 0; j < nowRoutes[i].children.length; j++) {
                    // 验证是否是当前页面
                    if ('/' + nowRoutes[i].path + '/' + nowRoutes[i].children[j].path == thisPagefullPath) {
                        a.push('/' + nowRoutes[i].path + '/' + nowRoutes[i].children[j].path)
                        break
                    }
                }
            }
        }

        if (window.innerWidth < 768) {
            this.sidebarState = 'close';
        };

    },
}
</script>

<style lang="scss">
.page-container {
    min-height: 100vh;
}
</style>