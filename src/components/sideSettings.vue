<!-- 侧边布局设置弹窗 -->
<template>
    <el-drawer title="布局设置" :visible.sync="sideSettings" :direction="'rtl'" :before-close="sideSettingsClose">
        <div class="sideSettings_container">
            开发中...
        </div>
    </el-drawer>
</template>

<script>
export default {
    props: {
        sideSettings: Boolean,
    },
    methods: {
        sideSettingsClose() {
            this.$emit('sideSettingsClose');
        },
    },
}
</script>

<style lang="scss" scoped>
.sideSettings_container {
    padding: 20px;
}
</style>