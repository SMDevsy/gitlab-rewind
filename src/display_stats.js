import {colorPaletes,randomColorPalete} from "./random_palete.js";

function isNumber(stat){
  return !isNaN(stat)
}

function getUserName(){
  let name = document.getElementById("input").value
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
}

function destroyLoader(){
  document.getElementById("loader").remove()
}

function createStat(prefix, stat,sufix, animation){
  let mainDiv = document.createElement("div")
  let prefixDiv = document.createElement("div")
  let statDiv = document.createElement("div")
  let sufixDiv = document.createElement("div")
  mainDiv = randomColorPalete(mainDiv, colorPaletes)
  mainDiv.classList.add("stats")
  mainDiv.style.animation = animation
  prefixDiv.classList.add("prefix")
  prefixDiv.innerHTML = prefix
  statDiv.classList.add("stat")
  statDiv.innerHTML = stat
  if (isNumber(statDiv.innerHTML)) {
    statDiv.style.fontSize = "2.5rem"
  }
  sufixDiv.classList.add("sufix")
  sufixDiv.innerHTML = sufix
  mainDiv.append(prefixDiv, statDiv, sufixDiv)
  return mainDiv
  
}

function createAvatar(avatar, link, description, animation) {
  let mainDiv = document.createElement("div")
  let avatarImg = document.createElement("img")
  let anchorDiv = document.createElement("a")
  let descriptionDiv = document.createElement("div")
  mainDiv = randomColorPalete(mainDiv, colorPaletes)
  mainDiv.classList.add("stats")
  mainDiv.style.animation = animation
  anchorDiv.href = link
  avatarImg.src = avatar
  avatarImg.alt = "project avatar"
  avatarImg.style.height = "100px"
  avatarImg.style.aspectRatio = "1 / 1"
  anchorDiv.style.gridArea = "1 / 2 / 3 / 3"
  descriptionDiv.innerHTML = description
  descriptionDiv.style.gridArea = "4 / 1 / 4 / 4"
  descriptionDiv.style.textAlign = "center"
  anchorDiv.append(avatarImg)
  mainDiv.append(anchorDiv, descriptionDiv, descriptionDiv)
  return mainDiv
}

// function createObjectStat(description, stat, animation){
//   let div = document.createElement("div")
//   //div.className = "stats"
//   div.innerHTML = description + ": " + JSON.stringify(stat, null, 4).slice(1,-1)
//   div.style.animation = animation
//   return div 
// }

function showStats(stats){
  let statsDiv = document.getElementById("stats-div")
  statsDiv.appendChild(createStat("You have made", stats.commitData.numberOfCommits, "commits", "fadeIntoLeft 1s forwards"))
  statsDiv.appendChild(createStat("That amount to", stats.commitData.numberOfPushes, "pushes", "fadeIntoRight 2s forwards"))
  statsDiv.appendChild(createStat("This", stats.commitData.longestCommitMessage,"is your longest commit message", "fadeInFromBelow 2s forwards"))
  statsDiv.appendChild(createStat("On the other hand", stats.commitData.shortestCommitMessage,"this is your shortest commit message", "fadeInFromBelow 2s forwards"))
  statsDiv.appendChild(createStat("This shows how much", stats.issueData.openedIssues, "of your issues are open" , "fadeIntoRight 2s forwards"))
  statsDiv.appendChild(createStat("And this shows how much", stats.issueData.closedIssues, "issues you have closed" , "fadeIntoLeft 2s forwards"))
  statsDiv.appendChild(createStat("You have pushed to", stats.commitData.numberOfProjectsPushedTo, "projects", "fadeInFromBelow 2s forwards"))
  statsDiv.appendChild(createStat("And now", "Your most commited project","here are the stats", "fadeInFromBelow 2s forwards"))
  statsDiv.appendChild(createStat("You have commited the most", stats.commitData.projectMostPushedTo.name, "to this project", "fadeInFromAbove 2s forwards"))
  statsDiv.appendChild(createAvatar(stats.commitData.projectMostPushedTo.avatar_url, stats.commitData.projectMostPushedTo.web_url,
				    stats.commitData.projectMostPushedTo.description, "fadeInFromBelow 2s forwards"))
  // statsDiv.appendChild(createStat("number of commits", stats.commitData.projectMostPushedTo.commits, "fadeInFromBelow 2s forwards"))
  // statsDiv.appendChild(createStat("number of pushes", stats.commitData.projectMostPushedTo.pushes, "fadeInFromBelow 2s forwards"))
  // statsDiv.appendChild(createObjectStat("used languages", stats.commitData.projectMostPushedTo.languages, "fadeInFromBelow 2s forwards"))
  // statsDiv.appendChild(createStat("StarTrak", stats.commitData.projectMostPushedTo.star_count, "fadeInFromBelow 2s forwards"))
}

export {destroyStatsDiv, createStatsDiv, createLoader, getUserName, destroyLoader, showStats}
