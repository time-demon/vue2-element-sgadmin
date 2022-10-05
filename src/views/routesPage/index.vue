<!-- 后台首页 -->
<template>
    <div>
        <div class="default_container mobileBlock">
            <div>
                <templateInforVue />
            </div>
            <div>
                <myProjectVue />
                <csdnVue />
            </div>
        </div>
    </div>
</template>

<script>
import templateInforVue from "@/components/home/templateInfor.vue";
import csdnVue from "@/components/home/csdn.vue";
import myProjectVue from "@/components/home/myProject.vue";
export default {
    components: { templateInforVue, csdnVue, myProjectVue },
    mounted() {
        // 消息提示
        let html = `
            <h3>感谢阁下使用：${this.$store.state.siteInfo.title}</h3>
            <p>tips：推荐 电脑端 预览本站哟~</p>
        `
        this.$alert(html, '您好！', {
            confirmButtonText: '确定',
            dangerouslyUseHTMLString: true,
            closeOnClickModal: true,
            callback: action => {
            }
        });

    },
}
</script>

<style lang="scss" scoped>
.default_container {
    display: grid;
    grid-template-columns: repeat(2, 49%);
    justify-content: space-between;
}
</style>