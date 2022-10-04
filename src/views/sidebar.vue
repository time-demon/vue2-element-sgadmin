<!-- 侧边栏容器 -->
<template>
    <div :class="['sidebar-container',sidebarState == 'fold'?'fold':'']" :style="'width:'+sidebarWidth +'px'">

        <div class="sidebar-top-container">
            <div class="sidebar-top">
                <img class="logo" src="@/assets/img/sgadmin_logo.png" alt="">
                <span>时光管理系统</span>
            </div>
        </div>

        <!-- 最多三级 -->
        <div class="navbar">
            <!-- 第一级 -->
            <div class="navbar-one-container" v-for="item in navData">
                <div :class="['navbar-one','/'+item.path == nowRoute?'nowRoute':''] " @click="navBigPath(item)"
                    :title="item.meta.title">
                    <i :class="item.meta.icon"></i><span>{{item.meta.title}}</span>
                </div>
                <!-- 第二级 -->
                <div class="navbar-two-container" v-for="item2 in item.children" :style="'height:'+item.height">
                    <div :class="['navbar-two','/'+item.path+'/'+item2.path == nowRoute?'nowRoute':'']"
                        @click="navBigPath(item ,item2)">
                        {{item2.meta.title}}
                    </div>
                    <!-- 第三级 -->
                    <div class="navbar-three-container" v-for="item3 in item2.children" :style="'height:'+item2.height">
                        <div :class="['navbar-three','/'+item.path+'/'+item2.path+'/'+item3.path == nowRoute?'nowRoute':'']"
                            @click="navBigPath(item ,item2, item3)">
                            {{item3.meta.title}}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
export default {
    props: {
        sidebarState: '',
    },
    data() {
        return {
            nowRoute: '',//现在所在的路由
            navData: [],// 侧边栏导航数据
            sidebarWidth: Boolean,// 侧边栏的宽度
            navHeight: "auto"
        }
    },
    watch: {

        // 监听侧边栏状态
        sidebarState(newVal, oldVal) {
            this.sidebar(newVal);
        },

        // 监听当前路由
        $route(newVal, oldVal) {
            this.nowRoute = newVal.fullPath;
        }

    },
    mounted() {

        // 获取当前路由
        this.nowRoute = this.$route.fullPath;

        // 获取导航栏路由
        let navData = this.$router.options.routes[0].children[0].children;
        for (let i = 0; i < navData.length; i++) {
            navData[i].height = 0
            if (navData[i].children != undefined) {
                for (let j = 0; j < navData[i].children.length; j++) {
                    navData[i].children[j].height = 0
                }
            }
        } this.navData = navData;

        // 监测视口尺寸
        window.onresize = () => {
            window.innerWidth <= 768 ? this.$parent.sidebarState = 'close' : this.$parent.sidebarState = 'open';
        };

        this.sidebar(this.sidebarState);

    },
    methods: {

        // 侧边栏控制
        sidebar(state) {
            if (state == 'fold') {
                this.sidebarWidth = 55;
            } else if (state == 'open') {
                this.sidebarWidth = 240;
            } else if (state == 'close') {
                this.sidebarWidth = 0;
            }
        },

        // 导航多级展开
        navBigPath(item, item2, item3) {
            if (!item2 && !item3) {// 如果是一级导航
                if (item.children == undefined || item.children.length == 0) {
                    this.$router.push('/' + item.path);

                    let addrouteLabelData = JSON.parse(JSON.stringify(item));
                    addrouteLabelData.path = '/' + item.path;
                    this.addrouteLabel(addrouteLabelData);
                } else { item.height = item.height == 0 ? this.navHeight : 0 }
            } else if (!item3) {// 如果是二级导航
                item2.children == undefined || item2.children.length == 0 ? this.$router.push('/' + item.path + '/' + item2.path) : item2.height = item2.height == 0 ? this.navHeight : 0;

                let addrouteLabelData = JSON.parse(JSON.stringify(item2));
                addrouteLabelData.path = '/' + item.path + '/' + item2.path;
                this.addrouteLabel(addrouteLabelData);

            } else {// 三级导航
                this.$router.push('/' + item.path + '/' + item2.path + '/' + item3.path);

                let addrouteLabelData = JSON.parse(JSON.stringify(item2));
                addrouteLabelData.path = '/' + item.path + '/' + item2.path + '/' + item3.path;
                this.addrouteLabel(addrouteLabelData);

            };
        },

        // 添加到路由标签
        addrouteLabel(addrouteLabelData) {
            if (this.$store.state.routeLabel.filter(item => item.path == addrouteLabelData.path).length == 0) {
                this.$store.state.routeLabel.push({
                    title: addrouteLabelData.meta.title,
                    path: addrouteLabelData.path,
                    show: true
                });
            };
        },

    },
}
</script>

<style lang="scss" scoped>
.sidebar-container {
    background: #304156;
    width: 240px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: all .3s;

    >.sidebar-top-container {
        color: #fff;
        font-size: 15px;
        height: 50px;
        letter-spacing: 1px;
        font-weight: bold;
        padding: 0 15px;

        >.sidebar-top {
            text-align: center;
            height: 50px;
            line-height: 50px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: flex;
            align-items: center;
            justify-content: center;

            >.logo {
                width: auto;
                height: 35px;
                padding-right: 5px;
                vertical-align: top;
            }

            >span {
                display: inline-block;
                overflow: hidden;
                transition: all .3s;
            }
        }
    }

    >.navbar {
        flex: 1;
        overflow: hidden;

        >.navbar-one-container {
            min-height: 55px;

            >.navbar-one:hover {
                background: rgba(0, 0, 0, .06);
                color: #fff;
            }

            >.navbar-one {
                height: 50px;
                line-height: 50px;
                color: #ddd;
                font-size: 14px;
                cursor: pointer;
                padding: 0 25px;
                overflow: hidden;

                i {
                    padding-right: 10px;
                    color: inherit;
                }
            }

            >.navbar-two-container {
                overflow: hidden;

                >.navbar-two {
                    height: 50px;
                    line-height: 50px;
                    color: #ddd;
                    background: #1f2d3d;
                    font-size: 14px;
                    cursor: pointer;
                    padding: 0 25px;
                }

                >.navbar-two:hover {
                    background: #001528;
                }

                >.navbar-three-container {
                    overflow: hidden;

                    >.navbar-three {
                        height: 50px;
                        line-height: 50px;
                        color: #ddd;
                        background: #1f2d3d;
                        font-size: 14px;
                        cursor: pointer;
                        padding: 0 25px;
                    }

                    >.navbar-three:hover {
                        background: orange;
                    }
                }
            }
        }

    }
}

.fold {
    >.sidebar-top-container {
        padding: 0;
        text-align: center;

        >.sidebar-top {
            >.logo {
                padding: 0;
            }

            >span {
                width: 0;
            }
        }
    }

    >.navbar {
        >.navbar-one-container {

            >.navbar-one {
                padding: 0;
                text-align: center;

                >i {
                    padding: 0;
                }

                >span {
                    display: none;
                }
            }
        }
    }
}

.nowRoute {
    color: #696 !important;
}
</style>