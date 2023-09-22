// Slideshow Testimonials

const sliderContainer = document.querySelector(".testi-slider");
const slides = sliderContainer.children;
const containerWidth = sliderContainer.offsetWidth;
const margin = 30;
let itemPerSlide = 0,
    slideDots,
    totalWidth;

// Responsive breakPoint
const responsive = [{
        breakPoint: {
            width: 0,
            item: 1
        }
    },
    {
        breakPoint: {
            width: 991,
            item: 2
        }
    }
]

function load() {
    // brp jumlah item
    for (let i = 0; i < responsive.length; i++) {
        if (window.innerWidth > responsive[i].breakPoint.width) {
            itemPerSlide = responsive[i].breakPoint.item;
        }
    }
    start();
}

function start() {
    totalWidth = 0;

    // ukuran slide
    for (let r = 0; r < slides.length; r++) {
        slides[r].style.width = (containerWidth / itemPerSlide) - margin + "px";
        slides[r].style.margin = margin / 2 + "px";
        totalWidth += containerWidth / itemPerSlide;
    }

    // ukuran container slide
    sliderContainer.style.width = totalWidth + "px";

    // slide dot controller
    slideDots = Math.ceil(slides.length / itemPerSlide);
    // console.log(slideDots);

    // create dots
    for (let k = 0; k < slideDots; k++) {
        const div = document.createElement("div");
        div.id = k;
        div.setAttribute("onclick", "controlSlide(this)");

        if (k == 0) {
            div.classList.add("activate");
        }

        document.querySelector(".slide-controls").appendChild(div);
    }
}

let currentSlide = 0;
let autoSlide = 0;

function controlSlide(e) {
    // restart timer when clicked the slideDots
    clearInterval(timer);
    timer = setInterval(autoPlay, 5000);

    // change autoSlide Value
    autoSlide = e.id;

    currentSlide = e.id;
    changeSlide(currentSlide);
}

function changeSlide(currentSlide) {
    const controlButtons = document.querySelector(".slide-controls").children;

    for (let j = 0; j < controlButtons.length; j++) {
        controlButtons[j].classList.remove("activate");
    }
    controlButtons[currentSlide].classList.add("activate");

    // animated slide
    sliderContainer.style.marginLeft = -(containerWidth * currentSlide) + "px";
}

// autoPlay Slide
function autoPlay() {
    if (autoSlide == slideDots - 1) {
        autoSlide = 0;
    } else {
        autoSlide++;
    }
    changeSlide(autoSlide);
}

// autoSlide setiap 5 detik
let timer = setInterval(autoPlay, 5000);

window.onload = load();


// Header Fixed
window.onscroll = function () {
    const docScroll = document.documentElement.scrollTop;
    // if layar > dari 991 maka header menjadi fixed
    if (window.innerWidth > 991) {
        // jika element yang discroll lebih dari 100 maka header fixed
        if (docScroll > 100) {
            document.querySelector("header").classList.add("fixed");
        } else {
            document.querySelector("header").classList.remove("fixed");
        }
    }
}

// navbar active links

const nav = document.getElementsByTagName("nav")[0];
const a = nav.querySelectorAll("a");

a.forEach(function (e) {
    e.addEventListener("click", function () {
        for (let i = 0; i < a.length; i++) {
            a[i].classList.remove("activate");
        }
        e.classList.add("activate");
        nav.classList.toggle("show");

    })
})

// ham-burger
const hamBurger = document.querySelector(".ham-burger");

hamBurger.addEventListener("click", function () {
    document.querySelector("nav").classList.toggle("show");
})