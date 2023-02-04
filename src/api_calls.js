function getLowerDateBoundary() {
  let today = new Date()
  let yearAgoStr = new Date(today
    .setFullYear(today.getFullYear() - 1))
    .toISOString()
    .slice(0, 10)
  return yearAgoStr
}

async function fetchIssueData(url) {
  console.log(`Querying ${url} for Issue data`)
  //let fetchedData = []
  return fetch(url, {
    method: "GET"
  })
    .then(res => {
      if (res.ok) {
        console.log("fetchIssueData: Success")
      } else { console.log("fetchIssueData: Failure") }
    }).catch(error => console.log(`Error: ${error}`))
}

async function getUserData(username) {
  let apiUrl = `https://gitlab.com/api/v4/users/${username}/events?`
  let searchParamsObject = {
    per_page: "10",
  };

  let searchParams = new URLSearchParams(searchParamsObject).toString()

  const result = await Promise.allSettled([
    fetchIssueData(apiUrl + searchParams)
  ])

  console.log(result)
}

function main() {
  getLowerDateBoundary()
  getUserData("mmilek")
}

