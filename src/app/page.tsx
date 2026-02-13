"use client";

import { useState } from 'react';
import styles from './page.module.css';
import confetti from 'canvas-confetti';

export default function Home() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const yesButtonSize = noCount * 20 + 16;

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const handleYesClick = () => {
    setYesPressed(true);
    confetti({
      particleCount: 150,
      spread: 60,
      origin: { y: 0.6 }
    });

    // Continuous confetti
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
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
            <img
              src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
              alt="Bear Kissing"
              className={styles.gif}
            />
            <h1 className={styles.title}>Yay!!! I love you!! ❤️</h1>
          </>
        ) : (
          <>
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

              <button
                className={styles.noButton}
                onClick={handleNoClick}
              >
                {getNoButtonText()}
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
