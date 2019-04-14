<template>
  <el-row class="language">
    <el-col :span="5">
      <h2>
        Languages
      </h2>
    </el-col>
    <el-col :span="19">
      <ul class="language-wrapper">
        <li v-for="item in languageList" :key="item.name" class="language-item">
          <a :href="item.url">
            {{ `${item.name}(${item.percent}%)` }}
          </a>
        </li>
      </ul>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "LanguageList",
  props: {
    languageList: {
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
.language {
  &-wrapper {
    display: flex;
    flex-wrap: wrap;
  }

  &-item {
    line-height: 24px;
    list-style: none;
    width: 32%;
  }
}
</style>
