<template>
  <div class="notfound-container">
    <div class="text">
      <p class="title">404</p>
      <p class="explain">Page is not found.</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.notfound-container{
  width: 100%;
  height: 100%;
  background-image: url('../assets/login-bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
.notfound-container::after{
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.4);
}
.notfound-container .text{
  text-align: center;
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 99;
  text-shadow: 20px 20px 10px #000;
}
.title{
  font-size: 200px;
}
.explain{
  font-size: 24px;
  margin-top: 20px;
  text-decoration: underline;
}
</style>
