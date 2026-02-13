"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import confetti from "canvas-confetti";

export default function Home() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const yesButtonSize = noCount * 20 + 16;

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNextImage = () => {
    setActiveIndex((prev) => (prev + 1) % 4);
  };

  // Hydration-safe mobile check
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 600);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getMobileStyle = (index: number, baseRotation: number) => {
    if (!isMobile) return {}; // Return empty to let CSS/desktop styles take over

    const isActive = index === activeIndex;
    return {
      zIndex: isActive ? 40 : 10 - index, // Simplified stack logic
      transform: `rotate(${baseRotation}deg) scale(${isActive ? 1 : 0.9}) translateY(${isActive ? 0 : index * 5}px)`,
      opacity: isActive ? 1 : 0.8,
    };
  };

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const handleYesClick = () => {
    setYesPressed(true);
    confetti({
      particleCount: 150,
      spread: 60,
      origin: { y: 0.6 },
    });

    // Continuous confetti
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "Really sure? 🥺",
      "Think again! 🤔",
      "Last chance! 😭",
      "Surely not? 💔",
      "You might regret this! 😖",
      "Give it another thought! 🙏",
      "Are you absolutely certain? 🤨",
      "This could be a mistake! 😬",
      "Have a heart! ❤️",
      "Don't be so cold! 🥶",
      "Change of heart? 🔁",
      "Wouldn't you reconsider? 🥺",
      "Is that your final answer? ❓",
      "You're breaking my heart ;(",
      "Is that your final answer? 😭",
      "You are breaking my heart 💔",
      "Plsss? 🥺",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {yesPressed ? (
          <>
            <div className={styles.gallery}>
              <div
                className={`${styles.interactiveItem} ${styles.galleryItemLeft}`}
                style={getMobileStyle(0, -18)}
              >
                <Image
                  src="/us.jpg"
                  alt="Us 1"
                  width={200}
                  height={267}
                  style={{
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    objectFit: "cover",
                    border: "5px solid white",
                  }}
                />
              </div>
              <div
                className={`${styles.interactiveItem} ${styles.galleryItemCenter}`}
                style={getMobileStyle(1, -6)}
              >
                <video
                  src="/IMG_9284.MOV"
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: "200px",
                    height: "267px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    objectFit: "cover",
                    border: "5px solid white",
                  }}
                />
              </div>
              <div
                className={`${styles.interactiveItem} ${styles.galleryItemRight}`}
                style={getMobileStyle(2, 6)}
              >
                <Image
                  src="/us_final_2.jpg"
                  alt="Us 2"
                  width={200}
                  height={267}
                  style={{
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    objectFit: "cover",
                    border: "5px solid white",
                  }}
                />
              </div>
              <div
                className={`${styles.interactiveItem} ${styles.galleryItemExtra}`}
                style={getMobileStyle(3, 18)}
              >
                <Image
                  src="/us3.jpg"
                  alt="Us 4"
                  width={200}
                  height={267}
                  style={{
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    objectFit: "cover",
                    border: "5px solid white",
                  }}
                />
              </div>
            </div>

            <button className={styles.mobileButton} onClick={handleNextImage}>
              Next photo
            </button>
            <h1 className={styles.title}>I knew you would say yes! 💗</h1>
          </>
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://media.tenor.com/VIChDQ6ejRQAAAAi/jumping-bear-hearts-no-png.gif"
              alt="Cute bear asking"
              className={styles.gif}
            />

            <h1 className={styles.title}>Will you be my Valentine?</h1>

            <div className={styles.buttons}>
              <button
                className={styles.yesButton}
                style={{ fontSize: yesButtonSize }}
                onClick={handleYesClick}
              >
                Yes
              </button>

              <button className={styles.noButton} onClick={handleNoClick}>
                {getNoButtonText()}
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
