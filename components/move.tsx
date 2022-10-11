import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { PlayIcon as PlayIconSolid } from "@heroicons/react/24/solid";
import clsx from "clsx";

export type Move = {
    name: string;
    description: string;
    pack: string;
    animFile: string;
};

export function Move(props: {
    move: Move;
    open: boolean;
    onClick: MouseEventHandler;
    index: number;
}) {
    const { move, open, onClick, index } = props;
    const [maxHeight, setMaxHeight] = useState(0);
    const refBase = useRef(null);
    const refExpanded = useRef(null);

    const colours = {
        basic: "text-sky-400",
        expansion1: "text-yellow-400",
        expansion2: "text-lime-400",
        expansion3: "text-red-400",
        expansion4: "text-violet-400",
        "simple fish rules": "text-orange-400",
    };

    const colour = colours[move.pack];

    useEffect(() => {
        setMaxHeight(open ? 10 + refExpanded.current.clientHeight : 0);
    }, [open, move]);
    return (
        <div
            className={clsx(
                "opacity-0 cursor-pointer transition-all duration-75 max-w-2xl bg-white sm:hover:bg-[#37354F] sm:hover:text-white w-full text-gray-600 mb-2 rounded-lg p-4 flex flex-col animate-[slide_0.2s_ease-in-out_forwards]",
                open && "!bg-[#37354F] !text-white"
            )}
            onClick={onClick}
            style={{ animationDelay: `${index * 0.02}s` }}
        >
            <div className="flex items-center">
                <PlayIconSolid
                    className={
                        "h-4 w-4 mr-2 transition-all " +
                        (open ? " rotate-90 " : " ") +
                        colour
                    }
                />
                <div className="text-lg text-left">{move.name}</div>
                <div className="text-sm text-gray-300 pl-2 pt-[2px]">
                    {"(" + move.pack + ")"}
                </div>
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
        </div>
    );
}
