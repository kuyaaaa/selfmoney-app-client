<template>
  <div class="sum-container">
    <div class="text-container" v-for="(item,index) in ctProfiles" :key="index">
      <p class="type-name">{{item.name}}</p>
      <p class="point-fill"></p>
      <p class="type-cost">{{item.value}} 元</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    ctProfiles: Array
  }
};
</script>

<style scoped>
.sum-container {
  margin: 15px 0 30px 0;
}
.text-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 20px;
  padding: 5px 20px;
  border-radius: 5px;
}
.text-container p {
  font-size: 22px;
  color: #303133;
  white-space: nowrap;
}
.text-container:hover {
  background-color: rgba(153, 153, 153, 0.4);
}
.type-cost {
  text-align: right;
}
.point-fill {
  width: 100%;
  height: 1px;
  border-top: dotted #303133 2px;
  margin: 0 10px;
}
</style>