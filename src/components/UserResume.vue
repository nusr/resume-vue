<template>
  <div>
    <print-component
      :user-name="userData.userName"
      :resume-url="userData.resume_url"
    ></print-component>

    <header class="header-wrapper">
      <div>
        <h1>{{ userData.name }}</h1>
        <h2>{{ userData.userStatus }}</h2>
      </div>
      <div>
        <template v-if="userData.avatar_url">
          <img :src="userData.avatar_url" alt="avatar" class="header-avatar" />
        </template>
        <template v-if="userData.email">
          <h3>
            <a :href="`mailto:${userData.email}`" class="email">{{
              userData.email
            }}</a>
          </h3>
        </template>
      </div>
    </header>

    <article class="article-wrapper">
      <el-row>
        <el-col :span="5"><h2>GitHub Profile</h2></el-col>
        <el-col :span="19">
          <p class="enlarge">
            On GitHub
            <template v-if="userData.earlyAdopter">
              as an early adopter
            </template>

            since {{ userData.since }}, {{ userData.name }} is a developer

            <template v-if="userData.location">
              based in
              <span class="adr locality">{{ userData.location }}</span>
            </template>

            <template v-if="userData.repos">
              with
              <a
                :href="
                  `https://github.com/${userData.username}?tab=repositories`
                "
                >{{ userData.repos }} public {{ userData.reposLabel }}</a
              >
            </template>

            <template v-if="!userData.repos">
              without any public repository for now
            </template>

            <template v-if="userData.followers">
              and
              <a :href="`https://github.com/${userData.userName}/followers`"
                >{{ userData.followers }} {{ userData.followersLabel }}</a
              >
            </template>
          </p>
        </el-col>
      </el-row>
      <el-row v-if="userData.website">
        <el-col :span="5"><h2>Website</h2></el-col>
        <el-col :span="19">
          <a
            :href="userData.website"
            id="mywebsite"
            :title="`${userData.name}'s website`"
            >{{ userData.website }}</a
          >
        </el-col>
      </el-row>

      <language-list
        :language-list="languageList"
        v-if="languageList"
        v-loading="!languageList"
      ></language-list>
      <repo-list
        :repo-list="repoList"
        v-if="repoList"
        v-loading="!repoList"
      ></repo-list>

      <contribution-list
        :issue-list="issueList"
        v-if="issueList"
        v-loading="!issueList"
      ></contribution-list>

      <organ-list
        :organ-list="organList"
        v-if="organList"
        v-loading="!organList"
      ></organ-list>

      <el-row>
        <el-col :span="5"><h2>About This R&eacute;sum&eacute;</h2></el-col>
        <el-col :span="19">
          <p class="enlarge">
            This r&eacute;sum&eacute; is generated automatically using public
            information from the developer's GitHub account. The repositories
            are ordered by popularity based on a very simple popularity
            heuristic that defines the popularity of a repository by its sum of
            watchers and forks. Do not hesitate to visit
            <a
              :href="`https://github.com/${userData.username}`"
              :title="`${userData.name}'s GitHub page`"
              >{{ userData.name }}'s GitHub page</a
            >
            for a complete work history.
          </p>
        </el-col>
      </el-row>
    </article>

    <common-footer :user-data="userData"></common-footer>

    <!--// doc -->
  </div>
</template>

<script>
import CommonFooter from "./CommonFooter";
import PrintComponent from "./Print";
import LanguageList from "./LanguageList";
import repoList from "./RepoList";
import ContributionList from "./ContributionList";
import OrganList from "./OrganList";

export default {
  name: "UserResume",
  components: {
    ContributionList,
    CommonFooter,
    PrintComponent,
    LanguageList,
    repoList,
    OrganList
  },
  props: ["userData", "languageList", "repoList", "issueList", "organList"]
};
</script>

<style scoped></style>
