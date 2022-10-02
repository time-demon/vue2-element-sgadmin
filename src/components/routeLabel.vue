<template>
    <div class="routeLabel_container">
        <div :class="['routeLabel',$route.fullPath == item.path?'routeLabelCheck':'']"
            v-for="(item,index) in routeLabelData" @click="routeLabelCheck(index)" :title="item.path">
            <div class="routeLabel_title ">
                {{item.title}}
            </div>
            <span class="routeLabel_close" @click.stop="routeLabelClose(index)">×</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            routeLabelData: [],// 路由标签数据
        }
    },
    watch: {
        "$store.state.routeLabel": {
            handler: function (newVal, oldVal) {
                this.getrouteLabelData();
            }
        },
    },
    mounted() {
        this.getrouteLabelData();
    },
    methods: {
        // 获取路由标签
        getrouteLabelData() {
            this.routeLabelData = this.$store.state.routeLabel;
        },
        // 访问选定的路由标签
        routeLabelCheck(index) {
            this.$router.push(this.routeLabelData[index].path);
        },
        // 关闭选定的路由标签
        routeLabelClose(index) {
            if (this.$store.state.routeLabel[index - 1] == undefined && this.$store.state.routeLabel[index + 1] != undefined) { // 前无后有
                this.$router.push(this.$store.state.routeLabel[index + 1].path);
                console.log(1);
            } else if (this.$store.state.routeLabel[index - 1] != undefined && this.$store.state.routeLabel[index + 1] != undefined) {// 前有后有
                console.log(2);
                this.$router.push(this.$store.state.routeLabel[index + 1].path);
            } else if (this.$store.state.routeLabel[index - 1] != undefined && this.$store.state.routeLabel[index + 1] == undefined) { // 前有后无
                console.log(3);
                this.$router.push(this.$store.state.routeLabel[index - 1].path);
            } else if (this.$store.state.routeLabel[index - 1] == undefined && this.$store.state.routeLabel[index + 1] == undefined) {//前无后无
                this.$router.push('/');
                let routeLabel = this.$router.options.routes[0].children[0].children[0];
                this.$store.state.routeLabel = [{
                    title: routeLabel.meta.title,
                    path: '/' + routeLabel.path
                }]
                return
            }
            this.$store.state.routeLabel.splice(index, 1);
        }
    },
}
</script>

<style lang="scss" scoped>
.routeLabel_container {
    display: flex;
    vertical-align: top;
    padding: 5px 0;
    border-bottom: 1px solid #e9e9e9;

    >.routeLabel {
        width: auto;
        margin: 0 2px;
        font-size: 13px;
        padding: 3px 8px;
        background: #fff;
        color: #aaa;
        border: 1px solid #d8dce5;
        text-align: center;
        cursor: pointer;
        border-radius: 1px;
        display: flex;
        vertical-align: top;
        align-items: center;

        >.routeLabel_title {
            display: flex;
            vertical-align: top;
            align-items: center;
            padding-right: 5px;
        }

        >.routeLabel_close {
            border-radius: 50%;
            width: 10px;
            height: 10px;
            line-height: 10px;
        }

        >.routeLabel_close:hover {
            background: #fff;
            color: #42b983 !important;
        }
    }

    >.routeLabelCheck {
        background: #42b983;
        color: #fff;
        border: 1px solid #42b983;

        >.routeLabel_title::before {
            content: "";
            background: #fff;
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            margin-right: 5px;
        }
    }

    >.routeLabel:hover {
        background: #42b983;
        color: #fff;
        border: 1px solid #42b983;
    }
}
</style>