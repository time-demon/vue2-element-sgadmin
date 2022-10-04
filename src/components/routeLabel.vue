<template>
    <div class="routeLabel_container">
        <transition name="el-zoom-in-center" v-for="(item,index) in routeLabelData">
            <div v-show="item.show" :class="['routeLabel',$route.fullPath == item.path?'routeLabelCheck':'']"
                @click="routeLabelCheck(index)" @contextmenu.prevent='mouseRight()'>
                <div class="routeLabel_title ">
                    {{item.title}}
                </div>
                <span v-show="item.close != false" class="routeLabel_close"
                    @click.stop="routeLabelClose(index)">×</span>
            </div>
        </transition>
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
        "$store.state.routeLabel": {// 监听vuex里路由标签数据的变化
            handler: function (newVal, oldVal) {
                this.getrouteLabelData();
            },
            deep: true
        },
    },
    mounted() {

        // 设置默认的路由标签
        let routeLabel = [// 这里是设置常驻标签
            {
                title: '首页',
                path: '/index',
                show: true,
                close: false
            },
        ];
        for (let i = 0; i < routeLabel.length; i++) {// 这里设置当前页面标签，会排除常驻标签
            if (this.$route.fullPath != routeLabel[i].path) {
                routeLabel.push(
                    {
                        title: this.$route.meta.title,
                        path: this.$route.fullPath,
                        show: true,
                    })
            }
        }
        this.$store.state.routeLabel = routeLabel;

        this.getrouteLabelData();
    },
    methods: {

        mouseRight() {
            console.log(1);
        },

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
            // 首先排除是首页且只有一个标签的时候
            this.$store.state.routeLabel[index].show = false;
            if (this.$store.state.routeLabel[index - 1] == undefined && this.$store.state.routeLabel[index + 1] != undefined) { // 前无后有
                this.$router.push(this.$store.state.routeLabel[index + 1].path);
            } else if (this.$store.state.routeLabel[index - 1] != undefined && this.$store.state.routeLabel[index + 1] != undefined) {// 前有后有
                this.$router.push(this.$store.state.routeLabel[index + 1].path);
            } else if (this.$store.state.routeLabel[index - 1] != undefined && this.$store.state.routeLabel[index + 1] == undefined) { // 前有后无
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
            setTimeout(() => {
                this.$store.state.routeLabel.splice(index, 1);
            }, 200);
        },

    },

}
</script>

<style lang="scss" scoped>
.routeLabel_container {
    display: flex;
    vertical-align: top;
    padding: 5px 5px 0;
    height: auto;

    >.routeLabel {
        width: auto;
        margin: 0 2px;
        font-size: 14px;
        padding: 3px 10px;
        background: #eee;
        color: #aaa;
        text-align: center;
        cursor: pointer;
        border-radius: 1px;
        display: flex;
        justify-content: center;
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
            color: #aaa;
        }

        >.routeLabel_close:hover {
            color: var(--background_color);
        }
    }

    >.routeLabelCheck {
        height: 25px;
        background: var(--routeLabel_background);
        color: #333;
        border: none;
        position: relative;
        text-align: center;
        border-radius: 2px 2px 0 0;

        >.routeLabel_title::before {
            content: "";
            background: var(--background_color);
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            margin-right: 5px;
        }
    }

    >.routeLabel:hover {
        background: #fff;
        color: var(--background_color);
        border: none;
    }

}
</style>