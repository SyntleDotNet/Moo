import { useEffect, useRef, useState } from "react";
import { PlayIcon as PlayIconSolid } from "@heroicons/react/24/solid";
import styles from "../src/style/index.module.css";

export type Move = {
    name: string;
    description: string;
    pack: string;
    animFile: string;
};

export function Move(props: { move: Move }) {
    const { move } = props;
    const [open, setOpen] = useState(false);
    const [maxHeight, setMaxHeight] = useState(0);
    const refBase = useRef(null);
    const refExpanded = useRef(null);

    const colours = [
        "text-sky-400",
        "text-yellow-400",
        "text-lime-400",
        "text-red-400",
        "text-violet-400",
        "text-orange-400",
    ];

    useEffect(() => {
        setMaxHeight(open ? 10 + refExpanded.current.clientHeight : 0);
    }, [open]);
    return (
        <a
            href="#"
            className="transition-all duration-200 max-w-2xl bg-white hover:bg-[#37354F] hover:text-white hover:border-[rgba(0,0,0,0)] w-full text-gray-600 mb-2 rounded-lg p-4 border flex flex-col"
            onClick={() => setOpen((o) => !o)}
            style={{ animation: styles.slide, animationDirection: "0.5s" }}
        >
            <div className="flex items-center">
                <PlayIconSolid
                    className={
                        "h-4 w-4 mr-2 transition-all " +
                        (open ? " rotate-90 " : " ") +
                        colours[Math.floor(Math.random() * colours.length)]
                    }
                />
                {move.name}
            </div>
            <div
                className={
                    "transition-all text-left text-sm italic text-gray-400 overflow-hidden origin-top"
                }
                style={{ height: maxHeight }}
            >
                <div className="h-[10px]" ref={refBase}>
                    {" "}
                </div>
                <div className="mt-0" ref={refExpanded}>
                    {move.description}
                </div>
            </div>
        </a>
    );
}
