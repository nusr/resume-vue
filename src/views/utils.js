const configData = {
  maxItems: 5,
  maxLanguages: 9
};

function getUserStatus(data = "", view) {
  let COEF_REPOS = 2;
  let COEF_GISTS = 0.25;
  let COEF_FOLLOWERS = 0.5;
  let COEF_FOLLOWING = 0.25;
  let FIRST_STEP = 0;
  let SECOND_STEP = 5;
  let THIRD_STEP = 20;
  let FOURTH_STEP = 50;
  let FIFTH_STEP = 150;
  let EXTRA_POINT_GAIN = 1;

  let statusScore =
    data.public_repos * COEF_REPOS +
    data.public_gists * COEF_GISTS +
    data.followers * COEF_FOLLOWERS +
    data.following * COEF_FOLLOWING;

  // Extra points
  // - Early adopter
  if (view.earlyAdopter == 1) {
    statusScore += EXTRA_POINT_GAIN;
  }
  // - Blog & Email & Location
  if (
    view.location &&
    view.location != "" &&
    view.email &&
    view.email != "" &&
    data.blog &&
    data.blog != ""
  ) {
    statusScore += EXTRA_POINT_GAIN;
  }

  if (statusScore == FIRST_STEP) {
    return "Inactive GitHub user";
  } else if (statusScore > FIRST_STEP && statusScore <= SECOND_STEP) {
    return "Newbie GitHub user";
  } else if (statusScore > SECOND_STEP && statusScore <= THIRD_STEP) {
    return "Regular GitHub user";
  } else if (statusScore > THIRD_STEP && statusScore <= FOURTH_STEP) {
    return "Advanced GitHub user";
  } else if (statusScore > FOURTH_STEP && statusScore <= FIFTH_STEP) {
    return "Enthusiastic GitHub user";
  } else if (statusScore > FIFTH_STEP) {
    return "Passionate GitHub user";
  }
}

function sortByPopularity(a, b) {
  return b.popularity - a.popularity;
}

function sortLanguages(languages, limit, username) {
  let languageTotal = 0;
  let sorted_languages = [];
  for (let lang of Object.keys(languages)) {
    if (lang) {
      sorted_languages.push({
        name: lang,
        popularity: languages[lang],
        url: `https://github.com/search?q=user%3A${username}&l=${encodeURIComponent(
          lang
        )}`
      });
      languageTotal += languages[lang];
    }
  }
  if (limit) {
    sorted_languages = sorted_languages.slice(0, limit);
  }
  for (let item of sorted_languages) {
    item.percent = parseInt((item.popularity / languageTotal) * 100, 10);
  }

  return sorted_languages;
}

export function handleGithubUser(userName, data = []) {
  let sinceDate = new Date(data.created_at);
  let since = sinceDate.getFullYear();
  let sinceMonth = sinceDate.getMonth();
  let currentYear = new Date().getFullYear();

  switch (since) {
    case currentYear - 1:
      since = "last year";
      break;
    case currentYear:
      since = "this year";
      break;
    default:
  }

  let addHttp = "";
  if (data.blog && data.blog.indexOf("http") < 0) {
    addHttp = "http://";
  }

  // set view.name to the "friendly" name e.g. "John Doe". If not defined
  // (in which case data.name is empty), fall back to the login
  // name e.g. "johndoe"
  let name = userName;
  if (data.name && data.name.length > 0) {
    name = data.name;
  }

  let view = {
    ...data,
    name: name,
    reposLabel: data.public_repos > 1 ? "repositories" : "repository",
    followersLabel: data.followers > 1 ? "followers" : "follower",
    userStatus: "GitHub user",
    username: userName,
    earlyAdopter: 0,
    since: since,
    repos: data.public_repos,
    resume_url: window.location.href
  };
  // We consider a limit of 4 months since the GitHub opening (Feb 2008) to be considered as an early adopter
  if ((since == "2008" && sinceMonth <= 5) || since <= "2007") {
    view.earlyAdopter = 1;
  }
  view.userStatus = getUserStatus(data, view);
  if (data.blog !== undefined && data.blog !== null && data.blog !== "") {
    view.website = addHttp + data.blog;
  }
  return view;
  // let resume = (data.type == 'User' ? 'views/resume.html' : 'views/resumeOrgs.html');
}

export function handleGithubRepos(userName, reposData = []) {
  let sorted = [];
  let languages = {};
  let popularity;

  reposData.forEach((item, i) => {
    if (item.fork !== false) {
      return;
    }
    let key = item.language;
    if (key) {
      if (languages[key]) {
        languages[key]++;
      } else {
        languages[key] = 1;
      }
    }

    popularity = item.watchers + item.forks;
    sorted.push({
      position: i,
      popularity: popularity,
      info: item,
      id: item.id
    });
  });

  sorted.sort(sortByPopularity);
  let result = sortLanguages(languages, configData.maxLanguages, userName);
  // console.log(result);

  let sortList = sorted
    .map(item => {
      let since = new Date(item.info.created_at).getFullYear();
      let until = new Date(item.info.pushed_at).getFullYear();
      let date;
      if (since == until) {
        date = since;
      } else {
        date = since + " &ndash; " + until;
      }
      let emojiPattern = /:([a-z0-9_\\+\\-]+):/g;
      // no, it's not really a pattern
      let imagePattern =
        "<img width='20' height='20' src='https://assets-cdn.github.com/images/icons/emoji/$1.png' />";
      let description = item.info.description;
      let realDesc = description
        ? description.replace(emojiPattern, imagePattern)
        : description;
      return {
        name: item.info.name,
        id: item.id,
        date: date,
        language: item.info.language,
        description: realDesc,
        homepage: item.info.homepage,
        username: userName,
        watchers: item.info.watchers,
        forks: item.info.forks,
        watchersLabel:
          item.info.watchers == 0 || item.info.watchers > 1 ? "stars" : "star",
        forksLabel:
          item.info.forks == 0 || item.info.forks > 1 ? "forks" : "fork"
      };
    })
    .slice(0, configData.maxItems);
  return {
    languageList: result,
    repoList: sortList,
    forkFlag: reposData.length > 0
  };
}

export function handleGithubIssues(username, data = []) {
  let sorted = [];
  let repos = {};

  data.forEach(item => {
    if (!repos[item.repository_url]) {
      repos[item.repository_url] = {
        popularity: 1,
        id: item.id
      };
    } else {
      repos[item.repository_url].popularity += 1;
    }
  });
  Object.keys(repos).forEach(key => {
    let item = repos[key];
    sorted.push({ repo: key, ...item });
  });

  sorted.sort(sortByPopularity);

  return sorted.map(item => {
    let repoUrl = item.repo.replace(
      /https:\/\/api\.github\.com\/repos/,
      "https://github.com"
    );
    let repoName = item.repo.replace(/https:\/\/api\.github\.com\/repos\//, "");
    let commitsUrl = repoUrl + "/commits?author=" + username;
    return {
      count: item.popularity,
      username,
      repoUrl,
      repoName,
      commitsUrl,
      id: item.id
    };
  });
}

export function handleGithubOrgans(username, response = []) {
  let sorted = [];
  response.forEach((item, i) => {
    if (!item.login) {
      return;
    }
    sorted.push({ position: i, info: item, id: item.id });
  });

  let now = new Date().getFullYear();
  return sorted
    .map(item => {
      let name = item.info.name || item.info.login;
      return {
        name: name,
        id: item.id,
        now: now
      };
    })
    .slice(0, configData.maxItems);
}
