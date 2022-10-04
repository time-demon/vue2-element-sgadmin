<!-- 卡片模板 -->
<template>
    <el-card class="box-card" :shadow="shadow">
        <div slot="header" class="clearfix" v-if="titleShow">
            <span>{{title}}</span>
        </div>
        <div class="text item">
            <slot name="aa"></slot>
        </div>
    </el-card>
</template>

<script>
export default {
    props: {
        title: String,
        titleShow: Boolean,
        shadow: String
    }
}
</script>

<style lang="scss" scoped>
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.box-card {
    width: auto;
}
</style>