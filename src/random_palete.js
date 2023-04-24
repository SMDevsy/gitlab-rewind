let colorPaletes = [
  {
    color: "#D4A373",
    backgroundColors: ["#CCD5AE", "#E9EDC9", "#FEFAE0"]
  },
  {
    color: "#FF686B",
    backgroundColors: ["#FFFFFF","#84DCC6","#A5FFD6"]
  },
  {
    color: "#EE6055",
    backgroundColors: ["#FF9B85","#FFD97D","#AAF683"]
  }
  ]

// colorPaletes: array of objects containing color and backgroundColors
function randomColorPalete(div, colorPaletes) {
  let idx = Math.floor(Math.random() * colorPaletes.length);
  div.style.color = colorPaletes[idx].color
  div.style.background = "linear-gradient(90deg, " +
    colorPaletes[idx].backgroundColors[0] + ", " + 
    colorPaletes[idx].backgroundColors[1] + ", " + 
    colorPaletes[idx].backgroundColors[2] + ")";
  console.log(div.style.background)
  return div
}


export {colorPaletes, randomColorPalete}
