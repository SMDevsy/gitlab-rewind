let quotes = [
  "Also try GNU Emacs.",
  "Wondered about your stats? Wonder no more.",
  "Are you commiting? Let us find out.",
]

function random_quote(quotes){
  let idx = Math.floor(Math.random() * quotes.length);
  let subtitle = document.getElementById('subtitle');
  subtitle.innerHTML = quotes[idx];
  console.log(subtitle);
}

random_quote(quotes);
