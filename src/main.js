import {getUserData} from "./api_calls.js"
import {destroyStatsDiv, createStatsDiv, createLoader, getUserName, destroyLoader, showStats} from "./display_stats.js"

async function main(){
  destroyStatsDiv()
  createStatsDiv()
  createLoader()
  let res = await getUserData(getUserName())
  destroyLoader()
  showStats(res)
  console.log(res)
}

document.getElementById("submit").addEventListener("click", main)
document.getElementById("input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    document.getElementById("submit").click()
  }
})
