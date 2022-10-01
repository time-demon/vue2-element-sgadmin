<template>
    <div class="page-container">
        <sidebarVue :sidebarState="sidebarState" />
        <mainVue :sidebarState="sidebarState" />
    </div>
</template>

<script>
import sidebarVue from '@/components/sidebar.vue';// 侧边栏容器
import mainVue from '@/components/main.vue';// 右边容器
export default {
    components: {
        sidebarVue,
        mainVue,
    },
    data() {
        return {
            sidebarState: 'open',// 侧边栏控制：open展开，close关闭，fold折叠
        }
    },
    mounted() {
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