<template>
  <el-row class="repo">
    <el-col :span="5"
      ><h2>{{ other }} Popular Repositories</h2></el-col
    >
    <el-col :span="19">
      <div v-for="item in repoList" :key="item.id" class="repo-item">
        <div class="repo-title">
          <h2>
            <a :href="`https://github.com/${item.username}/${item.name}`">{{
              item.name
            }}</a>
          </h2>
          <h4 v-html="item.date"></h4>
        </div>

        <h3>
          {{ item.language ? `${item.language} - ` : "" }}Creator &amp; Owner
        </h3>

        <p class="repo-desc">
          {{ item.description
          }}<a :href="item.homepage" v-if="item.homepage">{{
            item.homepage
          }}</a>
        </p>
        <p>
          This repository has {{ item.watchers }} {{ item.watchersLabel }} and
          {{ item.forks }} {{ item.forksLabel }}. If you would like more
          information about this repository and my contributed code, please
          visit
          <a :href="`https://github.com/${item.username}/${item.name}`"
            >the repo</a
          >
          on GitHub.
        </p>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "RepoList",
  props: {
    repoList: {
      type: Array,
      default() {
        return [];
      }
    },
    other: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="less">
.repo {
  &-item {
    padding: 1em 0;
    border-bottom: 1px solid #ccc;

    &:last-child {
      border: none;
    }
  }

  &-desc {
    margin: 1em 0;
    font-size: 122%;
  }

  &-title {
    display: flex;
    justify-content: space-between;
  }
}
</style>
