// =========================================
// GSAP
// =========================================

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// =========================================
// LENIS SMOOTH SCROLL
// =========================================

if(!reduceMotion){

    const lenis = new Lenis({
        duration:1.2,
        smoothWheel:true
    });

    function raf(time){

        lenis.raf(time);

        requestAnimationFrame(raf);

    }

    requestAnimationFrame(raf);

}

// =========================================
// LOADER
// =========================================

window.addEventListener("load",()=>{

    gsap.to(".loader",{

        opacity:0,

        duration:1,

        delay:1,

        onComplete(){

            document.querySelector(".loader").style.display="none";

        }

    });

});

// =========================================
// SCROLL PROGRESS BAR
// (thin gold line across the very top, fills as the page scrolls —
// a small ambient cue that reads well on phones where there's no
// custom cursor or hover feedback)
// =========================================

const progressBar = document.querySelector(".scroll-progress");

if(progressBar){

    gsap.to(progressBar,{

        scaleX:1,

        ease:"none",

        scrollTrigger:{

            trigger:"body",

            start:"top top",

            end:"bottom bottom",

            scrub:.3

        }

    });

}

// =========================================
// INTRO ANIMATION
// =========================================

let intro = gsap.timeline();

intro

.from(".tag",{

    opacity:0,

    y:50,

    duration:.6

})

.from(".title",{

    opacity:0,

    scale:.5,

    duration:.8

})

.from(".name",{

    opacity:0,

    x:-150,

    duration:.7

})

.from(".degree",{

    opacity:0,

    y:20

})

.from(".university",{

    opacity:0,

    y:20

})

.from(".year",{

    opacity:0,

    letterSpacing:25,

    duration:.7

})

.from("#start",{

    opacity:0,

    scale:0,

    duration:.6

});

// =========================================
// SIGNATURE: CONSTELLATION DRAW-IN
// =========================================

const constLines = document.querySelectorAll(".constellation line");
const constStars = document.querySelectorAll(".constellation circle");

constLines.forEach(line=>{

    const length = line.getTotalLength ? line.getTotalLength() : 200;

    line.style.strokeDasharray = length;
    line.style.strokeDashoffset = length;

});

gsap.set(".constellation circle",{ opacity:0, scale:0, transformOrigin:"center" });

const constTimeline = gsap.timeline({ delay:.6 });

constTimeline

.to(".constellation circle",{

    opacity:1,

    scale:1,

    duration:.4,

    stagger:.12,

    ease:"back.out(2)"

})

.to(".constellation line",{

    strokeDashoffset:0,

    duration:.5,

    stagger:.12,

    ease:"power1.out"

},"-=.9");

if(!reduceMotion){

    gsap.to(".constellation circle",{

        opacity:.5,

        repeat:-1,

        yoyo:true,

        duration:2,

        stagger:{

            each:.3,

            repeat:-1

        }

    });

    // a slow, continuous drift + rotation keeps the whole constellation
    // feeling alive instead of static once it has drawn itself in
    gsap.to(".constellation",{

        rotation:2.5,

        scale:1.03,

        repeat:-1,

        yoyo:true,

        duration:8,

        ease:"sine.inOut",

        transformOrigin:"center"

    });

    // ---------------------------------
    // SHOOTING STAR
    // occasional streak across the night sky above the hero
    // ---------------------------------

    function shootingStar(){

        const star = document.createElement("div");

        star.className = "shooting-star";

        const startX = Math.random()*60+10;

        star.style.top = (Math.random()*30+5)+"%";
        star.style.left = startX+"%";

        document.querySelector(".intro").appendChild(star);

        gsap.fromTo(star,{

            opacity:0,

            x:0,

            y:0

        },{

            opacity:1,

            x:220,

            y:120,

            duration:1.1,

            ease:"power1.in",

            onComplete(){

                star.remove();

            }

        });

        gsap.to(star,{

            opacity:0,

            duration:.3,

            delay:.7

        });

    }

    gsap.delayedCall(3,function loopShootingStar(){

        shootingStar();

        gsap.delayedCall(Math.random()*5+4,loopShootingStar);

    });

}

// =========================================
// START BUTTON
// =========================================

document.getElementById("start").onclick=(e)=>{

    // gold ripple/burst radiating from the button, replacing the old
    // "flying cap" transition — reads clearly on touch screens too
    const burst = document.createElement("span");

    burst.className = "start-burst";

    document.getElementById("start").appendChild(burst);

    gsap.fromTo(burst,{

        scale:0,

        opacity:.9

    },{

        scale:14,

        opacity:0,

        duration:.9,

        ease:"power2.out",

        onComplete(){

            burst.remove();

        }

    });

    if(typeof confetti === "function"){

        confetti({

            particleCount:70,

            spread:65,

            startVelocity:28,

            gravity:.9,

            scalar:.7,

            colors:["#D4AF37","#C79A3D","#F6E6B4","#FFFFFF"],

            origin:{ x:.5, y:.75 }

        });

    }

    gsap.to(".hero",{

        scale:.9,

        opacity:0,

        duration:.6,

        ease:"power2.in"

    });

    gsap.to(".intro",{

        opacity:0,

        delay:.5,

        duration:.9,

        onComplete(){

            document.querySelector(".intro").style.display="none";

            document.querySelector(".countdown").scrollIntoView({

                behavior:"smooth"

            });

        }

    });

};

