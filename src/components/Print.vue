<template>
  <div class="print">
    <a
      class="print-email"
      href="`mailto:?subject=Resume for ${userName}&body=Link to resume: ${resumeUrl}`"
      >Email</a
    >
    <a @click="printResume" class="print-content">Print</a>
  </div>
</template>

<script>
export default {
  name: "Print",
  props: {
    userName: {
      type: String,
      default: ""
    },
    resumeUrl: {
      type: String,
      default: ""
    }
  },
  methods: {
    printResume() {
      window.print();
    }
  }
};
</script>
<style lang="less">
.print {
  position: absolute;
  top: -35px;
  right: 0;

  &-email {
    padding-right: 1em;
  }

  a {
    color: #ccc;
    text-decoration: none;
    text-shadow: 0 0 5px #000;
    cursor: pointer;
  }
}
</style>
