import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./TrueFocus.css";

const TrueFocus = ({
                       sentence = "UX/UI back-end project менеджмент front-end аналитика тестирование",
                       manualMode = false,
                       blurAmount = 5,
                       borderColor = "green",
                       glowColor = "rgba(0, 255, 0, 0.6)",
                       animationDuration = 0.5,
                       pauseBetweenAnimations = 1,
                   }) => {
    const words = [];
    const rawWords = sentence.split(" ");

    for (let i = 0; i < rawWords.length; i++) {
        if (rawWords[i] === "project" && rawWords[i + 1] === "менеджмент") {
            words.push({ group: true, content: ["project", "менеджмент"] });
            i++;
        } else {
            words.push({ group: false, content: rawWords[i] }); 
        }
    }

    const [currentIndex, setCurrentIndex] = useState(0);
    const [lastActiveIndex, setLastActiveIndex] = useState(null);
    const containerRef = useRef(null);
    const wordRefs = useRef([]);
    const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

    // Автоматический режим анимации
    useEffect(() => {
        if (!manualMode) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % words.length);
            }, (animationDuration + pauseBetweenAnimations) * 1000);

            return () => clearInterval(interval);
        }
    }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

    useEffect(() => {
        if (currentIndex === null || currentIndex === -1) return;

        if (!wordRefs.current[currentIndex] || !containerRef.current) return;

        const parentRect = containerRef.current.getBoundingClientRect();
        const activeRect = wordRefs.current[currentIndex].getBoundingClientRect();

        setFocusRect({
            x: activeRect.left - parentRect.left,
            y: activeRect.top - parentRect.top,
            width: activeRect.width,
            height: activeRect.height,
        });
    }, [currentIndex, words.length]);

    const handleMouseEnter = (index) => {
        if (manualMode) {
            setLastActiveIndex(index);
            setCurrentIndex(index);
        }
    };

    const handleMouseLeave = () => {
        if (manualMode) {
            setCurrentIndex(lastActiveIndex);
        }
    };

    return (
        <div className="focus-container" ref={containerRef}>
            {words.map((item, index) => {
                const isActive = index === currentIndex;

                if (item.group) {
                    return (
                        <div
                            key={index}
                            ref={(el) => (wordRefs.current[index] = el)}
                            className={`focus-group ${isActive ? "active" : ""}`}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {item.content.map((word, idx) => (
                                <span
                                    key={idx}
                                    className="grouped-word"
                                    data-word={word} 
                                    style={{
                                        filter:
                                            manualMode
                                                ? isActive
                                                    ? `blur(0px)`
                                                    : `blur(${blurAmount}px)`
                                                : isActive
                                                    ? `blur(0px)`
                                                    : `blur(${blurAmount}px)`,
                                        transition: `filter ${animationDuration}s ease`,
                                    }}
                                >
                  {word}
                </span>
                            ))}
                        </div>
                    );
                }

                return (
                    <span
                        key={index}
                        ref={(el) => (wordRefs.current[index] = el)}
                        className={`focus-word ${manualMode ? "manual" : ""} ${isActive && !manualMode ? "active" : ""}`}
                        data-word={item.content}
                        style={{
                            filter:
                                manualMode
                                    ? isActive
                                        ? `blur(0px)`
                                        : `blur(${blurAmount}px)`
                                    : isActive
                                        ? `blur(0px)`
                                        : `blur(${blurAmount}px)`,
                            "--border-color": borderColor,
                            "--glow-color": glowColor,
                            transition: `filter ${animationDuration}s ease`,
                        }}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
            {item.content}
          </span>
                );
            })}

            {/* Анимированная рамка */}
            <motion.div
                className="focus-frame"
                animate={{
                    x: focusRect.x,
                    y: focusRect.y,
                    width: focusRect.width,
                    height: focusRect.height,
                    opacity: currentIndex >= 0 ? 1 : 0,
                }}
                transition={{
                    duration: animationDuration,
                }}
                style={{
                    "--border-color": borderColor,
                    "--glow-color": glowColor,
                }}
            >
                <span className="corner top-left"></span>
                <span className="corner top-right"></span>
                <span className="corner bottom-left"></span>
                <span className="corner bottom-right"></span>
            </motion.div>
        </div>
    );
};

export default TrueFocus;