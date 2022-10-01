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
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  color: inherit;
}

i {
  color: #333;
}
</style>
