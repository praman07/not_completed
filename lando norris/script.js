// script.js - Premium Lando Norris Experience

document.addEventListener("DOMContentLoaded", function () {
    // 1. Initial GSAP Setup
    gsap.registerPlugin();

    const loadBtn = document.getElementById("load-btn");
    const splashScreen = document.getElementById("splash-screen");
    const cursor = document.getElementById("custom-cursor");

    // 2. Custom Cursor Logic
    document.addEventListener("mousemove", (e) => {
        gsap.to(cursor, {
            x: e.clientX - 10,
            y: e.clientY - 10,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    // Expand cursor on interactive elements
    const interactives = document.querySelectorAll("a, button, .hamburger, .helmet-card");
    interactives.forEach(el => {
        el.addEventListener("mouseenter", () => {
            gsap.to(cursor, { scale: 3, opacity: 0.5, duration: 0.3 });
        });
        el.addEventListener("mouseleave", () => {
            gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
        });
    });

    // 3. Splash Screen Entrance
    if (loadBtn && splashScreen) {
        loadBtn.addEventListener("click", function () {
            const tl = gsap.timeline();

            tl.to(splashScreen, {
                y: "-100%",
                duration: 1.2,
                ease: "expo.inOut"
            })
                .from("header", {
                    y: -100,
                    opacity: 0,
                    duration: 1,
                    ease: "power4.out"
                }, "-=0.5")
                .from(".hero-cutout", {
                    y: 100,
                    opacity: 0,
                    duration: 1.5,
                    ease: "power4.out"
                }, "-=0.8")
                .from(".marquee-container", {
                    opacity: 0,
                    x: 100,
                    duration: 2,
                    ease: "power2.out"
                }, "-=1");
        });
    }

    // 4. Hero Section Face Mask Effect
    const heroContent = document.getElementById("hero-content");
    const maskFollower = document.getElementById("mask-follower");
    const maskImage = document.getElementById("mask-image");

    if (heroContent && maskFollower && maskImage) {
        heroContent.addEventListener("mousemove", function (e) {
            const rect = heroContent.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Positioning for 350x350 follower
            const followerX = x - 175;
            const followerY = y - 175;

            // Smoothing the follower movement
            gsap.to(maskFollower, {
                left: followerX,
                top: followerY,
                duration: 0.2,
                ease: "power1.out"
            });

            gsap.to(maskImage, {
                left: -followerX,
                top: -followerY,
                duration: 0.2,
                ease: "power1.out"
            });

            maskFollower.style.opacity = 1;
        });

        heroContent.addEventListener("mouseleave", function () {
            gsap.to(maskFollower, { opacity: 0, duration: 0.5 });
        });
    }

    // 5. Scroll Reveal Logic using Intersection Observer
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");

                // Animate background number if present
                const bgNum = entry.target.querySelector(".bg-number");
                if (bgNum) {
                    gsap.from(bgNum, {
                        x: -50,
                        opacity: 0,
                        duration: 1.5,
                        ease: "power2.out"
                    });
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll(".fade-element").forEach(el => {
        observer.observe(el);
    });

    // 6. Header Tilt Effect on Scroll
    window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset;
        gsap.to("header", {
            backgroundColor: scrolled > 50 ? "rgba(10, 11, 12, 0.95)" : "rgba(10, 11, 12, 0.8)",
            duration: 0.3
        });
    });
});
