<template>
  <el-dialog
    title="用户名修改"
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
        <el-form-item label="新用户名：" prop="name">
          <el-input v-model="formData.name"></el-input>
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
    return {
      formData: {
        name: ""
      },
      form_rules: {
        name: [{ required: true, message: "请输入新用户名！", trigger: "blur" }]
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
            .post(`api/users/change_name/${this.user.id}`, this.formData)
            .then(res => {
              console.log(res);
              // 提示框
              this.$message({
                message: "修改用户名成功！",
                type: "success"
              });

              // 隐藏dialog
              this.dialog.show = false;
              // 更新用户名信息
              this.$store.dispatch("updataUserName", res.data.name);
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