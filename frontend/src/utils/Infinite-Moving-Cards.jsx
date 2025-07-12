
import { cn } from "./utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "slow",
    pauseOnHover = true,
    className,
    handleClick,
    selectedValue

}) => {
    const containerRef = React.useRef(null);
    const scrollerRef = React.useRef(null);

    useEffect(() => {
        addAnimation();
    }, []);
    const [start, setStart] = useState(false);
    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }
    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty("--animation-direction", "forwards");
            } else {
                containerRef.current.style.setProperty("--animation-direction", "reverse");
            }
        }
    };
    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty("--animation-duration", "20s");
            } else if (speed === "normal") {
                containerRef.current.style.setProperty("--animation-duration", "40s");
            } else {
                containerRef.current.style.setProperty("--animation-duration", "80s");
            }
        }
    };
    return (
        (<div
            ref={containerRef}
            className={cn(
                "scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className
            )}>
            <ul
                ref={scrollerRef}
                className={cn(
                    " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
                    start && "animate-scroll ",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}>
                {items.map((item, idx) => {
                    const isSelected = selectedValue === item.text;

                    return (
                        <li
                            key={item.name}
                            onClick={() => handleClick(item)} // ✅ OnClick
                            className={`w-[180px] flex items-center justify-center mx-auto border rounded-lg shadow-md cursor-pointer transition-transform duration-200 
              ${isSelected ? 'bg-blue-600 scale-105 text-white' : ' hover:scale-105'}`}
                            style={{
                                background: isSelected
                                    ? 'linear-gradient(180deg, #2563eb, #1e40af)'
                                    : 'linear-gradient(180deg, var(--slate-800), var(--slate-900))',
                            }}
                        >
                            <blockquote>
                                <span className="z-20 font-normal text-center ">
                                    {item}
                                </span>
                            </blockquote>
                        </li>
                    );
                })}
            </ul>
        </div>)
    );
};
