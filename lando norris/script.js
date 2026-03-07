
document.addEventListener("DOMContentLoaded", function () {
    const loadBtn = document.getElementById("load-btn");
    const splashScreen = document.getElementById("splash-screen");
    const cursor = document.getElementById("custom-cursor");
    const header = document.querySelector("header");
    const heroCutout = document.querySelector(".hero-cutout");
    const marquee = document.querySelector(".marquee-container");

    if (header) header.classList.add("header-hidden");
    if (heroCutout) heroCutout.classList.add("hero-hidden");
    if (marquee) marquee.classList.add("marquee-hidden");

    document.addEventListener("mousemove", (e) => {
        cursor.style.left = `${e.clientX - 10}px`;
        cursor.style.top = `${e.clientY - 10}px`;
    });

    const interactives = document.querySelectorAll("a, button, .hamburger, .helmet-card");
    interactives.forEach(el => {
        el.addEventListener("mouseenter", () => {
            cursor.style.transform = "scale(3)";
            cursor.style.opacity = "0.5";
        });
        el.addEventListener("mouseleave", () => {
            cursor.style.transform = "scale(1)";
            cursor.style.opacity = "1";
        });
    });
    const magneticBtns = document.querySelectorAll('.pill-btn');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0) scale(1)';
        });
    });

    if (loadBtn && splashScreen) {
        loadBtn.addEventListener("click", function () {
            splashScreen.classList.add("splash-hidden");

            setTimeout(() => {
                header.classList.remove("header-hidden");
            }, 500);

            setTimeout(() => {
                heroCutout.classList.remove("hero-hidden");
            }, 800);

            setTimeout(() => {
                marquee.classList.remove("marquee-hidden");
            }, 1000);
        });
    }

    const heroContent = document.getElementById("hero-content");
    const maskFollower = document.getElementById("mask-follower");
    const maskImage = document.getElementById("mask-image");

    if (heroContent && maskFollower && maskImage) {
        heroContent.addEventListener("mousemove", function (e) {
            const rect = heroContent.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const followerX = x - 175;
            const followerY = y - 175;

            maskFollower.style.left = `${followerX}px`;
            maskFollower.style.top = `${followerY}px`;
            maskImage.style.left = `${-followerX}px`;
            maskImage.style.top = `${-followerY}px`;
            maskFollower.style.opacity = 1;
        });

        heroContent.addEventListener("mouseleave", function () {
            maskFollower.style.opacity = 0;
        });
    }

    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");

                const bgNum = entry.target.querySelector(".bg-number");
                if (bgNum) {
                    bgNum.classList.remove("hidden-num");
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll(".fade-element").forEach(el => {

        const bgNum = el.querySelector(".bg-number");
        if (bgNum) bgNum.classList.add("hidden-num");

        observer.observe(el);
    });

    window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset;
        if (header) {
            header.style.backgroundColor = scrolled > 50 ? "rgba(10, 11, 12, 0.95)" : "rgba(10, 11, 12, 0.8)";
        }
    });
});
