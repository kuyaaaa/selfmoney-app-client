<template>
  <el-row>
    <el-col :span="10" class="title">
      <span>💰 个人账本</span>
    </el-col>
    <el-col :span="6" :offset="8" class="user">
      <el-dropdown @command="setDialogInfo">
        <el-avatar :src="user.avatar"></el-avatar>
        <!-- 下拉列表 -->
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="info">
            <i class="el-icon-user"></i>
            {{this.user.name}}
          </el-dropdown-item>
          <el-dropdown-item divided id="exit" command="exit">
            <i class="el-icon-circle-close"></i> 注 销
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    setDialogInfo(cmdItem) {
      switch (cmdItem) {
        case "info":
          this.showInfoList();
          break;
        case "exit":
          this.exit();
          break;
      }
    },
    showInfoList() {
      this.$router.push("/user");
    },
    exit() {
      this.$confirm("确定要注销账号吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      }).then(() => {
        // 清除token
        localStorage.removeItem("smToken");
        // 设置vuex store
        this.$store.dispatch("clearCurrentState");
        // 跳转
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style scoped>
.el-row,
.el-col,
.el-dropdown {
  height: 100%;
}
.title {
  line-height: 60px;
  color: #fff;
  font-size: 24px;
}
.user {
  text-align: right;
}
.el-avatar {
  margin-top: 10px;
}
.el-dropdown-menu__item {
  line-height: 28px;
  text-align: center;
}
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: transparent;
}
#exit:hover {
  color: #f56c6c;
}
</style>