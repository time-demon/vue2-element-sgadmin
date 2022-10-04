<!-- 右边容器 -->
<template>
    <div class="right-container" :style="[navbarCss,{width: viewSize.innerWidth<768?'100vw':''}]">
        <div class="top-container">

            <div class="top-navbar-container">
                <div class="tools-left">
                    <div :class="['tools-control hover',sidebarState == 'open'?'sg sg-side_unopen':'sg sg-side_open']"
                        @click="sidebar" :title="sidebarState == 'open'?'折叠侧边栏':'展开侧边栏'">
                    </div>

                    <!-- 路由面包屑 -->
                    <crumbsVue />

                </div>

                <div class="tools-right">
                    <div class="tools-right-control tool" :style="{display:viewSize.innerWidth<=768?'':''}">
                        <div :class="['tools-control hover',item.icon]" v-for="(item,index) in rightOpens"
                            :title="item.title" @click="rightOpenClick(index)">
                        </div>
                        <div :class="['tools-control hover sg ',screenfullState?'sg-fullscreen-exit':'sg-fullscreen-open']"
                            v-show="screenfullButState" :title="screenfullState?'退出全屏':'全屏'" @click="fullScreen">
                        </div>
                    </div>
                    <div class="tools-right-control hover avatar">
                        <el-avatar icon="el-icon-user-solid" size="small" src=""></el-avatar>
                        <ul class="avatar-tools">
                            <!-- <div class="avatar-tools_tri"></div> -->
                            <li class="avatar-tool">
                                <i class="el-icon-ice-drink"></i> 个人中心
                            </li>
                            <li class="avatar-tool" @click="">
                                <i class="el-icon-setting"></i> 更改密码
                            </li>
                            <li class="avatar-tool" @click="signOut">
                                <i class="el-icon-switch-button"></i> 退出登录
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- 路由标签 -->
            <routeLabelVue />
        </div>

        <!-- 右边容器的页面容器 -->
        <keep-alive>
            <router-view class="appPage-container" v-loading="loading" />
        </keep-alive>

    </div>
</template>

<script>
import screenfull from 'screenfull'
import crumbsVue from '@/components/default/crumbs.vue'
import routeLabelVue from '@/components/default/routeLabel.vue'
export default {
    components: {
        crumbsVue,
        routeLabelVue
    },
    props: {
        sidebarState: ''
    },
    data() {
        return {
            loading: true,
            screenfullButState: true,// 全屏按钮状态
            screenfullState: false,// 全屏状态
            viewSize: {},
            navbarCss: {},
            rightOpens: [// 导航栏右边链接
                {
                    title: '项目Github',
                    icon: 'sg sg-github',
                    url: 'https://github.com/time-demon/vue2-element-sgadmin'
                },
                {
                    title: '使用文档',
                    icon: 'sg sg-wendang',
                    url: ''
                },
            ],
        }
    },
    watch: {
        $route: {
            handler: function (val, oldVal) {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                }, 300)
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
        setTimeout(() => {
            this.loading = false;
        }, 300)

        // 检测浏览器是否支持全屏
        if (!screenfull.isEnabled) this.screenfullButState = false;

        this.viewSize = { innerWidth: window.innerWidth, innerHeight: window.innerHeight };
        window.onresize = () => {
            this.viewSize = { innerWidth: window.innerWidth, innerHeight: window.innerHeight };
            if (window.innerWidth <= 768) {
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

        // 打开右边链接 
        rightOpenClick(index) {
            if (this.rightOpens[index].url != '' && this.rightOpens[index].url != undefined) {
                window.open(this.rightOpens[index].url)
            };
        },

        // 侧边栏控制
        sidebar() {
            if (window.innerWidth <= 768) {
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

        // 退出登录
        signOut() {
            this.$confirm('确定要退出系统么？', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                closeOnClickModal: false,
                showClose: false,
            }).then(() => {
                localStorage.clear();
                this.$router.push('/login')
            }).catch(() => {
            });
        }

    }
}
</script>

<style lang="scss" scoped>
.right-container {
    margin-left: 240px;
    min-height: 100vh;
    transition: all .3s;
    overflow: hidden;

    >.top-container {
        >.top-navbar-container {
            background: var(--background);
            border-bottom: 1px solid #e9e9e9;
            height: 50px;
            display: flex;
            vertical-align: top;
            justify-content: space-between;
            color: #5a5e66;

            >.tools-left {
                display: flex;
                vertical-align: top;
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

                >.avatar {
                    padding: 0 10px;
                    position: relative;
                    z-index: 1;

                    >.avatar-tools {
                        overflow: hidden;
                        background: #fff;
                        width: max-content;
                        height: 0;
                        position: absolute;
                        z-index: 100;
                        top: 35px;
                        right: 10px;
                        box-shadow: 0 0 10px 0px #ddd;
                        border-radius: 3px;
                        font-size: 14px;

                        i {
                            font-size: inherit !important;
                        }

                        >.avatar-tool {
                            list-style: none;
                            padding: 8px 10px;
                        }

                        >.avatar-tool:hover {
                            background: #ecf5ff;
                            color: #409eff;
                        }

                        >.avatar-tool:nth-of-type(1):hover {
                            border-radius: 3px 3px 0 0;
                        }

                        >.avatar-tool:nth-last-child(1):hover {
                            border-radius: 0 0 3px 3px;
                        }

                        >.avatar-tools_tri {
                            border: 8px solid;
                            color: #fff;
                            background: #fff;
                            position: absolute;
                            top: -8px;
                            left: 78%;
                            z-index: -1;
                            transform: rotate(45deg);
                        }
                    }
                }

                >.avatar:hover {
                    >.avatar-tools {
                        height: auto;
                    }
                }
            }

            .hover:hover {
                background: #f7f6f6;
            }
        }

        >.routeLabel_container {
            background: var(--page_background);
        }
    }

    >.appPage-container {
        min-height: calc(100vh - 85px);
        padding: 10px;
    }
}
</style>