// =========================================
// AMBIENT INTRO MOTION
// =========================================

if(!reduceMotion){

    // =========================================
    // GLOW EFFECT
    // =========================================

    gsap.to(".glow1",{

        x:80,

        y:-40,

        repeat:-1,

        yoyo:true,

        duration:6

    });

    gsap.to(".glow2",{

        x:-70,

        y:50,

        repeat:-1,

        yoyo:true,

        duration:7

    });

    // =========================================
    // PARALLAX PARTICLES
    // =========================================

    gsap.to(".particles",{

        y:-250,

        ease:"none",

        scrollTrigger:{

            trigger:"body",

            start:"top top",

            end:"bottom bottom",

            scrub:true

        }

    });

}

// =========================================
// SCROLL ANIMATIONS
// =========================================

gsap.utils.toArray(

".countdown,.journey,.profile,.gallery,.guestbook,.end"

).forEach(section=>{

    gsap.to(section,{

        opacity:1,

        y:0,

        duration:1.2,

        scrollTrigger:{

            trigger:section,

            start:"top 80%"

        }

    });

});

// =========================================
// TIMELINE
// (alternating left/right rotate-in, so the journey reads as a real
// path rather than a flat fade-up — this also gives phones something
// more dynamic to react to on scroll, since there's no hover there)
// =========================================

document.querySelectorAll(".step").forEach((step,i)=>{

    const fromLeft = i % 2 === 0;

    gsap.from(step,{

        scrollTrigger:{

            trigger:step,

            start:"top 85%"

        },

        opacity:0,

        y:60,

        x: fromLeft ? -40 : 40,

        rotation: fromLeft ? -4 : 4,

        duration:.9,

        ease:"back.out(1.4)"

    });

});

// =========================================
// ACHIEVEMENT CARDS
// tilt-in one by one as they enter view — a hover-style flourish
// that still shows up nicely for people scrolling on a phone
// =========================================

gsap.from(".card",{

    scrollTrigger:{

        trigger:".cards",

        start:"top 85%"

    },

    opacity:0,

    y:40,

    scale:.85,

    rotateY:25,

    stagger:.15,

    duration:.8,

    ease:"back.out(1.6)"

});

// =========================================
// COUNTDOWN
// =========================================

// Set this to your real ceremony date/time.
const graduationDate = new Date("December 12, 2026 18:00:00").getTime();

function updateCountdown(){

    const now = new Date().getTime();

    const distance = graduationDate - now;

    if(distance <= 0){

        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";

        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

}

updateCountdown();
setInterval(updateCountdown,1000);

// =========================================
// COUNTER
// =========================================

const counters = document.querySelectorAll(".counter");

counters.forEach(counter=>{

    const target = Number(counter.dataset.target);

    let current = 0;

    const step = target / 80;

    function animate(){

        current += step;

        if(current < target){

            counter.textContent = Math.ceil(current);

            requestAnimationFrame(animate);

        }

        else{

            counter.textContent = target;

        }

    }

    ScrollTrigger.create({

        trigger:counter,

        start:"top 85%",

        once:true,

        onEnter:animate

    });

});

// =========================================
// MUSIC
// =========================================

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

let playing = false;

musicBtn.addEventListener("click",()=>{

    if(!playing){

        music.play().catch(()=>{});

        musicBtn.textContent = "⏸";

    }

    else{

        music.pause();

        musicBtn.textContent = "🎵";

    }

    playing = !playing;

});

// =========================================
// CUSTOM CURSOR
// =========================================

const cursor = document.querySelector(".cursor");
const cursor2 = document.querySelector(".cursor2");

if(!reduceMotion){

    document.addEventListener("mousemove",(e)=>{

        gsap.to(cursor,{
            x:e.clientX,
            y:e.clientY,
            duration:.05
        });

        gsap.to(cursor2,{
            x:e.clientX-12,
            y:e.clientY-12,
            duration:.2
        });

    });

}

// =========================================
// PHOTO 3D
// (mouse tilt on desktop, plus a touch-friendly tilt-in on scroll so
// the gallery still feels alive with no pointer at all on mobile)
// =========================================

document.querySelectorAll(".photo").forEach((photo,i)=>{

    photo.addEventListener("mousemove",(e)=>{

        const x = (e.offsetX-photo.clientWidth/2)/12;
        const y = (e.offsetY-photo.clientHeight/2)/12;

        gsap.to(photo,{

            rotateY:x,

            rotateX:-y,

            duration:.3

        });

    });

    photo.addEventListener("mouseleave",()=>{

        gsap.to(photo,{

            rotateX:0,
            rotateY:0,
            duration:.4

        });

    });

    gsap.from(photo,{

        scrollTrigger:{

            trigger:photo,

            start:"top 88%"

        },

        opacity:0,

        y:60,

        rotateY: i % 2 === 0 ? -18 : 18,

        duration:.9,

        ease:"power2.out"

    });

});

// =========================================
// LIGHTBOX
// =========================================

const lightbox = document.querySelector(".lightbox");
const lightImage = document.getElementById("lightImage");

document.querySelectorAll(".photo img").forEach(img=>{

    img.addEventListener("click",()=>{

        lightbox.style.display="flex";

        lightImage.src = img.src;

        lightImage.alt = img.alt;

    });

});

lightbox.addEventListener("click",()=>{

    lightbox.style.display="none";

});

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        lightbox.style.display="none";

    }

});

