<!-- 登录 -->
<template>
    <div :class="['loginBox',innerWidth<=768?'mobile':'',themeState?'dark':'light']">

        <div class="theme">
            <el-switch style="display: block" v-model="themeState" active-color="#333" inactive-color="#bbb"
                active-text="暗" inactive-text="亮">
            </el-switch>
        </div>

        <div class="login" v-loading="loading" :style="innerWidth>boxWidth?'width:'+boxWidth +'px':''">
            <div class="title">
                {{$store.state.siteInfo.title}}
            </div>

            <div class="formBox">
                <el-form ref="form" :model="form" label-width="80px">
                    <div class="input">
                        <el-input size="small" v-model="form.account" clearable prefix-icon="el-icon-user-solid"
                            placeholder="账号..." @input="inputDetection"></el-input>
                        <div class="tip"><i :class="accountTip==''?'':'el-icon-warning-outline'"></i> {{accountTip}}
                        </div>
                    </div>
                    <div class="input">
                        <el-input size="small" v-model="form.password" clearable prefix-icon="el-icon-lock"
                            show-password placeholder="密码..." @input="inputDetection">
                        </el-input>
                        <div class="tip"><i :class="passwordTip==''?'':'el-icon-warning-outline'"></i> {{passwordTip}}
                        </div>
                    </div>
                    <div class="input">
                        <el-checkbox v-model="remember">记住密码</el-checkbox>
                    </div>
                    <div class="input">
                        <el-button type="primary" style="width: 100%;letter-spacing: .5px;" @click="submit"
                            :loading="loading">{{loading?'登录中':'立即登录'}}
                        </el-button>
                    </div>
                </el-form>
            </div>

        </div>

        <div class="footer">
            Copyright © 2018 ~ {{new Date().getFullYear()}} {{host}} All Rights Reserved.
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            host: '',// 域名
            theme: '',//主题
            themeState: false,
            boxWidth: 400,
            innerWidth: 0,
            form: {
                account: '',
                password: '',
            },
            accountTip: '',
            passwordTip: '',
            remember: false,// 是否记住密码
        }
    },
    mounted() {

        // 监听视口尺寸
        this.innerWidth = window.innerWidth;
        window.onresize = () => {
            this.innerWidth = window.innerWidth;
        };

        // 获取当前域名
        this.host = window.location.host;

        // 默认主题，false为亮色，true为暗黑色
        this.themeState = true;

        // 检测是否有保存的账号和密码
        if (localStorage.getItem('remeber') != null) {
            this.form = {
                account: JSON.parse(localStorage.getItem('remeber')).account,
                password: window.atob(JSON.parse(localStorage.getItem('remeber')).password),
            };
            this.remember = true;
        };

    },
    methods: {

        // 请求验证(登录注册网络请求写在这)
        reqVeri() {
            let { form } = this;
            this.loading = true;
            this.$network({
                url: `/api/adminLogin?account=${form.account}&password=${form.password}`,
            }).then((res) => {
                if (res.code == 200) {// 登录成功
                    localStorage.setItem("token", res.token);
                    let userInfo = res.data;
                    userInfo.token = res.token;
                    localStorage.setItem("userInfo", JSON.stringify(userInfo));// 用户信息，包括token
                    localStorage.setItem("routesRoles", JSON.stringify(res.routesRoles));// 路由权限
                    this.$message({
                        message: '登录成功，正在跳转...',
                        type: 'success',
                        duration: 1000
                    });
                    setTimeout(() => {
                        this.loading = false;
                        this.$router.push('/');
                    }, 300)
                    return
                } else if (res.code == -1) {// 账号不存在
                    this.$message({
                        message: '账号不存在，请重新输入...',
                        type: 'error',
                        duration: 1000
                    });
                    this.form.account = '';
                    this.form.password = '';
                } else if (res.code == -2) {// 密码错误
                    this.$message({
                        message: '密码错误，请重新输入...',
                        type: 'error',
                        duration: 1000
                    });
                    this.form.password = '';
                } else {
                    this.$message({
                        message: '未知原因...',
                        type: 'error',
                        duration: 1000
                    });
                }
                setTimeout(() => {
                    this.loading = false;
                }, 300)
            })
        },

        // 提交按钮
        submit() {// 提交
            let { form } = this;
            if (this.conditionDetection()) {
                // 检测是否记住密码
                if (this.remember) {
                    localStorage.setItem('remeber', JSON.stringify({ account: form.account, password: window.btoa(form.password) }))
                } else {
                    localStorage.removeItem('remeber');
                }
                this.reqVeri();
            }
        },
        // 输入检测
        inputDetection() {
            this.conditionDetection();
        },
        // 条件检测
        conditionDetection() {
            let state = false;
            let { form } = this;
            if (form.account == '' && form.password == '') {
                this.accountTip = '账号为空';
                this.passwordTip = '密码为空';
            } else if (form.account == '') {
                this.accountTip = '账号为空';
                this.passwordTip = '';
            } else if (form.password == '') {
                this.accountTip = '';
                this.passwordTip = '密码为空';
            } else {
                this.accountTip = '';
                this.passwordTip = '';
                state = true;
            }
            if (/[\u4E00-\u9FA5 ]/g.test(form.account)) {
                this.accountTip = '账号不能有中文和空格';
                form.account = form.account.replace(/[\u4E00-\u9FA5 ]/g, '');
                setTimeout(() => {
                    this.accountTip = '';
                }, 1000);
                state = false;
            }
            return state
        },

    },
}
</script>

<style lang="scss" scoped>
.loginBox {
    width: 100vw;
    height: auto;
    min-height: 100vh;
    position: relative;
    padding: 15px;
    background-size: 100%, 100%;

    >.theme {
        position: absolute;
        right: 20px;
    }

    >.login {
        background: #fff;
        min-height: 300px;
        position: absolute;
        transform: translate(-50%, -50%);
        left: 50%;
        top: 50%;
        border-radius: 6px;
        padding: 25px;
        overflow: hidden;

        >.title {
            font-size: 18px;
            text-align: center;
            font-weight: 300;
            letter-spacing: 1px;
            margin: 0 0 30px 0;
        }

        >.formBox {
            .input {
                margin: 0 0 25px 0;
                position: relative;

                input {
                    height: 38px;
                }

                .tip {
                    margin-top: 2px;
                    font-size: 12px;
                    position: absolute;
                    color: red;
                }
            }

            .input:nth-last-of-type(1) {
                margin: 0;
            }
        }
    }

    >.footer {
        color: #aaa;
        position: absolute;
        bottom: 10px;
        font-size: 12px;
        text-align: center;
        left: 50%;
        transform: translateX(-50%);
        width: max-content;
        max-width: 100vw;
    }
}

.light {
    background: linear-gradient(to top, #F4F4F4 0%, #DFDEDC 100%);
}

.dark {
    background: linear-gradient(-90deg, #7B7F82 2%, #303136 100%),
        radial-gradient(50% 116%, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 100%),
        linear-gradient(-59deg, rgba(255, 255, 255, 0.5) 7%, rgba(87, 87, 87, 0.5) 68%, rgba(85, 85, 85, 0.5) 76%, rgba(0, 0, 0, 0.5) 100%);
}

.mobile {
    .login {
        width: calc(100vw - 15px);
    }
}
</style>