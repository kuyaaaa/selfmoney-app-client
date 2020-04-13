<template>
  <el-dialog
    title="密码修改"
    :visible.sync="dialog.show"
    width="500px"
    @close="resetForm"
    @open="resetForm"
  >
    <div class="form">
      <el-form
        ref="form"
        :model="formData"
        :rules="form_rules"
        label-width="100px"
        style="margin: 10px; width: auto;"
      >
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="formData.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input type="password" v-model="formData.checkPassword" placeholder="请确认密码"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-btn">
        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        <el-button @click="dialog.show = false">取消</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value !== this.formData.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      formData: {
        password: "",
        checkPassword: ""
      },
      form_rules: {
        password: [
          { required: true, message: "密码不能为空！", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "密码长度在6-12个字符之间！",
            trigger: "blur"
          }
        ],
        checkPassword: [
          { required: true, message: "确认密码不能为空！", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "密码长度在6-12个字符之间！",
            trigger: "blur"
          },
          { validator: validatePass, trigger: "blur" }
        ]
      }
    };
  },
  props: {
    dialog: Object
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    resetForm() {
      if (this.$refs["form"]) {
        this.$refs["form"].resetFields();
      }
    },
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$http
            .post(`api/users/change_pwd/${this.user.id}`, this.formData)
            .then(res => {
              console.log(res);
              // 提示框
              this.$message({
                message: "修改密码成功！",
                type: "success"
              });

              // 隐藏dialog
              this.dialog.show = false;
            })
            .catch(err => console.log(err));
        }
      });
    }
  }
};
</script>

<style scoped>
.dialog-btn {
  text-align: center;
}
</style>