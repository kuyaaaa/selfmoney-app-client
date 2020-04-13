<template>
  <el-dialog
    :title="dialog.title"
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
        <el-form-item label="收/支：" prop="type">
          <el-select v-model="formData.type" placeholder="收入or支出" style="width:120px">
            <el-option v-for="(item,index) in type_list" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收支描述：" prop="describe">
          <el-input v-model="formData.describe" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="类型：" prop="costType">
          <el-select v-model="formData.costType" placeholder="用途类型" style="width: 120px">
            <el-option
              v-for="(item,index) in type_cost_list"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金额：" prop="cost">
          <el-input v-model.number="formData.cost" style="width: 100px"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input type="textarea" v-model="formData.remark"></el-input>
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
      form_rules: {
        type: [
          { required: true, message: "收/支 必须选择！", trigger: "change" }
        ],
        describe: [
          { required: true, message: "收支描述不能为空！", trigger: "blur" }
        ],
        costType: [
          { required: true, message: "类型必须选择！", trigger: "change" }
        ],
        cost: [
          { required: true, message: "金额不能为空！", trigger: "blur" },
          { type: "number", message: "必须为数值！", trigger: "blur" }
        ]
      },
      httpConfig: {
        url: "",
        message: ""
      }
    };
  },
  props: {
    dialog: Object,
    formData: Object,
    type_list: Array,
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    type_cost_list() {
      return this.$store.state.type_cost_list;
    }
  },
  methods: {
    addUserID() {
      this.formData.user_id = this.user.id;
    },
    changeCost() {
      if (this.formData.type === "支出") {
        this.formData.cost = -this.formData.cost;
      }
    },
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.changeCost();
          this.addUserID();
          // console.log(this.formData);
          switch (this.dialog.type) {
            case "add":
              this.httpConfig = {
                url: "add",
                message: "账单添加成功！"
              };
              break;
            case "edit":
              this.httpConfig = {
                url: `edit/${this.formData.id}`,
                message: "账单修改成功！"
              };
          }

          this.$http
            .post(`/api/profiles/${this.httpConfig.url}`, this.formData)
            .then(res => {
              // 提示框
              this.$message({
                message: this.httpConfig.message,
                type: "success"
              });

              // 隐藏dialog
              this.dialog.show = false;
              this.$emit("updata");
            })
            .catch(err => console.log(err));
        }
      });
    },
    resetForm() {
      if (this.dialog.type === "add" && this.$refs["form"]) {
        this.$refs["form"].resetFields();
      }
    }
  }
};
</script>

<style scoped>
.dialog-btn {
  text-align: right;
}
</style>