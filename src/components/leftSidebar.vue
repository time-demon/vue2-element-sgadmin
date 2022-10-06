<!-- 侧边栏容器 -->
<template>
    <div :class="['sidebar-container',sidebarState == 'fold'?'fold':'']" :style="'width:'+sidebarWidth +'px'">

        <div class="sidebar-top-container">
            <div class="sidebar-top">
                <img class="logo" src="@/assets/img/logo.png" alt="" loading="lazy">
                <span>{{$store.state.siteInfo.title}}</span>
            </div>
        </div>

        <!-- 最多三级，别再多了 φ(*￣0￣) -->
        <div class="navbar">
            <div class="navbar-one-container" v-for="item in navData" v-if="item.hidden !=true">
                <div :class="['navbar-one','/'+item.path == nowRoute?'nowRoute':''] " @click="navBigPath(item)"
                    :title="item.meta.title">
                    <p><i :class="item.meta.icon"></i><span>{{item.meta.title}}</span></p>
                    <p class="el-icon-arrow-down" v-show="item.children != undefined"></p>
                </div>
                <div class="navbar_two_container" v-for="itemtwo in item.children" :style="`height:${item.height}`">
                    <div :class="['navbar-two','/'+item.path+'/'+itemtwo.path == nowRoute?'nowRoute':'']"
                        @click="navBigPath(item ,itemtwo)">
                        <p><i :class="itemtwo.meta.icon"></i><span>{{itemtwo.meta.title}}</span></p>
                        <p class="el-icon-arrow-down" v-show="itemtwo.children != undefined"></p>
                    </div>
                    <div class="navbar-three-container" v-for="itemThree in itemtwo.children"
                        :style="'height:'+itemtwo.height">
                        <div :class="['navbar-three','/'+item.path+'/'+itemtwo.path+'/'+itemThree.path == nowRoute?'nowRoute':'']"
                            @click="navBigPath(item ,itemtwo, itemThree)">
                            <p><i :class="itemThree.meta.icon"></i><span>{{itemThree.meta.title}}</span></p>
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
            isCollapse: false,
            nowRoute: '',//现在所在的路由
            navData: [],// 侧边栏菜单数据
            sidebarWidth: Boolean,// 侧边栏的宽度
            navHeight: "auto",// 菜单高度
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

        // 获取菜单栏路由
        let navData = this.$router.options.routes[0].children;// 所有路由信息

        // console.log('本地路由信息', navData);
        let thisUserRoles = JSON.parse(localStorage.getItem('roles'));// 获取当前用户的权限配置
        // console.log('后端获取的权限路由', thisUserRoles);
        let thisPageName = this.$route.name;// 当前页面name
        // console.log('当前页面name：', thisPageName);
        let rolesRoutes = this.$store.state.rolesRoutes;
        // console.log('权限路由', rolesRoutes);

        // 第一级验证
        for (let i = 0; i < navData.length; i++) {
            for (let j = 0; j < rolesRoutes.length; j++) {
                // 若 属于权限路由 且 该用户无该页面权限
                if (navData[i].name == rolesRoutes[j].name && thisUserRoles.routes.filter(item => item == navData[i].name).length == 0) {
                    navData[i].hidden = true;
                };
            };
        };

        // 第二级验证
        for (let i = 0; i < navData.length; i++) {
            // console.log(navData[i].children);
            // for (let j = 0; j < rolesRoutes.length; j++) {
            //     // 若 属于权限路由 且 
            //     if (navData[i].name == rolesRoutes[j].name && thisUserRoles.routes.filter(item => item == navData[i].name).length == 0) {
            //         console.log(99, navData[i].name, thisUserRoles.routes.filter(item => item == navData[i].name).length);
            //         navData[i].hidden = true;
            //     };
            // };
        };

        this.menuReload(); // 导航菜单重载
        console.log(this.navData);

        // 监测视口尺寸
        window.onresize = () => {
            window.innerWidth <= 768 ? this.$parent.sidebarState = 'close' : this.$parent.sidebarState = 'open';
        }; this.sidebar(this.sidebarState);// 调用侧边栏宽度控制

    },
    methods: {

        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },

        // 导航菜单重载
        menuReload() {
            let cpoyNavData = JSON.parse(JSON.stringify(this.$router.options.routes[0].children));
            // 循环为有子菜单的第一级菜单的子菜单和第二级菜单的子菜单设置初始高为0，用于子菜单展开
            for (let i = 0; i < cpoyNavData.length; i++) {
                cpoyNavData[i].height = 0;// 设置一级菜单的子菜单的高
                // 判断第一级菜单是否有子菜单
                if (cpoyNavData[i].children != undefined && cpoyNavData[i].children.length != 0) {
                    for (let j = 0; j < cpoyNavData[i].children.length; j++) {
                        cpoyNavData[i].children[j].height = 0;// 设置二级菜单的子菜单的高
                    };
                };
            };
            this.navData = JSON.parse(JSON.stringify(cpoyNavData));
        },

        // 侧边栏宽度控制
        sidebar(state) {
            if (state == 'fold') {
                this.sidebarWidth = 55;
            } else if (state == 'open') {
                this.sidebarWidth = 240;
            } else if (state == 'close') {
                this.sidebarWidth = 0;
            }
        },

        // 菜单三级访问规则（即：展开 or 访问）
        navBigPath(item, itemtwo, itemThree) {
            if (!itemtwo && !itemThree) {// 如果是第一级菜单
                // 判断该菜单是否有子菜单
                if (item.children == undefined || item.children.length == 0) {// 若无，则直接访问
                    item.openState = true;
                    this.$router.push('/' + item.path);
                    let addrouteLabelData = JSON.parse(JSON.stringify(item));
                    addrouteLabelData.path = '/' + item.path;
                    this.addrouteLabel(addrouteLabelData);
                } else {
                    item.height = item.height == 0 ? this.navHeight : 0
                }
            } else if (!itemThree) {// 如果是第二级菜单
                // 判断该菜单是否有子菜单
                if (itemtwo.children == undefined || itemtwo.children.length == 0) {// 若无，则直接访问
                    itemtwo.openState = true;
                    this.$router.push('/' + item.path + '/' + itemtwo.path);
                    let addrouteLabelData = JSON.parse(JSON.stringify(itemtwo));
                    addrouteLabelData.path = '/' + item.path + '/' + itemtwo.path;
                    this.addrouteLabel(addrouteLabelData);
                } else {
                    itemtwo.height = itemtwo.height == 0 ? this.navHeight : 0;
                }
            } else {// 如果是第三级菜单
                itemThree.openState = true;
                this.$router.push('/' + item.path + '/' + itemtwo.path + '/' + itemThree.path);
                let addrouteLabelData = JSON.parse(JSON.stringify(itemtwo));
                addrouteLabelData.path = '/' + item.path + '/' + itemtwo.path + '/' + itemThree.path;
                this.addrouteLabel(addrouteLabelData);
            };
            console.log(this.navData);
        },

        // 添加到路由标签
        addrouteLabel(addrouteLabelData) {
            // 判断当前页面是否是常驻标签页面，可在routeLabel.vue里配置
            if (this.$store.state.routeLabel.filter(item => item.path == addrouteLabelData.path).length == 0) {// 如果不是
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
        width: 240px;

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
        width: 240px;

        >.navbar-one-container {
            min-height: 55px;

            i {
                padding-right: 10px;
                color: inherit;
                width: 26px;
                display: inline-block;
            }

            >.navbar-one:hover {
                background: rgba(0, 0, 0, .06);
                color: #fff;
            }

            >.navbar-one {
                display: flex;
                vertical-align: top;
                justify-content: space-between;
                align-items: center;
                height: 50px;
                line-height: 50px;
                color: #ddd;
                font-size: 14px;
                cursor: pointer;
                padding: 0 25px;
                overflow: hidden;
            }

            >.navbar_two_container {
                overflow: hidden;

                >.navbar-two {
                    display: flex;
                    vertical-align: top;
                    justify-content: space-between;
                    align-items: center;
                    height: 50px;
                    line-height: 50px;
                    color: #ddd;
                    background: #1f2d3d;
                    font-size: 14px;
                    cursor: pointer;
                    padding: 0 35px;
                }

                >.navbar-two:hover {
                    background: #001528;
                }

                >.navbar-three-container {
                    overflow: hidden;

                    >.navbar-three {
                        display: flex;
                        vertical-align: top;
                        justify-content: space-between;
                        align-items: center;
                        height: 50px;
                        line-height: 50px;
                        color: #ddd;
                        background: #1f2d3d;
                        font-size: 14px;
                        cursor: pointer;
                        padding: 0 45px;
                    }

                    >.navbar-three:hover {
                        background: orange;
                    }
                }
            }
        }

    }
}

.flodHover_container {
    background: orange;
    position: absolute;
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
                display: block;

                >p {
                    >i {
                        padding: 0;
                    }

                    >span {
                        display: none;
                    }
                }

                >.el-icon-arrow-down {
                    display: none;
                }
            }

            >.navbar_two_container {
                display: none;
            }
        }
    }
}

.nowRoute {
    color: #696 !important;
}
</style>