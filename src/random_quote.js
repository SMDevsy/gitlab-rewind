let quotes = [
  "It's GitLabin' time.",
  "Quote placeholder, beep, boop.",
  "",
  "With great commits, come great responsibility.",
  "Also try GitHub.",
  "Wondered about your stats? Wonder no more.",
  "Are you commiting? Let us find out.",
]

function random_quote(quotes){
  let idx = Math.floor(Math.random() * quotes.length);
  let subtitle = document.getElementById('subtitle');
  subtitle.innerHTML = quotes[idx];
}

random_quote(quotes);
