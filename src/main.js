import {getUserData} from "./api_calls.js"
import {goToTop, scrollCheck} from "./scrolling.js"
import {destroyStatsDiv, createStatsDiv, createLoader, getUserName, destroyLoader, showStats} from "./display_stats.js"

async function main(){
  destroyStatsDiv()
  createStatsDiv()
  createLoader()
  let res = await getUserData(getUserName())
  destroyLoader()
  showStats(res)
}

document.getElementById("submit").addEventListener("click", main)
document.getElementById("input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    document.getElementById("submit").click()
  }
})
document.getElementById("top-button").addEventListener("click", goToTop)
window.onscroll = function() {scrollCheck(document.getElementById("top-button"))}
