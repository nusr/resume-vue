<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <component
      :is="whichComponent"
      :user-data="userData"
      :language-list="languageList"
      :repo-list="repoList"
      :issue-list="issueList"
      :organ-list="organList"
    />
  </div>
</template>

<script>
  import jsonp from "jsonp";
  import OrganResume from "../components/OrganResume";
  import UserResume from "../components/UserResume";
  import {
    handleGithubUser,
    handleGithubRepos,
    handleGithubIssues,
    handleGithubOrgans
  } from "./utils";

  export default {
    name: "ResumeResult",
    components: {
      OrganResume,
      UserResume
    },
    data() {
      return {
        userData: {},
        userName: "",
        whichComponent: "UserResume",
        languageList: null,
        repoList: null,
        issueList: null,
        organList: null,
        fullscreenLoading: false
      };
    },
    mounted() {
      let userName = this.$route.query.name
      if (!userName) {
        this.$router.replace('/')
        return;
      }
      this.fullscreenLoading = true
      this.userName = userName
      this.getGithubUser();
      this.getGithubRepos();
    },
    methods: {
      getGithubUser() {
        const requestUrl = `https://api.github.com/users/${this.userName}`;
        jsonp(requestUrl, null, (err, data) => {
          if (err) {
            console.error(err);
          } else {
            let temp = handleGithubUser(this.userData, data.data);
            if (temp) {
              if (temp.type === "User") {
                this.whichComponent = "UserResume";
                this.getGithubIssues();
                this.getGithubOrgans();
              } else {
                this.whichComponent = "OrganResume";
              }
              this.userData = temp;
            }
          }
        });
      },
      getGithubRepos(pageNumber = 1, prevData = null) {
        let url = `https://api.github.com/users/${
          this.userName
          }/repos?per_page=100`;
        let data = prevData ? prevData : [];

        if (pageNumber > 1) {
          url += "&page=" + pageNumber;
        }
        jsonp(url, null, (err, repos) => {
          if (err) {
            console.log(err);
          } else {
            data = data.concat(repos.data);
            if (repos && repos.data.length == 100) {
              this.getGithubRepos(pageNumber + 1, data);
            } else {
              const repoResult = handleGithubRepos(this.userName, data);
              this.languageList = repoResult.languageList;
              this.repoList = repoResult.repoList;
            }
            if (this.userData && this.userData.type !== 'User') {
              this.fullscreenLoading = false
            }

          }
        });
      },

      getGithubIssues(page_number = 1, prev_data = null) {
        let url =
          "https://api.github.com/search/issues?q=type:pr+is:merged+author:" +
          this.userName +
          "&per_page=100";
        let data = prev_data ? prev_data : [];

        if (page_number > 1) {
          url += "&page=" + page_number;
        }

        jsonp(url, null, (err, repos) => {
          data = data.concat(repos.data.items);
          if (repos.data.total_count == 100) {
            this.getGithubIssues(page_number + 1, data);
          } else {
            this.issueList = handleGithubIssues(this.userName, data);
          }
        });
      },
      getGithubOrgans() {
        let url = "https://api.github.com/users/" + this.userName + "/orgs";
        jsonp(url, null, (err, response) => {
          this.organList = handleGithubOrgans(this.userName, response.data);
          this.fullscreenLoading = false
        });
      }
    }
  };
</script>

<style scoped></style>
