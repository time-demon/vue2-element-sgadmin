<!-- 右边容器 -->
<template>
    <div class="right-container" :style="navbarCss">

        <div class="top-container">
            <div class="top-navbar-container">
                <div class="tools-left">
                    <div :class="['tools-control hover',sidebarState == 'open'?'sg sg-side_unopen':'sg sg-side_open']"
                        @click="sidebar">
                    </div>
                    <div class="top-navbar-control">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item :to="{ path: '/' }">
                                首页
                            </el-breadcrumb-item>
                            <el-breadcrumb-item v-for="item in crumbs" :to="{ path: item.path }">
                                {{item.meta.title}}
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                </div>
                <div class="tools-right">
                    <div class="tools-right-control tool" :style="{display:viewSize.innerWidth<=750?'none':''}">
                        <div :class="['tools-control hover',item.icon]" v-for="item in rightTools" :title="item.title"
                            @click="rightClick">
                        </div>
                        <div :class="['tools-control hover sg ',screenfullState?'sg-fullscreen-exit':'sg-fullscreen-open']"
                            v-if="screenfullButState" title="全屏" @click="fullScreen">
                        </div>
                    </div>
                    <div class="tools-right-control hover avatar">
                        22
                    </div>
                </div>
            </div>
        </div>

        <!-- 右边容器的页面容器 -->
        <router-view class="appPage-container" />

    </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
    props: {
        sidebarState: ''
    },
    data() {
        return {
            screenfullButState: true,// 全屏按钮状态
            screenfullState: false,// 全屏状态
            viewSize: {},
            navbarCss: {},
            crumbs: [],
            rightTools: [// 导航栏右边工具
                {
                    title: 'Github',
                    icon: 'sg sg-github'
                },
                {
                    title: '文档',
                    icon: 'sg sg-wendang'
                },
            ]
        }
    },
    watch: {
        $route: {
            handler: function (val, oldVal) {
                // 面包屑
                this.crumbs = this.$route.matched.filter((item, index) => index != 0 && index != 1 && item.path != '/index');
            },
            // 深度观察监听
            deep: true
        },

        // 监控侧边栏状态
        sidebarState(newVal, oldVal) {
            this.navbar(newVal);
        },

    },
    mounted() {

        // 检测浏览器是否支持全屏
        if (!screenfull.isEnabled) this.screenfullButState = false;

        // 获取面包屑
        this.crumbs = this.$route.matched.filter((item, index) => index != 0 && index != 1 && item.path != '/index');

        this.viewSize = { innerWidth: window.innerWidth, innerHeight: window.innerHeight };
        window.onresize = () => {
            this.viewSize = { innerWidth: window.innerWidth, innerHeight: window.innerHeight };
            if (window.innerWidth <= 750) {
                this.$parent.sidebarState = 'close';
            } else {
                this.$parent.sidebarState = 'open';
            }
        };

        this.navbar(this.sidebarState);

    },
    methods: {

        // 导航栏控制
        navbar(state) {
            if (state == 'fold') {
                this.navbarCss.marginLeft = '55px';
            } else if (state == 'open') {
                this.navbarCss.marginLeft = '240px';
            } else if (state == 'close') {
                this.navbarCss.marginLeft = 0;
            }
        },

        rightClick(e) {
            console.log(e.target);
        },

        // 侧边栏控制
        sidebar() {
            if (window.innerWidth <= 750) {
                this.$parent.sidebarState = this.$parent.sidebarState == 'open' ? 'close' : 'open';
            } else {
                this.$parent.sidebarState = this.$parent.sidebarState == 'fold' ? 'open' : 'fold';
            }
        },

        // 全屏
        fullScreen() {
            if (!this.screenfullState) screenfull.request();
            screenfull.exit();
            this.screenfullState = !this.screenfullState;
        },

    }
}
</script>

<style lang="scss" scoped>
.right-container {
    margin-left: 240px;
    min-height: 100vh;
    transition: all .3s;

    >.top-container {
        >.top-navbar-container {
            border-bottom: 1px solid #e9e9e9;
            height: 50px;
            display: flex;
            vertical-align: top;
            justify-content: space-between;
            color: #5a5e66;

            >.tools-left {
                display: flex;
                vertical-align: top;

                >.top-navbar-control {
                    min-width: 50px;
                    height: 50px;
                    display: flex;
                    vertical-align: top;
                    justify-content: center;
                    align-items: center;
                    font-size: 23px;
                }
            }

            .tools-control {
                width: 50px;
                height: 50px;
                display: flex;
                vertical-align: top;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                font-size: 23px;
            }

            >.tools-right {
                display: flex;
                vertical-align: top;

                >.tools-right-control {
                    min-width: 50px;
                    height: 50px;
                    cursor: pointer;
                    display: flex;
                    vertical-align: top;
                    justify-content: center;
                    align-items: center;
                    font-size: 23px;
                }
            }

            .hover:hover {
                background: #f7f6f6;
            }
        }
    }

    >.appPage-container {
        min-height: calc(100vh - 50px);
        padding: 10px;
    }
}
</style>