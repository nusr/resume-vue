<template>
  <footer class="common-footer">
    {{ userData.name }} &mdash;
    <template v-if="userData.email"
      ><a :href="`mailto:{{userData.email}}`">{{ userData.email }}</a>
      &mdash;
    </template>
    <template v-if="userData.website">
      <a :href="userData.website" :title="`${userData.name}'s website`">{{
        userData.website
      }}</a>
      &mdash;
    </template>

    <a :href="`https://github.com/${userData.userName}`" title="Github profile"
      >https://github.com/{{ userData.userName }}</a
    >
  </footer>
</template>

<script>
export default {
  name: "CommonFooter",
  props: ["userData"]
};
</script>

<style lang="less">
.common-footer {
  border-top: 1px solid #ccc;
  padding: 1em 0 5em 0;
  font-size: 92%;
  text-align: center;
}
</style>
