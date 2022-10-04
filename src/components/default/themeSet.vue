<!-- 侧边布局设置弹窗 -->
<template>
    <el-drawer title="布局设置" :visible.sync="themeSet" :direction="'rtl'" :before-close="themeSetClose">
        <div class="themeSet_container">
            开发中...
        </div>
    </el-drawer>
</template>

<script>
export default {
    props: {
        themeSet: Boolean,
    },
    methods: {
        themeSetClose() {
            this.$emit('themeSetClose');
        },
    },
}
</script>

<style lang="scss" scoped>
.themeSet_container {
    padding: 20px;
}
</style>