<template>
  <div class="container">
    <!-- 数据操作表单 -->
    <div class="form-container">
      <el-form :inline="true" :model="searchData" ref="searchData">
        <!-- 查询 -->
        <el-form-item label="时间:" prop="date">
          <el-date-picker
            v-model="searchData.date"
            type="daterange"
            align="right"
            unlink-panels
            size="small"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            style="width: 230px"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="收/支:" prop="type">
          <el-select v-model="searchData.type" placeholder="收/支" size="small" style="width: 75px">
            <el-option label="收入" value="收入"></el-option>
            <el-option label="支出" value="支出"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键字:" prop="keyword">
          <el-input
            placeholder="收支描述关键字"
            size="small"
            v-model="searchData.keyword"
            style="width: 150px"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="用途类型:" prop="costType">
          <el-select
            v-model="searchData.costType"
            placeholder="用途类型"
            size="small"
            style="width: 100px"
            clearable
          >
            <el-option
              v-for="(item,index) in type_cost_list"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="handleSearch">查询</el-button>
          <el-button type="warning" size="small" @click="resetForm('searchData')">重置</el-button>
        </el-form-item>
        <!-- 记账 -->
        <el-form-item class="addbtn">
          <el-button type="success" size="middum" icon="view" @click="handleAdd">
            <i class="el-icon-circle-plus-outline" style="margin-right: 5px"></i>
            记账
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <div class="table-container">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column label="序号" min-width="80" type="index" align="center"></el-table-column>
        <el-table-column label="创建时间" min-width="240" prop="newDate" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.newDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="收/支" min-width="70" prop="type" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type === '收入'" style="color: #66CC33">{{ scope.row.type }}</span>
            <span v-if="scope.row.type === '支出'" style="color: #F56C6C">{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column label="收支描述" min-width="150" prop="describe" align="center"></el-table-column>
        <el-table-column label="类型" min-width="100" prop="costType" align="center"></el-table-column>
        <el-table-column label="金额" min-width="80" prop="cost" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.cost > 0" style="color: #67C23A">{{ scope.row.cost }}</span>
            <span v-if="scope.row.cost < 0" style="color: #F56C6C">{{ scope.row.cost }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" width="230" prop="remark" align="center"></el-table-column>
        <el-table-column label="操作" align="center" min-width="145px">
          <template slot-scope="scope">
            <el-button size="small" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 增/改 弹窗 -->
    <DialogMoney :dialog="dialog" :type_list="type_list" :formData="formData" @updata="getProfile"></DialogMoney>
    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="paginations.page_index"
        :page-sizes="paginations.page_sizes"
        :page-size="paginations.page_size"
        :layout="paginations.layout"
        :total="paginations.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import DialogMoney from "../components/moneyView/DialogMoney";

export default {
  data() {
    return {
      tableData: [],
      allTableData: [],
      noProcessTableData: [],
      dialog: {
        show: false,
        title: "",
        type: ""
      },
      type_list: ["收入", "支出"],
      formData: {
        user_id: "",
        id: "",
        type: "",
        describe: "",
        costType: "",
        cost: "",
        remark: ""
      },
      paginations: {
        page_index: 1, // 首页
        total: 0, // 总数
        page_size: 5, // 一页显示多少条
        page_sizes: [5, 10, 15, 20], // 每页显示多少条
        layout: "total,sizes,prev,pager,next,jumper" // 翻页属性
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      searchData: {
        date: "",
        type: "",
        keyword: "",
        costType: ""
      }
    };
  },
  components: {
    DialogMoney
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    profiles() {
      return this.$store.state.profiles;
    },
    type_cost_list() {
      return this.$store.state.type_cost_list;
    }
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      // 获取表格数据
      this.$http
        .get(`/api/profiles/${this.user.id}`)
        .then(res => {
          // console.log(res);
          this.$store.dispatch("setProfiles", res.data);
          this.allTableData = this.profiles;
          this.dateProcess(this.allTableData);
          // console.log(this.allTableData);
          this.noProcessTableData = this.allTableData;
          // 设置分页数据
          this.setPaginations();
        })
        .catch(err => console.log(err));
    },
    dateProcess(arr) {
      // 修改日期格式 yyyy-mm-dd hh:mm:ss
      for (let item of arr) {
        let newDate = new Date(item.date);
        let y = newDate.getFullYear();
        let m = newDate.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        let d = newDate.getDate();
        d = d < 10 ? "0" + d : d;
        let h = newDate.getHours();
        h = h < 10 ? "0" + h : h;
        let minute = newDate.getMinutes();
        minute = minute < 10 ? "0" + minute : minute;
        let second = newDate.getSeconds();
        second = second < 10 ? "0" + second : second;
        item.newDate =
          y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
      }
    },
    handleEdit(index, row) {
      console.log(row);
      this.dialog = {
        show: true,
        title: "编辑账单",
        type: "edit"
      };
      this.formData = {
        user_id: row.user_id,
        id: row._id,
        type: row.type,
        describe: row.describe,
        costType: row.costType,
        cost: Math.abs(row.cost),
        remark: row.remark
      };
    },
    handleDelete(index, row) {
      // 确认弹窗
      this.$confirm(`确定要删除“${row.describe}”该账单吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http
          .delete(`api/profiles/delete/${row._id}`)
          .then(res => {
            // 提示框
            this.$message({
              message: `删除“${row.describe}”账单成功！`,
              type: "success"
            });
            this.getProfile();
          })
          .catch(err => console.log(err));
      });
    },
    handleAdd() {
      this.dialog = {
        show: true,
        title: "记账",
        type: "add"
      };
      this.formData = {
        user_id: "",
        id: "",
        type: "",
        describe: "",
        costType: "",
        cost: "",
        remark: ""
      };
    },
    setPaginations() {
      // 分页属性设置
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      // 设置默认的分页数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleSizeChange(page_size) {
      // 切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    handleCurrentChange(page) {
      // 该页起始数据数组下标
      let startIndex = this.paginations.page_size * (page - 1);
      // 该页结束数据数组下标
      let endIndex = this.paginations.page_size * page;
      // 该页数据
      let table = [];

      for (let i = startIndex; i < endIndex; i++) {
        if (this.allTableData[i]) {
          table.push(this.allTableData[i]);
        }
        this.tableData = table;
      }
    },
    handleSearch() {
      // 初始化数据
      this.allTableData = this.noProcessTableData;
      // console.log(this.searchData);
      // 日期搜索
      if (this.searchData.date) {
        const startTime = this.searchData.date[0].getTime();
        const endTime = this.searchData.date[1].getTime();

        this.allTableData = this.allTableData.filter(item => {
          let date = new Date(item.date);
          let time = date.getTime();
          return time >= startTime && time <= endTime;
        });
      }
      // 收or支搜索
      if (this.searchData.type) {
        this.allTableData = this.allTableData.filter(item => {
          return item.type.match(this.searchData.type);
        });
      }
      // 关键字搜索
      if (this.searchData.keyword) {
        this.allTableData = this.allTableData.filter(item => {
          return item.describe.match(this.searchData.keyword);
        });
      }
      // 用途种类搜索
      if (this.searchData.costType) {
        this.allTableData = this.allTableData.filter(item => {
          return item.costType.match(this.searchData.costType);
        });
      }

      // 分页
      this.setPaginations();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      // 分页初始化
      this.setPaginations();
    }
  }
};
</script>

<style scoped>
.container {
  padding: 15px;
}
.addbtn {
  float: right;
}
.pagination-container {
  margin-top: 15px;
  text-align: center;
}
</style>