let mainColor = localStorage.getItem("color_option");

if (mainColor !== null) {
    document.documentElement.style.setProperty("--main--color", mainColor);
    document.querySelectorAll(".colors-list li").forEach(element=>{
        element.classList.remove("active");
        if (element.dataset.color === mainColor) {
            element.classList.add("active");
        }
    });
    
}

let settingToggle = document.querySelector(".toggle-settings");
let settingBox = document.querySelector(".settings-box");

settingToggle.addEventListener("click",()=>{
    settingBox.classList.toggle("open");
    document.querySelector(".toggle-settings .fa-gear").classList.toggle("fa-spin");
});

let colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach(li=>{
    li.addEventListener("click",(e)=>{
        document.documentElement.style.setProperty("--main--color", e.target.dataset.color);
        localStorage.setItem("color_option",e.target.dataset.color);
        handleActive(e);
    })
});

let backgroundOption = true;
let backgroundInterval;
let randomBackEl = document.querySelectorAll(".random-backgrounds span");
let backgroundLocalItem = localStorage.getItem("background_option");

if (backgroundLocalItem !== null) {
    if (backgroundLocalItem == 'true') {
        backgroundOption = true;
    } else if (backgroundLocalItem == 'false') {
        backgroundOption = false;
    }
    document.querySelectorAll(".random-backgrounds span").forEach(element=>{
        element.classList.remove("active");
    });
    if (backgroundLocalItem == "true") {
        document.querySelector(".random-backgrounds .yes").classList.add('active');
    } else {
        document.querySelector(".random-backgrounds .no").classList.add('active');
    }
}

randomBackEl.forEach(span=>{
    span.addEventListener("click",(e)=>{
        handleActive(e)
        if (e.target.dataset.background === "yes") {
            backgroundOption = true;
            randomImgs();
            localStorage.setItem("background_option", true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    })
})


let imgArray = ["landing.jpg","landing1.jpg","stats.jpg","subscribe.jpg"];
function randomImgs() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(()=>{
            let randomNum = Math.floor(Math.random() * imgArray.length);
            document.querySelector(".landing-page").style.backgroundImage = `url(img/${imgArray[randomNum]})`;
        },10000);
    }
}
randomImgs();

let ourSkills = document.querySelector(".skills");

window.onscroll = () => {
    let skillsOffsetTop = ourSkills.offsetTop;
    let skillsOuterHeight = ourSkills.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollTop = this.pageYOffset;
    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill=>{
            skill.style.width = skill.dataset.progress;
        })
    }
    
}

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img=>{
    img.addEventListener("click", (e)=>{
        let overlay = document.createElement("div");
        overlay.className = 'popup-overlay';
        document.body.appendChild(overlay);
        let popupBox = document.createElement("div");
        popupBox.className = 'popup-box';
        if (img.alt !== null) {
            let imgHeading = document.createElement("h3");
            imgHeading.appendChild(document.createTextNode(img.alt));
            popupBox.appendChild(imgHeading)
        }
        let popupImage = document.createElement("img");
        popupImage.src = img.src;
        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);
        let closeButton = document.createElement("span");
        closeButton.className = "close-button";
        closeButton.appendChild(document.createTextNode("X"));
        popupBox.appendChild(closeButton);
    })
})

document.addEventListener("click", (e)=>{
    if (e.target.className == "close-button") {
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    }
})

let allBullets = document.querySelectorAll(".nav-bullets .bullet");
let allLinks = document.querySelectorAll(".links a");

scrollToSomeWhere(allBullets);
scrollToSomeWhere(allLinks);

function scrollToSomeWhere(elements) {
    elements.forEach(element=>{
        element.addEventListener("click",(e)=>{
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            })
        })
    })
}

function handleActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(element=>{
        element.classList.remove("active");
    });
    ev.target.classList.add("active");
}

let showBullets = document.querySelectorAll(".show-bullets span");
let showBulletsOption = true;
let showBulletsLocalItem = localStorage.getItem("show_bullets_option");

if (showBulletsLocalItem !== null) {
    document.querySelectorAll(".show-bullets span").forEach(element=>{
        element.classList.remove("active");
    });
    if (showBulletsLocalItem == "true") {
        document.querySelector(".show-bullets .yes").classList.add("active");
        document.querySelector(".nav-bullets").style.display = "block";
    } else {
        document.querySelector(".show-bullets .no").classList.add("active");
        document.querySelector(".nav-bullets").style.display = "none";
    }
}

showBullets.forEach(span=>{
    span.addEventListener("click",(e)=>{
        handleActive(e)
        if (e.target.dataset.display === "show") {
            showBulletsOption = true;
            document.querySelector(".nav-bullets").style.display = "block";
            localStorage.setItem("show_bullets_option", true);
        } else {
            showBulletsOption = false;
            document.querySelector(".nav-bullets").style.display = "none";
            localStorage.setItem("show_bullets_option", false);
        }
    })
})

document.querySelector(".reset").onclick =  ()=>{
    localStorage.clear();
    window.location.reload()
}

let toggleMenu = document.querySelector(".toggle-menu");
let ulLinks = document.querySelector(".links");

toggleMenu.onclick = function(e) {
    e.stopPropagation();
    this.classList.toggle("menu-active");
    ulLinks.classList.toggle("open");
}

document.addEventListener('click',(e)=>{
    if (e.target !== toggleMenu && e.target !== ulLinks) {
        if (ulLinks.classList.contains("open")) {
            toggleMenu.classList.remove("menu-active");
            ulLinks.classList.remove("open")
        }
    }
})

ulLinks.onclick = function(e) {
    e.stopPropagation();
}