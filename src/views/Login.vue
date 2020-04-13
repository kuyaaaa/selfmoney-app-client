<template>
  <div class="login">
    <!-- 文本 -->
    <div class="text">
      <p class="title">个人账本</p>
      <p class="explain">基于 vue + node + express + echarts 开发的个人账本系统</p>
    </div>
    <!-- 注册表单 -->
    <div class="form_container">
      <p class="formtitle">
        <i class="el-icon-user"></i> 用户登录
      </p>
      <el-form
        :model="loginUser"
        status-icon
        :rules="loginRules"
        ref="loginForm"
        label-width="100px"
        class="loginform"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <div>
          <p class="register">
            还没有账号？现在
            <router-link to="/register">注册</router-link>
          </p>
        </div>
        <el-form-item>
          <el-button type="info" @click="submitForm('loginForm')">
            登录
            <i class="el-icon-thumb el-icon--right"></i>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value !== this.loginUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      loginUser: {
        email: "",
        password: ""
      },
      loginRules: {
        email: [
          { required: true, message: "邮箱不能为空！", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确！", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空！", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "密码长度在6-12个字符之间！",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http.post("/api/users/login", this.loginUser).then(res => {
            // console.log(res)
            // token
            const { token } = res.data;
            // 存储到ls
            localStorage.setItem("smToken", token);

            // 解析token
            const decoded = jwt_decode(token);
            // console.log(decoded)
            // token存储到vuex中
            this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
            this.$store.dispatch("setUser", decoded);

            this.$router.push("/index");
          });
        }
      });
    },

    isEmpty(val) {
      return (
        val === undefined ||
        val === null ||
        (typeof val === "object" && Object.keys(val).length === 0) ||
        (typeof val === "string" && val.trim().length === 0)
      );
    }
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background-image: url("../assets/login-bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
.login::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.4);
}
.login .text {
  color: #fff;
  position: absolute;
  top: 150px;
  left: 80px;
  z-index: 99;
}
.title {
  font-size: 68px;
}
.explain {
  font-size: 22px;
  margin-top: 20px;
  text-decoration: underline;
}
.form_container {
  width: 400px;
  background-color: #fff;
  position: absolute;
  right: 60px;
  top: 80px;
  z-index: 99;
  box-shadow: 20px 20px 5px #444;
  border: #000 5px double;
  border-radius: 5px;
}
.formtitle {
  font-size: 28px;
  text-align: center;
  margin: 40px 0;
}
.loginform {
  width: 350px;
  text-align: center;
}
.el-button {
  width: 100%;
  margin: 20px 0;
  background-color: #444;
  border: none;
}
.el-button:hover {
  background-color: rgb(255, 186, 57);
}
.register {
  text-align: right;
  font-size: 14px;
  margin-bottom: 10px;
}
</style>
