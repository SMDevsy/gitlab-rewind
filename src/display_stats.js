import {colorPaletes,randomColorPalete} from "./random_palete.js";

const animationTimer = 2.5

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
    statDiv.style.fontSize = "3rem"
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
  avatarImg.classList.add("avatar")
  console.log(typeof(avatar))
  if (typeof(avatar) === "object"){
    avatarImg.src = "./img/avatar.jpg"
  } else {
    avatarImg.src = avatar
  }
  avatarImg.alt = "project avatar"
  avatarImg.style.height = "150px"
  avatarImg.style.aspectRatio = "1 / 1"
  anchorDiv.style.height = "150px"
  anchorDiv.href = link
  anchorDiv.style.gridArea = "1 / 2 / 3 / 3"
  if (description.length === 0) {
    descriptionDiv.innerHTML = "no description?"
  } else {
  descriptionDiv.innerHTML = description
  }
  descriptionDiv.style.gridArea = "4 / 1 / 4 / 4"
  descriptionDiv.style.textAlign = "center"
  descriptionDiv.style.fontSize = "2.0rem"
  anchorDiv.append(avatarImg)
  mainDiv.append(anchorDiv, descriptionDiv, descriptionDiv)
  return mainDiv
}

function parseLanguages(stat) {
  let string = []
  //add non-breaking space for better Windows browsers display
  Object.entries(stat).forEach((e) => {
    string.push(e.toString().split(",").join(":&nbsp") + "%")
  })
  return string.join("\n")
}

function createObjectStat(prefix, stat, sufix, animation){
  let mainDiv = document.createElement("div")
  let prefixDiv = document.createElement("div")
  let statDiv = document.createElement("div")
  let sufixDiv = document.createElement("div")
  mainDiv = randomColorPalete(mainDiv, colorPaletes)
  mainDiv.classList.add("stats")
  mainDiv.style.animation = animation
  prefixDiv.innerHTML = prefix
  prefixDiv.classList.add("prefix")
  statDiv.innerHTML = parseLanguages(stat)
  statDiv.classList.add("languages")
  sufixDiv.innerHTML = sufix
  sufixDiv.classList.add("sufix")
  mainDiv.append(prefixDiv, statDiv, sufixDiv)
  return mainDiv
}

// 1.5s because thats how long the animations takes to finish
function addAnimationDelay(divs){
  divs.forEach((e,i) => {
    e.style.animationDelay = animationTimer * i + "s"
  })
}

function addScroll(divs){
  divs.forEach((e) => {
    e.addEventListener("animationstart", function() {
      e.scrollIntoView({behavior: "smooth", block: "center", inline: "center"})
    })
  })
}

function showStats(stats){
  const statsDiv = document.getElementById("stats-div")
  statsDiv.appendChild(createStat("You have made", stats.commitData.numberOfCommits, "commits", "fadeIntoLeft "+ animationTimer +"s forwards"))
  statsDiv.appendChild(createStat("That amount to", stats.commitData.numberOfPushes, "pushes", "fadeIntoRight "+ animationTimer +"s forwards"))
  statsDiv.appendChild(createStat("This", stats.commitData.longestCommitMessage,"is your longest commit message", "fadeInFromBelow "+ animationTimer +"s forwards"))
  statsDiv.appendChild(createStat("On the other hand", stats.commitData.shortestCommitMessage,"this is your shortest commit message", "fadeInFromBelow "+ animationTimer +"s forwards"))
  statsDiv.appendChild(createStat("This shows how much", stats.issueData.openedIssues, "issues you have ever opened" , "fadeIntoRight "+ animationTimer +"s forwards"))
  statsDiv.appendChild(createStat("And this shows how much", stats.issueData.closedIssues, "issues you have closed" , "fadeIntoLeft "+ animationTimer +"s forwards"))
  statsDiv.appendChild(createStat("You have pushed to", stats.commitData.numberOfProjectsPushedTo, "projects", "fadeInFromBelow "+ animationTimer +"s forwards"))
  statsDiv.appendChild(createStat("", "These are your most commited project stats","", "fadeInFromBelow "+ animationTimer +"s forwards"))
  statsDiv.appendChild(createStat("You have commited the most", stats.commitData.projectMostPushedTo.name, "to this project", "fadeInFromAbove "+ animationTimer +"s forwards"))
  statsDiv.appendChild(createAvatar(stats.commitData.projectMostPushedTo.avatar_url, stats.commitData.projectMostPushedTo.web_url,
				    stats.commitData.projectMostPushedTo.description, "fadeInFromBelow "+ animationTimer +"s forwards"))
  statsDiv.appendChild(createStat("Your project has", stats.commitData.projectMostPushedTo.commits, "that many commits", "fadeIntoRight "+ animationTimer +"s forwards"))
  statsDiv.appendChild(createStat("And that many", stats.commitData.projectMostPushedTo.pushes,"pushes", "fadeIntoLeft "+ animationTimer +"s forwards"))
  statsDiv.appendChild(createObjectStat("These are", stats.commitData.projectMostPushedTo.languages, "the used languages", "fadeInFromAbove "+ animationTimer +"s forwards"))
  statsDiv.appendChild(createStat("This many people", stats.commitData.projectMostPushedTo.star_count, "starred your project", "fadeInFromBelow "+ animationTimer +"s forwards"))
  let statsDivs = document.querySelectorAll('.stats')
  addAnimationDelay(statsDivs)
  addScroll(statsDivs)
}

export {destroyStatsDiv, createStatsDiv, createLoader, getUserName, destroyLoader, showStats}
