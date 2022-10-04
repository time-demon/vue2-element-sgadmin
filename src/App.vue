<!-- 公共模板 -->
<template>
  <div>
    <lrToolsVue />
    <router-view id="app" />
  </div>
</template>

<script>
import lrToolsVue from './components/default/lrTools.vue';// 右小角悬浮工具
export default {
  components: { lrToolsVue },
  mounted() {
  }
}
</script>

<style lang="scss">
#app {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  color: #333;
  overflow: hidden;
}

* {
  border: 0;
  padding: 0;
  box-sizing: border-box;
}

// 标签公共样式自定义
a {
  color: inherit;
  font-size: inherit;
}

p {
  font-size: 13px;
  line-height: 18px;
}

// 标签公共样式自定义

// elementUI 样式重置

.el-link {
  font-size: inherit;
}

.el-card {
  height: max-content;
  margin-bottom: 10px;
}

.el-card__header {
  padding: 10px 14px;
  font-size: 14px;
}

.el-message {
  max-width: 95vw;
  min-width: 0;
  width: max-content;
}

.el-message-box {
  max-width: 95vw;
}

.el-collapse-item__header {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  display: block;

  >.el-collapse-item__arrow {
    position: absolute;
    top: 11px;
    right: 0px;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    border-radius: 50%;
  }

  >.el-collapse-item__arrow:hover {
    background: #eee;
  }
}


// elementUI 样式重置

// pc端class类
@media screen and (min-width: 768px) {
  .pcHidden {
    // pc端隐藏
    display: none !important;
  }
}

// 移动端class类
@media screen and (max-width: 768px) {
  .mobileBlock {
    // 移动端
    width: 100% !important;
    display: block !important;
  }

  .mobileHidden {
    // 移动端隐藏
    display: none !important;
  }
}

/*chrome--------------------------------------------start*/
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgb(255, 255, 255);
  border-radius: 8px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(201, 201, 202);
  border-radius: 8px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(162, 162, 163);
}

.el-menu::-webkit-scrollbar,
.el-table__body-wrapper::-webkit-scrollbar {
  display: none;
}

.el-menu:hover::-webkit-scrollbar,
.el-table__body-wrapper:hover::-webkit-scrollbar {
  display: block;
}

/*chrome--------------------------------------------end*/
/*IE--------------------------------------------start*/
* {
  /*三角箭头的颜色*/
  scrollbar-arrow-color: #c0c4cc;
  /*滚动条滑块按钮的颜色*/
  scrollbar-face-color: #A2A2A3;
  /*滚动条整体颜色*/
  scrollbar-highlight-color: #A2A2A3;
  /*滚动条阴影*/
  scrollbar-shadow-color: #A2A2A3;
  /*滚动条轨道颜色*/
  scrollbar-track-color: #f4f4f5;
  /*滚动条3d亮色阴影边框的外观颜色——左边和上边的阴影色*/
  scrollbar-3dlight-color: #A2A2A3;
  /*滚动条3d暗色阴影边框的外观颜色——右边和下边的阴影色*/
  scrollbar-darkshadow-color: #A2A2A3;
  /*滚动条基准颜色*/
  scrollbar-base-color: #f4f4f5;
}

.el-table__body-wrapper,
.el-menu {
  /*IE下隐藏*/
  -ms-overflow-style: none;
}

.el-table__body-wrapper:hover,
.el-menu:hover {
  /*IE下显示*/
  -ms-overflow-style: auto;
}

/*IE--------------------------------------------end*/
</style>
