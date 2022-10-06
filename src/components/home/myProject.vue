<!-- 我的项目 -->
<template>
    <cardVue v-loading="loading" :title="'我的开源项目(云端获取)'" :titleShow="true" shadow="nerver">
        <template v-slot:aa>
            <el-collapse v-model="activeNames">
                <el-collapse-item v-for="(item,index) in projectData" :title="index+1+'. '+item.name"
                    :name="item.index">
                    <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-light">官网预览：<el-link :href="item.homepage" size="12"
                                    target="_blank" icon="el-icon-link">点我访问</el-link>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">更新时间：</div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                Github：<el-link :href="'http://github.com/'+item.full_name" size="12" target="_blank"
                                    icon="el-icon-link">点我访问</el-link>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-light">
                                Gitee：<el-link :href="'http://gitee.com/'+item.full_name" size="12" target="_blank"
                                    icon="el-icon-link">点我访问</el-link>
                            </div>
                        </el-col>
                    </el-row>
                    简介：{{item.description}}
                </el-collapse-item>
            </el-collapse>
        </template>
    </cardVue>
</template>

<script>
import cardVue from '@/components/default/card.vue';
export default {
    components: {
        cardVue,
    },
    data() {
        return {
            loading: true,
            activeNames: [],// 需要默认打开的
            projectData: [],// 文章数据
        }
    },
    mounted() {
        this.$network({
            url: "gitee/api/v5/users/time-demon/repos?access_token=15eee84b2a4423bb537f7dd88f8c714a&type=all&sort=created&direction=desc&page=1&per_page=20"
        }).then(res => {
            for (let i = 0; i < res.length; i++) {
                this.projectData.push({
                    name: res[i].name,
                    homepage: res[i].homepage,
                    full_name: res[i].full_name,
                    description: res[i].description,
                })
            }
            this.loading = false;
        });
    },
}

</script>

<style lang="scss">

</style>