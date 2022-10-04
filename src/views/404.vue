<template>
    <div class="page_container">
        <div class="page404_container mobileBlock">
            <div class="left_container">
                <img src="@/assets/img/404.png" alt="">
            </div>
            <div class="right_container">
                <h1>404错误</h1>
                <h2>找不到网页！</h2>
                <p>
                    对不起，您正在寻找的页面不存在。尝试检查URL的错误，然后按浏览器上的刷新按钮或尝试在我们的应用程序中找到其他内容。
                </p>
                <el-button type="primary" round @click="$router.push('./')" icon="el-icon-s-home">返回首页</el-button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.page_container {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;

    >.page404_container {
        display: flex;
        vertical-align: top;
        justify-content: center;

        >div {
            max-width: 100vw;

            >img {
                max-width: 100vw;
            }
        }

        >.left_container {
            >img {
                max-width: 400px;
                height: auto;
            }
        }

        >.right_container {
            max-width: 300px;
        }
    }
}
</style>