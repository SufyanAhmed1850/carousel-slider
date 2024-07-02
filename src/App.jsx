import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import "./App.css";

import Image1 from "./assets/img1.jpg";
import Image2 from "./assets/img2.jpg";
import Image3 from "./assets/img3.jpg";
import Image4 from "./assets/img4.jpg";
import Image5 from "./assets/img5.jpg";
import Image6 from "./assets/img6.jpg";
import Image7 from "./assets/img7.jpg";
import Image8 from "./assets/img8.jpg";

const images = [Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8];
const totalSlides = images.length - 1;

const App = () => {
    const [currentIndex, setCurrentIndex] = useState(1);

    const updateActiveSlide = (index) => {
        const titles = document.querySelectorAll(".title");
        titles.forEach((el, i) => {
            if (i === index) {
                el.classList.add("active");
            } else {
                el.classList.remove("active");
            }
        });
    };

    const updateImages = (imgNumber) => {
        const imgSrc = images[imgNumber];
        const imgTop = document.createElement("img");
        const imgBottom = document.createElement("img");
        imgTop.src = imgSrc;
        imgBottom.src = imgSrc;

        imgTop.style.position = "absolute";
        imgBottom.style.position = "absolute";

        document.querySelector(".img-top").appendChild(imgTop);
        document.querySelector(".img-bottom").appendChild(imgBottom);

        const tl = gsap.timeline();

        tl.fromTo(
            imgTop,
            {
                clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
                transform: "scale(2)",
                x: 200, // Starting x position
            },
            {
                clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
                transform: "scale(1)",
                x: 0, // Final x position
                duration: 2,
                ease: "power4.out",
            },
        );

        tl.fromTo(
            imgBottom,
            {
                clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
                transform: "scale(2)",
                x: 400, // Starting x position
            },
            {
                clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
                transform: "scale(1)",
                x: 0, // Final x position
                duration: 2,
                ease: "power4.out",
            },
            "-=1.75", // Staggered start, imgBottom starts 1.5 seconds after imgTop
        );

        tl.call(trimExcessImages);
    };

    const trimExcessImages = () => {
        const selectors = [".img-top", ".img-bottom"];
        selectors.forEach((selector) => {
            const container = document.querySelector(selector);
            const images = Array.from(container.querySelectorAll("img"));
            const excessCount = images.length - 5;
            if (excessCount > 0) {
                images
                    .slice(0, excessCount)
                    .forEach((image) => container.removeChild(image));
            }
        });
    };

    const handleSlider = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex < totalSlides ? prevIndex + 1 : 1;

            setTimeout(() => {
                updateActiveSlide(newIndex);
            }, 100);
            updateImages(newIndex);

            gsap.to(".slide-titles", {
                x: `-${(newIndex - 1) * 11.1111}%`,
                duration: 2,
                ease: "power4.out",
            });

            return newIndex; // Return the new index correctly
        });
    };

    useEffect(() => {
        const interval = setInterval(handleSlider, 5000);
        updateImages(1); // Initial image index for img1.jpg
        updateActiveSlide(1); // Initially set the title "Neo Forge Towers" as active
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="App">
            <nav>
                <a href="#">Codegrid</a>
                <p>Unlock Source Code with PRO</p>
            </nav>
            <footer>
                <div className="links">
                    <a href="#">Subscribe</a>
                    <a href="#">Instagram</a>
                    <a href="#">Twitter</a>
                </div>
                <p>Link in description</p>
            </footer>
            <div className="slider">
                <div className="slide-titles">
                    <div className="title">
                        <h1>Neo Forge Towers</h1>
                    </div>
                    <div className="title">
                        <h1>Arcadian Complex</h1>
                    </div>
                    <div className="title">
                        <h1>Shadowline Spire</h1>
                    </div>
                    <div className="title">
                        <h1>Echo Nexus Habitat</h1>
                    </div>
                    <div className="title">
                        <h1>Cascade Enclave</h1>
                    </div>
                    <div className="title">
                        <h1>Prism Sector</h1>
                    </div>
                    <div className="title">
                        <h1>Iron Eden Colony</h1>
                    </div>
                    <div className="title">
                        <h1>Axiom Horn Towers</h1>
                    </div>
                    <div className="title">
                        <h1>Sky Apartment Complex</h1>
                    </div>
                </div>
                <div className="slide-images">
                    <div className="img-top"></div>
                    <div className="img-bottom"></div>
                </div>
            </div>
        </div>
    );
};

export default App;
