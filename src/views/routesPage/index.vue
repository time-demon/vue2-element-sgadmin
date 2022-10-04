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
}
</script>

<style lang="scss" scoped>
.default_container {
    display: grid;
    grid-template-columns: repeat(2, 49%);
    justify-content: space-between;
}
</style>