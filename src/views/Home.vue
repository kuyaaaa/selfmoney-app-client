<template>
  <div class="home">
    <div class="textcontainer">
      <p class="title">📖 使用说明</p>
      <el-divider></el-divider>
      <ol>
        <li>欢迎使用个人账本！</li>
        <li>本程序目前可用功能：</li>
        <li>1️⃣ 账本表格：用于账单增删改查</li>
        <li>2️⃣ 数据中心：现有数据月报及年度数据两个功能，分别展示对应的数据</li>
        <li>3️⃣ 用户信息：查看用户的信息，目前可以修改用户名和用户密码</li>
      </ol>
      <el-divider></el-divider>
      <div class="conact">
        <p>可使用已编辑的账号进行查看功能，月报数据为2020年4月，年报数据为2019年</p>
        <p>
          <i class="el-icon-user"></i> qq1034816916@163.com
        </p>
        <p>
          <i class="el-icon-key"></i> test1234
        </p>
        <p>为防止密码修改，已编辑账号没有修改密码功能</p>
      </div>
      <el-divider></el-divider>
      <div class="conact">
        <p>联系我：</p>
        <p>🐧 1034816916</p>
        <p>
          <i class="el-icon-message"></i> qq1034816916@163.com
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.home {
  min-height: 100%;
  background-image: url("../assets/home-bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  position: relative;
  box-sizing: border-box;
  padding: 20px;
}
.home::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.4);
}
.textcontainer {
  position: relative;
  z-index: 99;
  color: #fff;
}
.title {
  font-size: 38px;
}
.home ol li {
  font-size: 18px;
  margin: 15px 0;
}
.conact {
  font-size: 18px;
}
.conact p {
  margin-bottom: 10px;
}
</style>