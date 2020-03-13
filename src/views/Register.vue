<template>
  <div class="register">
    <!-- 文本 -->
    <div class="text">
      <p class="title">个人账本</p>
      <p class="explain">基于 vue + node + express + echarts 开发的个人账本系统</p>
    </div>
    <!-- 注册表单 -->
    <div class="form_container">
      <p class="formtitle">用户注册</p>
      <el-form :model="registerUser" status-icon :rules="registerRules" ref="registerForm" label-width="100px" class="registerform">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input type="password" v-model="registerUser.checkPassword" placeholder="请确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('registerForm')">注册 <i class="el-icon-thumb el-icon--right"></i></el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      registerUser: {
        name: '',
        email: '',
        password: '',
        checkPassword: ''
      },
      registerRules: {
        name: [
          {required: true, message: '用户名不能为空！', trigger: 'blur'},
          {min: 2, max: 8, message: '用户名长度在2-8个字符之间！', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '邮箱不能为空！', trigger: 'blur'},
          {type: 'email', message: '邮箱格式不正确！', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能为空！', trigger: 'blur'},
          {min: 6, max: 12, message: '密码长度在6-12个字符之间！', trigger: 'blur'}
        ],
        checkPassword: [
          {required: true, message: '确认密码不能为空！', trigger: 'blur'},
          {min: 6, max: 12, message: '密码长度在6-12个字符之间！', trigger: 'blur'},
          {validator: validatePass, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.register{
  width: 100%;
  height: 100%;
  background-image: url('../assets/login-bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
.register::after{
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.4);
}
.register .text{
  color: #fff;
  position: absolute;
  top: 150px;
  left: 80px;
  z-index: 99;
}
.title{
  font-size: 68px;
}
.explain{
  font-size: 22px;
  margin-top: 20px;
  text-decoration: underline;
}
.form_container{
  height: 450px;
  width: 400px;
  background-color: #fff;
  position: absolute;
  right: 60px;
  top: 80px;
  z-index: 99;
  box-shadow: 20px 20px 5px #444;
}
.formtitle{
  font-size: 28px;
  text-align: center;
  margin: 40px 0;
}
.registerform{
  width: 350px;
  text-align: center;
}
.el-button{
  width: 200px;
  margin-top: 20px;
  background-color: #444;
}
</style>
