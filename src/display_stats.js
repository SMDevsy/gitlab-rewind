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
  loader.style.display = "flex"
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

function createLink(description, stat,animation){
  let div = document.createElement("div")
  div.innerHTML = description + ": "
  let link = document.createElement("a")
  link.href = stat
  link.target = "_blank"
  link.innerHTML = stat
  div.appendChild(link)
  div.style.animation = animation
  return div
}

// function createImage(stat, animation){
//   let div = document.createElement("div")
//   div.className = "stats"
//   let img = document.createElement("img")
//   img.src = stat
//   img.alt = "project avatar"
//   img.height = 100
//   img.width = 100
//   div.style.animation = animation
//   div.appendChild(img)
//   return div
// }

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
  statsDiv.appendChild(createStat("This...", stats.commitData.longestCommitMessage,"...is your longest commit message", "fadeInFromBelow 3s forwards"))
  statsDiv.appendChild(createStat("On the other hand...", stats.commitData.shortestCommitMessage,"...this is your shortest commit message", "fadeInFromBelow 4s forwards"))
  // statsDiv.appendChild(createStat("number of open issues", stats.issueData.openedIssues, "fadeInFromBelow 2s forwards"))
  // statsDiv.appendChild(createStat("number of closed issues", stats.issueData.closedIssues, "fadeInFromBelow 2s forwards"))
  // statsDiv.appendChild(createStat("number of projects you commited to", stats.commitData.numberOfProjectsPushedTo, "fadeInFromBelow 2s forwards"))
  // statsDiv.appendChild(createStat("Your most commited project", stats.commitData.projectMostPushedTo.name, "fadeInFromBelow 2s forwards"))
  // statsDiv.appendChild(createImage(stats.commitData.projectMostPushedTo.avatar_url, "fadeInFromBelow 2s forwards"))
  // statsDiv.appendChild(createLink("check it out at", stats.commitData.projectMostPushedTo.web_url, "fadeInFromBelow 2s forwards"))
  // statsDiv.appendChild(createStat("description", stats.commitData.projectMostPushedTo.description, "fadeInFromBelow 2s forwards"))
  // statsDiv.appendChild(createStat("number of commits", stats.commitData.projectMostPushedTo.commits, "fadeInFromBelow 2s forwards"))
  // statsDiv.appendChild(createStat("number of pushes", stats.commitData.projectMostPushedTo.pushes, "fadeInFromBelow 2s forwards"))
  // statsDiv.appendChild(createObjectStat("used languages", stats.commitData.projectMostPushedTo.languages, "fadeInFromBelow 2s forwards"))
  // statsDiv.appendChild(createStat("StarTrak", stats.commitData.projectMostPushedTo.star_count, "fadeInFromBelow 2s forwards"))
}

export {destroyStatsDiv, createStatsDiv, createLoader, getUserName, destroyLoader, showStats}