// =========================================
// GUEST BOOK
// now asks for the guest's name and shows it on their message
// =========================================

function saveWish(){

    const nameInput = document.getElementById("guestName");
    const wishInput = document.getElementById("wish");

    const name = nameInput.value.trim();
    const text = wishInput.value.trim();

    if(text===""){

        wishInput.focus();

        return;

    }

    if(name===""){

        nameInput.focus();

        return;

    }

    const message = document.createElement("div");

    message.className="message";

    const strong = document.createElement("strong");
    strong.textContent = name;

    const body = document.createElement("p");
    body.textContent = text;

    message.appendChild(strong);
    message.appendChild(body);

    document.getElementById("messages").prepend(message);

    gsap.from(message,{

        opacity:0,

        y:40,

        duration:.6

    });

    if(typeof confetti === "function"){

        confetti({

            particleCount:50,

            spread:60,

            scalar:.6,

            colors:["#D4AF37","#C79A3D","#F6E6B4"],

            origin:{ x:.5, y:.6 }

        });

    }

    wishInput.value="";
    nameInput.value="";

    nameInput.focus();

}

// =========================================
// CELEBRATE (big finale burst, still triggered from the last section's button)
// =========================================

function celebrate(){

    confetti({

        particleCount:180,

        spread:100,

        origin:{y:.7}

    });

    confetti({

        particleCount:120,

        angle:60,

        spread:80,

        origin:{x:0}

    });

    confetti({

        particleCount:120,

        angle:120,

        spread:80,

        origin:{x:1}

    });

}

// =========================================
// CONFETTI THROUGHOUT THE SITE
// small gold bursts fire as each section scrolls into view, so the
// celebration feels woven through the whole page instead of being
// saved up for a single button at the very bottom
// =========================================

function sectionBurst(originX){

    confetti({

        particleCount:60,

        spread:70,

        startVelocity:35,

        gravity:.9,

        scalar:.8,

        ticks:150,

        colors:["#D4AF37","#C79A3D","#F6E6B4","#FFFFFF"],

        origin:{ x:originX, y:.2 }

    });

}

if(!reduceMotion){

    const burstSections = [

        { selector:".countdown", x:.5 },

        { selector:".journey", x:.2 },

        { selector:".profile", x:.8 },

        { selector:".gallery", x:.2 },

        { selector:".guestbook", x:.8 }

    ];

    burstSections.forEach(({selector,x})=>{

        const el = document.querySelector(selector);

        if(!el) return;

        ScrollTrigger.create({

            trigger:el,

            start:"top 70%",

            once:true,

            onEnter:()=>sectionBurst(x)

        });

    });

}

// =========================================
// BUTTON ANIMATION
// =========================================

if(!reduceMotion){

    gsap.to("#start",{

        scale:1.05,

        repeat:-1,

        yoyo:true,

        duration:1

    });

    gsap.to(".music-btn",{

        scale:1.1,

        repeat:-1,

        yoyo:true,

        duration:1.5

    });

}

// =========================================
// TAP RIPPLE
// a quick, light ripple on every button tap — makes touch interaction
// on phones feel more tactile and responsive
// =========================================

document.querySelectorAll("button").forEach(btn=>{

    btn.addEventListener("click",function(e){

        const ripple = document.createElement("span");

        ripple.className = "tap-ripple";

        const rect = btn.getBoundingClientRect();

        ripple.style.left = (e.clientX ? e.clientX-rect.left : rect.width/2)+"px";
        ripple.style.top = (e.clientY ? e.clientY-rect.top : rect.height/2)+"px";

        btn.appendChild(ripple);

        setTimeout(()=>ripple.remove(),650);

    });

});
let musicStarted = false;

function startMusic() {
    if (musicStarted) return;

    music.play().then(() => {
        musicStarted = true;
        playing = true;
        musicBtn.textContent = "⏸";
    }).catch(() => {});
}

document.addEventListener("click", startMusic, { once: true });
document.addEventListener("touchstart", startMusic, { once: true });