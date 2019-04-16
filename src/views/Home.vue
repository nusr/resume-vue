<template>
  <div class="home">
    <header class="header-wrapper home-header">
      <h1>My GitHub R&eacute;sum&eacute;</h1>
    </header>
    <article>
      <p class="home-medium">
        As a software startup owner I really enjoy when people send us their
        r&eacute;sum&eacute;s and they include their github account so we can
        see tangible work they have done.
      </p>
      <p class="home-medium home-padding">
        After a tweet by John Resig I imagined that it may be nice for people to
        be able to generate their
        <a href="https://github.com" title="GitHub">GitHub</a>
        r&eacute;sum&eacute;s.
      </p>
      <el-form
        :model="formData"
        :rules="rules"
        ref="formData"
        class="home-form"
        @submit.native.prevent
      >
        <el-form-item prop="name" class="home-input">
          <el-input
            v-model="formData.name"
            placeholder="Enter your GitHub username and click on Generate"
            @keyup.native.enter="submitForm"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <button @click="submitForm" class="home-button">Generate</button>
        </el-form-item>
      </el-form>

      <h2>See some popular users</h2>
      <ul class="home-popular">
        <li v-for="item in popularList" :key="item.name">
          <a :href="`/resume?name=${item.name}`" :title="item.realName">{{
            item.realName
          }}</a>
        </li>
      </ul>

      <h2>Notes, Information and Future features</h2>
      <p class="home-medium" style="padding-bottom:2em;">
        <br />
        This is the first version. I am planning on adding things as such as
        your most committed forks, most committed repositories and make the "My
        Popular Repositories" be built from your complete list of repositories.
        Feel free to
        <a href="https://github.com/nusr/resume-vue">fork the page</a>
        if you want to help :-)
      </p>
      <footer class="home-footer home-medium">
        Vue2.x imitate
        <a
          href="https://github.com/resume/resume.github.com"
          title="resume.github.com"
          style="padding-right:20px;"
          >resume.github.com</a
        >
        github
        <a href="https://github.com/nusr/resume-vue" title="resume-vue"
          >resume-vue</a
        >
      </footer>
    </article>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      rules: {
        name: [
          {
            required: true,
            message: "please enter your GitHub username",
            trigger: "blur"
          }
        ]
      },
      formData: {
        name: ""
      },
      popularList: [
        {
          name: "mxcl",
          realName: "Max Howell"
        },
        {
          name: "defunkt",
          realName: "Chris Wanstrath"
        }
      ]
    };
  },
  methods: {
    submitForm() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.$router.push(`/resume?name=${this.formData.name}`);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less">
.home {
  h1 {
    font-size: 48px;
    text-transform: uppercase;
    letter-spacing: 3px;
  }

  &-header {
    padding-bottom: 1em;
    border-bottom: 1px solid #ccc;
  }

  &-form {
    display: flex;
    padding-top: 1.4em;
    padding-bottom: 0.8em;
  }

  &-input {
    flex: 1;

    .el-input__inner {
      height: 44px;
      border: 2px solid #444;
    }
  }

  &-button {
    width: 150px;
    margin-left: 10px;
    height: 44px;
    font-family: Georgia, Garamond, "Times New Roman", Times, serif;
    font-size: 18px;
    color: #fff;
    background-color: #323232;
    border: 1px solid #444;
    border-radius: 4px;

    &:hover {
      cursor: pointer;
    }
  }

  &-popular {
    display: flex;
    list-style: none;

    margin-bottom: 3em;
    flew-wrap: wrap;

    > li {
      width: 40%;
      padding-right: 10%;

      a {
        padding: 10px;
        display: block;
        border-bottom: 1px solid #ccc;
      }
    }
  }

  &-desc {
    zoom: 1;
  }

  &-padding {
    padding: 1.4em 0;
  }

  &-medium {
    font-size: 15px;
  }

  &-footer {
    padding: 1em 0 5em 5em;
    border-top: 1px solid #ccc;
  }
}
</style>
