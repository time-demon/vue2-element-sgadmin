<template>
    <div>
        <div class="default_container mobileBlock">
            <templateInforVue />
            <csdnVue />
        </div>
    </div>
</template>

<script>
import templateInforVue from "@/components/home/templateInfor.vue";
import csdnVue from "@/components/home/csdn.vue";
export default {
    components: { templateInforVue, csdnVue },
    methods: {
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