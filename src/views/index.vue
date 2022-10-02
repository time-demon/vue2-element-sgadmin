<template>
    <div class="page-container">
        <sidebarVue :sidebarState="sidebarState" />
        <mainVue :sidebarState="sidebarState" />
    </div>
</template>

<script>
import sidebarVue from '@/views/sidebar.vue';// 侧边栏容器
import mainVue from '@/views/main.vue';// 右边容器
export default {
    components: {
        sidebarVue,
        mainVue,
    },
    data() {
        return {
            loading: true,// 整页loading
            sidebarState: 'open',// 侧边栏控制：open展开，close关闭，fold折叠
        }
    },
    mounted() {

        // 设置默认的路由标签
        let routeLabel = [
            {
                title: this.$route.meta.title,
                path: this.$route.fullPath
            }
        ];
        this.$store.state.routeLabel = routeLabel;

        if (window.innerWidth < 750) {
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