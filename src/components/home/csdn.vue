<template>
    <cardVue v-loading="loading" title="我的CSDN文章(自动更新，仅最新三篇)" :titleShow="true" shadow="nerver" style="color:#676a6c">
        <template v-slot:aa>
            <el-collapse v-model="activeNames">
                <el-collapse-item v-for="(item,index) in articleData" :title="index+1+'. '+item.title"
                    :name="item.title">
                    <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">发布时间：{{item.postTime}}</div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-light">文章地址：<el-link :href="item.url" size="12"
                                    target="_blank" icon="el-icon-link">点我访问</el-link>
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
            activeNames: [1],
            articleData: [],// 文章数据
        }
    },
    mounted() {
        this.$network({
            url: "csdn/community/home-api/v1/get-business-list?businessType=blog&username=qq_19322833"
        }).then(res => {
            for (let i = 0; i < 3; i++) {
                this.articleData.push(res.data.list[i])
            }
            this.loading = false;
        });
    },
}

</script>

<style lang="scss">

</style>