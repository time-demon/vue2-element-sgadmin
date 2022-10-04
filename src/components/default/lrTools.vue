<!-- 右下角工具 -->
<template>
    <div class="lrTools_container">
        <el-tooltip class="item" effect="dark" :content="theme=='theme_white'?'切换到暗黑模式':'切换到明亮模式'" placement="left"
            transition="el-zoom-in-center">
            <div class="tool" @click="themeSwitch"><i
                    :class="[theme == 'theme_white'?'sg sg-yueliang':'sg sg-taiyang']"></i>
            </div>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" :content="'主题设置'" placement="left" transition="el-zoom-in-center">
            <div class="tool" @click="themeSet = true"><i class="el-icon-setting"></i></div>
        </el-tooltip>
        <div class="tool">3</div>

        <!-- 主题设置 -->
        <themeSetVue :themeSet="themeSet" @themeSetClose="themeSetClose" />
    </div>
</template>

<script>
import themeSetVue from '@/components/default/themeSet.vue'
export default {
    components: { themeSetVue },
    data() {
        return {
            theme: '',
            themeSet: false,// 主题设置弹窗
        }
    },
    mounted() {
        // 判断主题theme
        if (localStorage.getItem('theme') == null) {// 如果存储里没有主题
            this.theme = 'theme_white';
            document.body.setAttribute('class', this.theme);
            localStorage.setItem('theme', this.theme);
        } else {// 如果存有主题
            this.theme = localStorage.getItem('theme');
            document.body.setAttribute('class', this.theme);
        };
    },
    methods: {

        // 侧边布局设置弹窗关闭
        themeSetClose(done) {
            this.themeSet = false;
        },

        // 主题切换
        themeSwitch() {
            if (localStorage.getItem('theme') == 'theme_white') {
                this.theme = 'theme_dark';
                localStorage.setItem('theme', this.theme);
                document.body.setAttribute('class', this.theme);
            } else {
                this.theme = 'theme_white';
                localStorage.setItem('theme', this.theme);
                document.body.setAttribute('class', this.theme);
            }
        },
    },
}
</script>

<style lang="scss">
.lrTools_container {
    font-size: 12px;
    position: fixed;
    z-index: 9999;
    right: 0;
    bottom: 100px;
    border-radius: 3px 0 0 3px;
    height: auto;
    box-shadow: 0 2px 10px 0 #aaa;
    overflow: hidden;

    .tool {
        width: 32px;
        aspect-ratio: 1;
        padding: 5px;
        border-bottom: 1px solid #aaa;
        display: flex;
        vertical-align: top;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border-radius: 0;
        background: var((--background));

        >i {
            font-size: 14px;
        }
    }

    .tool:hover {
        background: var(--hover_background);
        color: var(--hover_color);
    }

    >.tool:nth-of-type(1) {
        border-radius: 3px 0 0 0;
    }

    >.tool:nth-last-child(1) {
        border-radius: 0 0 0 3px;
    }
}
</style>