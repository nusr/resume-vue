<template>
  <el-row>
    <el-col :span="5"><h2>Contributions</h2></el-col>
    <el-col :span="19">
      <div v-for="item in issueList" :key="item.id" class="contribute-item">
        <h2>
          <a :href="item.repoUrl">{{ item.repoName }}</a>
        </h2>
        <p>
          {{ item.userName }} has contributed for
          <a :href="item.repoUrl">{{ item.repoName }}</a> with
          <a :href="item.commitsUrl">{{ item.count }} commit(s)</a>
        </p>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "ContributionList",
  props: ["issueList"]
};
</script>

<style lang="less">
.contribute-item {
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}
</style>
