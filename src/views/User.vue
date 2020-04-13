<template>
  <div class="usercontainer">
    <div class="userhead">
      <el-avatar shape="square" :size="100" :src="user.avatar"></el-avatar>
      <span class="username">{{user.name}}</span>
      <el-button type="danger" class="exitbtn" @click="exit">
        <i class="el-icon-switch-button"></i>注 销
      </el-button>
    </div>
    <el-divider></el-divider>
    <div class="usermain">
      <p>
        <i class="el-icon-message"></i>
        {{user.email}}
      </p>
      <el-divider></el-divider>
      <i class="el-icon-edit"></i>
      <el-link type="primary" @click="changeUserName()">用户名修改</el-link>
      <el-divider></el-divider>
      <i class="el-icon-key"></i>
      <el-link type="primary" @click="changeUserPwd()" v-if="!this.isAdmin">密码修改</el-link>
      <el-divider></el-divider>
    </div>
    <!-- 弹窗 -->
    <DialogUserName :dialog="dialogUserName"></DialogUserName>
    <DialogUserPwd :dialog="dialogUserPwd"></DialogUserPwd>
  </div>
</template>

<script>
import DialogUserName from "../components/user/DialogUserName";
import DialogUserPwd from "../components/user/DialogUserPwd";

export default {
  data() {
    return {
      dialogUserName: {
        show: false
      },
      dialogUserPwd: {
        show: false
      },
      isAdmin: false
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  components: {
    DialogUserName,
    DialogUserPwd
  },
  methods: {
    exit() {
      // 清除token
      localStorage.removeItem("smToken");
      // 设置vuex store
      this.$store.dispatch("clearCurrentState");
      // 跳转
      this.$router.push("/login");
    },
    changeUserName() {
      this.dialogUserName.show = true;
    },
    changeUserPwd() {
      this.dialogUserPwd.show = true;
    },
    checkAdmin() {
      if (this.user.email == "qq1034816916@163.com") {
        this.isAdmin = true;
      }
    }
  },
  created() {
    this.checkAdmin();
  }
};
</script>

<style scoped>
.usercontainer {
  padding: 40px 80px;
}
.el-divider {
  background-color: #999;
}
.username {
  margin-left: 20px;
  font-size: 42px;
  font-weight: bold;
}
.userhead {
  display: flex;
  align-items: flex-end;
}
.exitbtn {
  margin-left: auto;
}
.usermain p {
  font-size: 16px;
  margin: 15px 0;
}
i {
  margin-right: 10px;
}
</style>