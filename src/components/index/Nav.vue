<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <template v-for="item in NAVitems">
      <el-submenu v-if="item.children" :index="item.path" :key="item.path">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item-group v-for="citem in item.children" :key="citem.path">
          <el-menu-item :index="'/' + citem.path" :key="citem.path">
            <i :class="citem.icon"></i>
            <span slot="title">{{citem.name}}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item v-else :index="'/' + item.path" :key="item.path">
        <i :class="item.icon"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      NAVitems: [
        {
          icon: "el-icon-s-home",
          name: "主页",
          path: "index"
        },
        {
          icon: "el-icon-notebook-2",
          name: "账本表格",
          path: "moneyview"
        },
        {
          icon: "el-icon-s-platform",
          name: "数据中心",
          path: "data",
          children: [
            {
              icon: "el-icon-s-data",
              name: "数据月报",
              path: "mreport"
            },
            {
              icon: "el-icon-s-marketing",
              name: "年度数据",
              path: "yreport"
            }
          ]
        },
        {
          icon: "el-icon-s-custom",
          name: "用户信息",
          path: "user"
        }
      ]
    };
  }
};
</script>

<style scoped>
.el-menu {
  border: 0;
}
</style>