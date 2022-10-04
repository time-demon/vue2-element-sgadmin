<template>
    <cardVue title="模板信息" :titleShow="true" shadow="nerver" style="color:#676a6c">
        <template v-slot:aa>
            <h2 class="title"> 时光后台管理系统（前后端分离）</h2>
            <p class="info">作者：{{Config.author}} | 当前版本：v{{Config.version}}</p>
            <p>前端运用：Vue2全家桶、Element UI、Axios、Sass</p>
            <p>后端运用：Node.js、Express、MongoDB、jsonwebtoken</p>
            <p>特点：开箱即用，双端自适应响应式布局、主题更换、gzip压缩支持、Element UI样式优化、三级导航、页面数据缓存、路径面包屑和路由标签、完整的登陆验证交互和token验证交互等，更多开发中...
            </p>
            <p class="link">
                <el-tag type="success" size="medium">$免费开源</el-tag>
                <el-tag size="medium">
                    <el-link type="primary" :href="Config.github" target="_blank"><i class="sg sg-github"></i>Github
                    </el-link>
                </el-tag>
            </p>
            <p>
                简介：网上有很多的vue框架模板，他们都有一个共同的特点：完整、安全、高效、美观，但对于个人项目来说可能相对于复杂和费时，于是萌生了自己写一套后台管理系统模板的想法，参考网上现有的模板，从零开始搭建这个项目。
                <br>
                值得一说的是，她（时光后台管理系统）现在还是一个婴儿，包括她的作者也是，所以希望各位业界大佬指正和建议。
            </p>
            <el-collapse v-model="activeNames">
                <el-collapse-item v-for="(item,att) in Config" v-if="att=='dependencies'||att=='devDependencies'"
                    :title="item.name+'(自动更新)'" :name="item.name">
                    <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">名称</div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-light">版本</div>
                        </el-col>
                    </el-row>
                    <el-row v-for="(itemb,att) in item" v-if="att != 'name'">
                        <el-col :span="12">
                            <div class="grid-content bg-purple">{{att}}</div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-light">{{itemb}}</div>
                        </el-col>
                    </el-row>
                </el-collapse-item>
            </el-collapse>
        </template>
    </cardVue>
</template>

<script>
import cardVue from '@/components/default/card.vue';
import Config from '#/package.json';
export default {
    components: {
        cardVue
    },
    data() {
        return {
            Config: {},
            activeNames: ['1']
        }
    },
    mounted() {
        this.Config = { dependencies: Config.dependencies, devDependencies: Config.devDependencies, author: Config.author, version: Config.version, github: Config.github };
        this.Config.dependencies.name = '环境依赖';
        this.Config.devDependencies.name = '环境依赖(仅开发环境)';
    },
    methods: {
    },
}
</script>

<style lang="scss" scoped>
.title {
    font-weight: 400;
    padding-bottom: 15px;
}

.link {

    >span {
        margin-right: 5px;
    }
}

p {
    margin: 5px 0;
}
</style>