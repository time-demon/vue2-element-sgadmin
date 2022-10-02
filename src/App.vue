<!-- 公共模板 -->
<template>
  <router-view id="app" />
</template>

<style lang="scss">
// 标签公共样式自定义
#app {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  color: #333;
  overflow: hidden;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  color: inherit;
}

p {
  font-size: 13px;
}

// .el-card__header {
//   padding: 10px 14px;
//   font-size: 14px;
// }

.el-message {
  max-width: 95vw;
  min-width: 0;
  width: max-content;
}

.el-message-box {
  max-width: 95vw;
}
</style>
