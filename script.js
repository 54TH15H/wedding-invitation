/* =========================================================
   OPEN INVITATION
========================================================= */

const introScreen = document.getElementById("introScreen");
const openInvitation = document.getElementById("openInvitation");
const mainWebsite = document.getElementById("mainWebsite");

const music = document.getElementById("weddingMusic");
const musicButton = document.getElementById("musicButton");

document.body.classList.add("locked");

openInvitation.addEventListener("click", () => {

    introScreen.classList.add("hide");

    document.body.classList.remove("locked");

    music.play()
        .then(() => {
            musicButton.classList.add("playing");
        })
        .catch(() => {
            console.log("Music autoplay was blocked.");
        });

});


/* =========================================================
   MUSIC CONTROL
========================================================= */

musicButton.addEventListener("click", () => {

    if (music.paused) {

        music.play();

        musicButton.classList.add("playing");

    } else {

        music.pause();

        musicButton.classList.remove("playing");

    }

});


/* =========================================================
   COUNTDOWN
========================================================= */

/*
   Change this date to your actual wedding date.

   Format:

   YYYY-MM-DDTHH:MM:SS

*/

const weddingDate =
    new Date("2026-12-25T09:30:00").getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const difference = weddingDate - now;


    if (difference <= 0) {

        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";

        return;
    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference /
            (1000 * 60 * 60)) % 24
        );


    const minutes =
        Math.floor(
            (difference /
            (1000 * 60)) % 60
        );


    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );


    document.getElementById("days").innerText =
        String(days).padStart(2, "0");


    document.getElementById("hours").innerText =
        String(hours).padStart(2, "0");


    document.getElementById("minutes").innerText =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds").innerText =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================================================
   GALLERY LIGHTBOX
========================================================= */

const galleryItems =
    document.querySelectorAll(".gallery-item img");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const closeLightbox =
    document.getElementById("closeLightbox");


galleryItems.forEach(image => {

    image.addEventListener("click", () => {

        lightboxImage.src = image.src;

        lightbox.classList.add("active");

        document.body.classList.add("locked");

    });

});


closeLightbox.addEventListener("click", closeGallery);


lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {

        closeGallery();

    }

});


function closeGallery() {

    lightbox.classList.remove("active");

    document.body.classList.remove("locked");

}


/* =========================================================
   ESCAPE KEY FOR GALLERY
========================================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeGallery();

    }

});


/* =========================================================
   REVEAL ANIMATION
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".story-grid, .event-card, .gallery-item, .family"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(element => {

    observer.observe(element);

});


/* =========================================================
   PETAL EFFECT
========================================================= */

const petalsContainer =
    document.querySelector(".floating-petals");


function createPetal() {

    if (!petalsContainer) return;

    const petal =
        document.createElement("span");

    petal.innerHTML = "✦";

    petal.style.position = "absolute";

    petal.style.left =
        Math.random() * 100 + "%";

    petal.style.top = "-20px";

    petal.style.fontSize =
        Math.random() * 10 + 7 + "px";

    petal.style.opacity =
        Math.random() * .5 + .2;

    petal.style.animation =
        `fall ${Math.random() * 5 + 5}s linear`;

    petalsContainer.appendChild(petal);


    setTimeout(() => {

        petal.remove();

    }, 10000);

}


setInterval(createPetal, 500);


/* =========================================================
   PETAL ANIMATION
========================================================= */

const petalStyle =
document.createElement("style");

petalStyle.innerHTML = `

@keyframes fall {

    0% {

        transform:
            translateY(0)
            rotate(0deg);

    }

    100% {

        transform:
            translateY(100vh)
            rotate(360deg);

    }

}

`;

document.head.appendChild(petalStyle);


/* =========================================================
   WHATSAPP SHARE
========================================================= */

function shareWedding() {

    const message =
        "You're invited to the wedding of Sathish & Lakshmi ❤️";

    const url =
        "https://wa.me/?text=" +
        encodeURIComponent(message);

    window.open(url, "_blank");

}
