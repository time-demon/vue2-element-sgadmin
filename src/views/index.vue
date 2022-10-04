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