<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <Nav></Nav>
      </el-aside>
      <el-main style="padding: 0">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Nav from "../components/index/Nav";
import Header from "../components/index/Header";

export default {
  components: {
    Nav,
    Header
  }
};
</script>

<style scoped>
.el-header {
  background-color: #333;
}
.el-aside {
  height: 100%;
  background-color: #888;
  border: 0;
}
.el-main {
  height: 100%;
  background-color: #e9eef3;
}
.el-container {
  height: 100%;
}
</style>