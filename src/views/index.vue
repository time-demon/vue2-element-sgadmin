<template>
    <div class="page-container">
        <slot name="lrTools"></slot>
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