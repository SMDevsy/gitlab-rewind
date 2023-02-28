const per_page = 100

function getDefaultSearchParams() {
  return {
    per_page: per_page,
    page: 1,
    after: getLowerDateBoundary()
  }
}

function getLowerDateBoundary() {
  let today = new Date()
  let yearAgoStr = new Date(today
    .setFullYear(today.getFullYear() - 1))
    .toISOString()
    .slice(0, 10)
  return yearAgoStr
}

// custom params: object
async function fetchYearlyData(url, customParams) {
  let yearlyData = []
  let ob = Object.assign(getDefaultSearchParams(), customParams)
  while (true) {
    const finalUrl = url + new URLSearchParams(ob).toString()
    const response = await fetch(finalUrl)
    const data = await response.json()
    yearlyData.push(...data)
    if (data.length < per_page) { break }
    ob.page++
  }
  return yearlyData
}

/* returns an object containing two values:
   openedIssues: integer
   closedIssues: integer
*/
async function fetchIssueData(url) {
  const customSearchParams = {
    target_type: "issue",
  }
  console.log(`Querying for Issue data`)
  const yearlyData = await fetchYearlyData(url, customSearchParams)
  const result = yearlyData.reduce((r, o) => {
    r[o.action_name === "opened" ? 'openedIssues' : 'closedIssues']++;
    return r;
  }, { openedIssues: 0, closedIssues: 0 });

  return result;
}

/*
  returns an object containing info about a project
  name: string
  description: string
  avatar_url: string
  star_count: integer
  languages: object
  web_url: string
 */
async function fetchRepositoryData(projectID) {
  const url = `https://gitlab.com/api/v4/projects/${projectID}/`
  console.log(`Querying for Project data`)
  const project = await fetch(url).then((data) => data.json())
  return {
    name: project.name,
    description: project.description,
    avatar_url: project.avatar_url,
    star_count: project.star_count,
    languages: await fetchProjectLanguage(projectID),
    web_url: project.web_url
  }
}

async function fetchProjectLanguage(projectID) {
  const url = `https://gitlab.com/api/v4/projects/${projectID}/languages`
  return await fetch(url).then((data) => data.json())
}

/*
  returns an object containing info about user's commits:
  mostUsedLanguage: string
  numberOfPushes: integer
  numberOfCommits: integer
  numberOfProjectsCommitedTo: integer
  longestCommitMessage: string
  shortestCommitMessage: string
 */
async function fetchCommitData(url) {
  const customSearchParams = {
    action: "pushed",
  }
  console.log(`Querying for Commit data`)
  let data = await fetchYearlyData(url, customSearchParams)
  data = data.filter((event) => event.action_name == "pushed to")

  let result = {
    numberOfPushes: data.length, // done
    numberOfCommits: 0, // done
    longestCommitMessage: "",
    shortestCommitMessage: "",
    projectMostPushedTo: {
      name: "",
      languages: {},
      numberOfPushes: 0,
      numberOfCommits: 0
    }
  }

  let projectPushCounts = new Map()
  let maxCommitMessageLen = 0
  let minCommitMessageLen = Infinity

  for (let event of data) {
    result.numberOfCommits += event.push_data.commit_count

    if (!projectPushCounts.has(event.project_id))
      projectPushCounts.set(event.project_id, { pushes: 1, commits: event.push_data.commit_count })
    else
      projectPushCounts.set(event.project_id,
        {
          pushes: projectPushCounts.get(event.project_id).pushes + 1,
          commits: projectPushCounts.get(event.project_id).commits + event.push_data.commit_count
        })

    if (event.push_data.commit_title == null) continue

    if (event.push_data.commit_title.length < minCommitMessageLen) {
      minCommitMessageLen = event.push_data.commit_title.length
      result.shortestCommitMessage = event.push_data.commit_title
    }

    if (event.push_data.commit_title.length > maxCommitMessageLen) {
      maxCommitMessageLen = event.push_data.commit_title.length
      result.longestCommitMessage = event.push_data.commit_title
    }
  }
  const mapSort1 = new Map([...projectPushCounts.entries()].sort((a, b) => b[1].pushes - a[1].pushes));
  let favoriteProject = new Array(...mapSort1.entries())[0]
  let favoriteProjectID = favoriteProject[0]

  result.projectMostPushedTo = await fetchRepositoryData(favoriteProjectID)
  result.projectMostPushedTo = Object.assign(result.projectMostPushedTo, {pushes: favoriteProject[1].pushes ,commits: favoriteProject[1].commits })
  
  result.numberOfProjectsPushedTo = projectPushCounts.size
  return result
}

async function getUserData(username) {
  const apiUrl = `https://gitlab.com/api/v4/users/${username}/events?`
  const [issueData, commitData] = await Promise.allSettled([
    await fetchIssueData(apiUrl),
    await fetchCommitData(apiUrl),
  ])
  return {
    issueData: issueData.value,
    commitData: commitData.value
  }
}

function getUserName(){
  let name = document.getElementById("input").value
  console.log(name)
  document.getElementById("input").value = ""
  return name
}

function createStatsDiv(){
  let statsDiv = document.createElement("div")
  statsDiv.id = "stats-div"
  document.getElementById("flexbox").appendChild(statsDiv)
}

function destroyStatsDiv(){
  if (document.getElementById("stats-div") != null){
    document.getElementById("stats-div").remove()
  }
}

function createLoader(){
  let loader = document.createElement("div")
  loader.id = "loader"
  document.getElementById("stats-div").appendChild(loader)
  loader.style.display = "flex"
}

function destroyLoader(){
  document.getElementById("loader").remove()
}

function showStats(stats){
  let statsDiv = document.getElementById("stats-div")
}

async function main(){
  destroyStatsDiv()
  createStatsDiv()
  createLoader()
  let res = await getUserData(getUserName())
  destroyLoader()
  showStats(res)
  console.log(res)
}
