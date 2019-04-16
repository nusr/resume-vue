<template>
  <div>
    <print-component
      :user-name="userData.userName"
      :resume-url="userData.resume_url"
    ></print-component>
    <header class="header-wrapper">
      <div>
        <h1>{{ userData.name }}</h1>
        <h2>Github organization</h2>
      </div>
      <div>
        <img
          class="header-avatar"
          :src="userData.avatar_url"
          alt="avatar"
          v-if="userData.avatar_url"
        />
        <h3 v-if="userData.email">
          <a :href="`mailto:${userData.email}`" `>{{ userData.email }}</a>
        </h3>
      </div>
    </header>

    <article class="article-wrapper">
      <el-row>
        <el-col :span="5"><h2>Github Profile</h2></el-col>
        <el-col :span="19">
          <p class="enlarge">
            We are a group of developers

            <template v-if="userData.location">
              based in {{ userData.location }}
            </template>

            <template v-if="userData.repos">
              with
              <a
                :href="
                  `https://github.com/${userData.userName}?tab=repositories`
                "
                >{{ userData.repos }}
                public
                {{ userData.reposLabel }}</a
              >
            </template>

            <template v-if="userData.followers">
              &nbsp;and
              <a :href="`https://github.com/${userData.userName}/followers`"
                >{{ userData.followers }} {{ userData.followersLabel }}</a
              >
            </template>

            We created this GitHub group in {{ userData.since }}

            <template v-if="userData.earlyAdopter">
              therefore we're early adopters,
            </template>

            <template v-if="userData.website">
              and you can find more information about us at
              <a :href="userData.website" title="my website">{{
                userData.website
              }}</a>
            </template>
          </p>
        </el-col>
      </el-row>

      <language-list
        :language-list="languageList"
        v-if="!$isEmpty(languageList)"
      ></language-list>

      <repo-list
        other="Our"
        :repo-list="repoList"
        :fork-flag="forkFlag"
      ></repo-list>

      <el-row>
        <el-col :span="5"><h2>About This R&eacute;sum&eacute;</h2></el-col>
        <el-col :span="19">
          <p class="enlarge">
            This r&eacute;sum&eacute; is generated automatically using
            information from github. The repositories are ordered by popularity
            based on a very simple popularity heuristic that defines the
            popularity of a repository by its sum of watchers and forks. Do not
            hesitate to visit
            <a
              :href="`https://github.com/${userData.userName}`"
              title="My Github page"
              >our github group's page</a
            >
            for more information about our repositories and work.
          </p>
        </el-col>
      </el-row>
    </article>

    <common-footer :user-data="userData"></common-footer>
  </div>
  <!--// doc -->
</template>

<script>
import CommonFooter from "./CommonFooter";
import PrintComponent from "./Print";
import LanguageList from "./LanguageList";
import repoList from "./RepoList";

export default {
  name: "OrganResume",
  components: {
    CommonFooter,
    PrintComponent,
    LanguageList,
    repoList
  },
  props: ["userData", "languageList", "repoList", "forkFlag"]
};
</script>

<style scoped></style>
