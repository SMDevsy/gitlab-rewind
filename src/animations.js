function animateStats(){
  const animationTiming = {
    duration: 1000,
    iterations: 1,
    fill: 'forwards'
  }
  
  const fadeInFromBelow = [
    {transform: 'translateY(25%)',
     opacity: 0.1,},
    {transform: 'translateY(0%)',
     opacity: 1.0}
  ]
  
  const fadeInFromAbove = [
    {transform: 'translateY(-25%)',
     opacity: 0.1,},
    {transform: 'translateY(0%)',
     opacity: 1.0}
  ]
  
  const fadeInFromLeft = [
    {transform: 'translateX(-25%)',
     opacity: 0.1},
    {transform: 'translateX(0)',
     opacity: 1.0},
  ]
  
  const fadeInFromRight = [
    {transform: 'translateX(25%)',
     opacity: 0.1},
    {transform: 'translateX(0)',
     opacity: 1.0},
  ]
  
  const animations = [fadeInFromBelow, fadeInFromAbove, fadeInFromLeft, fadeInFromRight]
  const stats = document.querySelectorAll('.stats')

  for (let i = 0; i < stats.length; i++) {
    let randomIdx = Math.floor(Math.random() * animations.length)
    console.log(stats[i])
    stats[i].animate(animations[randomIdx], animationTiming).finished
      .then(()=>{console.log("finished!")})
  }
}

export {animateStats}
