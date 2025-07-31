
gsap.registerPlugin(ScrollTrigger);



const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});

locoScroll.on("scroll", ScrollTrigger.update);


ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, 
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});
// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


let tl=gsap.timeline();
tl.from("#navbar",{
    y:-50,
    opacity:0,
    delay:0.4,
    duration:0.8,
    stagger:0.3
})

tl.from("#main2 img,#main2 h1 ,#main2 h3,#main2 p,#main2 button",{
     y:100,
    opacity:0,
    duration:0.8,
    stagger:1
})

gsap.from("#navbar li",{
    y:-15,
    opacity:0,
    duration:0.3,
    stagger:1,
    scrub:1
})
if (window.innerWidth > 768) {
Shery.mouseFollower({
  
  skew: true,
  ease: "cubic-bezier(0.23, 1, 0.320, 1)",
  duration: 1,
});
}
Shery.makeMagnet(".navlinks" , {
  
  ease: "cubic-bezier(0.23, 1, 0.3200, 1)",
  duration: 1,
});

let allH1=document.querySelectorAll("#page2 h1")

allH1.forEach(function(elem){
    let clutter=""
    let h1Text=elem.textContent
    let splittedText=h1Text.split("")
    splittedText.forEach(function(e){
            clutter +=`<span>${e}</span>`
    })
    elem.innerHTML = clutter    
})


gsap.to("#page2 h1 span",{
    color:"#F7F7EE",
    stagger:0.1,
    scrollTrigger:{
    trigger:"#page2 h1",
    scroller:"#main",
    
    start:"top 50%",
    end:"top 0%",
    scrub:5
    }
})
let ham = document.querySelector("#hamburger");
let ul = document.querySelector("#ul");

ham.addEventListener("click", () => {
  if (ul.style.display === "block") {
    ul.style.display = "none";
  } else {
    ul.style.display = "block";
  }
});
// Enable smooth scrolling for anchor links with Locomotive Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = this.getAttribute("href");


    if (target.length > 1) {
      const section = document.querySelector(target);
      if (section) {
        locoScroll.scrollTo(section);
      }
    }
  });
});

if (ul.style.display === "block") {
  ul.style.display = "none";
}
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = this.getAttribute("href");
    const section = document.querySelector(target);
    if (section) {
      locoScroll.scrollTo(section);
      ul.style.display = "none"; // close mobile menu if open
    }
  });
});