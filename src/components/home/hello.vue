<template>
    <cardVue title="你好" :titleShow="false" shadow="nerver" style="color:#676a6c">
        <template v-slot:aa>
            <h2 class="title"> 时光后台管理系统</h2>
            <p class="info">当前版本：v1.0.0</p>
            <p>主要技术：Vue2全家桶、Element UI、Axios、Sass</p>
            <p>第三方依赖：nprogress（网页进度条）、screenfull(网页全屏)</p>
            <p>
                <el-tag type="success" size="medium">$免费开源</el-tag>
            </p>
            <p>
                简介：网上有很多的vue框架模板，他们都有一个共同的特点：完整、安全、高效、美观，但对于个人项目来说可能相对于复杂和费时，于是萌生了自己写一套后台管理系统模板的想法，参考网上现有的模板，从零开始搭建这个项目。
                <br>
                值得一说的是，她（时光后台管理系统）现在还是一个婴儿，包括她的作者也是，所以希望各位业界大佬指正和建议。
            </p>
        </template>
    </cardVue>
</template>

<script>
import cardVue from '@/components/card.vue';
export default {
    components: {
        cardVue
    },
}
</script>

<style lang="scss" scoped>
.title {
    font-weight: 400;
    padding-bottom: 15px;
}

p {
    margin: 5px 0;
}
</style>