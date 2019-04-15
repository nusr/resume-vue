<template>
  <el-row class="organ">
    <el-col :span="5"><h2>Organizations</h2></el-col>
    <el-col :span="19">
      <div v-for="item in organList" :key="item.id" class="organ-item">
        <div class="organ-title">
          <h2>{{ item.name }}</h2>
          <h4>{{ item.now }}</h4>
        </div>
        <h3>Member</h3>

        <p>
          If you would like more information about this organization, please
          visit
          <a :href="`https://github.com/${item.name}`">the organization page</a>
          on GitHub.
        </p>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "OrganList",
  props: ["organList"]
};
</script>

<style lang="less">
.organ {
  h3 {
    font-size: 100%;
  }

  a {
    border: none;
    text-decoration: none;
  }

  p {
    margin: 0.75em 0 2em 0;
    padding-bottom: 2em;
    border-bottom: 1px solid #ccc;
    font-size: 122%;
  }

  &-title {
    display: flex;
    justify-content: space-between;
  }

  &-item:last-child {
    p {
      border: none;
    }
  }
}
</style>
