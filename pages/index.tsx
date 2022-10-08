import Head from "next/head";
import {
    PlayIcon,
    ExclamationTriangleIcon,
    BookOpenIcon,
    HomeIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import {
    ChangeEvent,
    ChangeEventHandler,
    MouseEventHandler,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from "react";
import styles from "../src/style/index.module.css";
import { Move } from "Moo/components/move";

export default function Main() {
    const [page, setPage] = useState(0);
    const pageIntro = <PageIntro />;
    const pageMoves = <PageMoves />;

    return (
        <>
            <div className="absolute text-center text-white font-readex-pro flex flex-col w-full h-[calc(100vh-4.7em)] bg-[#1b1a27] overflow-hidden">
                <Head>
                    <title>Moo Rules</title>
                    <meta
                        name="viewport"
                        content="initial-scale=1.0, width=device-width"
                    />
                </Head>
                {page === 0 ? pageIntro : pageMoves}
            </div>
            <Footer page={page} setPage={setPage} />
        </>
    );
}

function PageIntro() {
    return (
        <>
            <div className="font-roboto pt-4">
                Don't you get it, Brian? I am VGHS.
            </div>
            <div className="font-roboto font-normal text-7xl grow justify-center flex flex-col xl:flex-row xl:items-center xl:justify-center">
                <div>Welcome, to</div>
                <svg
                    height="1.5em"
                    viewBox="0 0 308 82"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xmlSpace="preserve"
                    className={styles.mootext + " xl:!pt-0 xl:!pl-6"}
                >
                    <g transform="matrix(1,0,0,1,-191.334,-702.833)">
                        <path d="M214,707C210.644,708.678 185.995,783.542 199.525,779.575C209.115,776.764 236.893,697.618 252,712C265.376,724.734 235,770 235,770C235,770 279.958,730.204 280.283,735.16C280.452,737.734 265.026,767.294 284,768C302.445,768.687 325.277,742.952 331,737C336.723,731.048 348.603,714.672 357.728,713.268C366.853,711.864 374,715 374,715C374,715 347.339,702.054 337,737C329.77,761.437 339.697,766.76 345,767C356.55,767.523 361.495,752.077 361.601,743C361.708,733.923 359,727 359,727C359,727 360.986,733.625 386,733C411.014,732.375 417.279,730.728 417.279,730.728C422.3,716.034 437.397,709.562 453,715C453,715 427.333,705.123 416,735C407.079,758.517 416.234,766.212 422,767C433.615,768.588 439.416,751.993 440.774,744.245C443.119,730.858 438,728 438,728C438,728 445.049,735.412 466.981,734.34C487.025,733.36 495,730 495,730" />
                    </g>
                </svg>
            </div>
        </>
    );
}

function PageMoves() {
    const [allMoves, setAllMoves] = useState<Move[]>(undefined);
    const [filteredMoves, setFilteredMoves] = useState<Move[]>(undefined);
    const onSearchUpdate = (changeEvent?: any) => {
        let s = changeEvent?.target.value.toLocaleLowerCase();
        setFilteredMoves(() => {
            return allMoves.filter(
                (a) =>
                    !changeEvent || a.name.toLocaleLowerCase().indexOf(s) != -1
            );
        });
    };
    useEffect(() => {
        fetch("/moves.json")
            .then((r) => r.json())
            .then((data: Move[]) => {
                setAllMoves(data);
                setFilteredMoves(data);
            });
    }, []);

    return (
        <div className="w-full flex flex-col h-[calc(100vh-8em)]">
            <div className="flex flex-col p-2 items-center">
                <Search onSearchUpdate={onSearchUpdate} />
            </div>
            <div className="flex flex-col p-2 items-center grow overflow-y-scroll">
                {filteredMoves?.map((m: Move, index: number) => (
                    <Move key={index} move={m} />
                ))}
            </div>
        </div>
    );
}

function Search(props: { onSearchUpdate: (changeEvent) => void }) {
    const iconSize = "w-6 h-6";
    const ref = useRef(null);

    return (
        <div className="relative group flex flex-row items-center justify-center transition-all duration-200 max-w-2xl w-full pt-2">
            <input
                ref={ref}
                onChange={props.onSearchUpdate}
                className="peer border-none outline-none rounded-md w-full max-w-lg text-black p-2 text-center"
            />
            <MagnifyingGlassIcon
                className={
                    iconSize +
                    " absolute group-hover:mr-[550px] peer-focus:mr-[550px] peer-focus:text-white text-[#37354F] group-hover:text-white transform-all duration-500" +
                    (ref.current?.value.length > 0
                        ? " !mr-[550px] !text-white"
                        : "")
                }
            />
        </div>
    );
}

function FooterButton(props: {
    icon: ReactNode;
    label: string;
    selected?: boolean;
    clickHandler?: MouseEventHandler;
}) {
    const { icon, label, selected = false, clickHandler } = props;

    return (
        <div
            className={
                "xs:text-sm text-xs transition-colors duration-400 p-2 grow items-center flex flex-col cursor-pointer " +
                (!selected ? " bg-white text-[#1b1a27]" : "")
            }
            onClick={clickHandler}
        >
            {icon}
            <div className="">{label}</div>
        </div>
    );
}

function Footer(props: { page: number; setPage: (page: number) => void }) {
    const { page, setPage } = props;
    const iconSize = "w-6 h-6";

    return (
        <div className="bg-[#1b1a27] text-slate-300 fixed bottom-0 w-full flex justify-center">
            <div className="flex overflow-hidden grow">
                <FooterButton
                    selected={page == 0}
                    icon={<HomeIcon className={iconSize} />}
                    label="Home"
                    clickHandler={() => setPage(0)}
                />
                <FooterButton
                    selected={page == 1}
                    icon={<PlayIcon className={iconSize} />}
                    label="Gameplay"
                    clickHandler={() => setPage(1)}
                />
                <FooterButton
                    selected={page == 2}
                    icon={<BookOpenIcon className={iconSize} />}
                    label="Moves"
                    clickHandler={() => setPage(2)}
                />
                <FooterButton
                    selected={page == 3}
                    icon={<ExclamationTriangleIcon className={iconSize} />}
                    label="Violations"
                    clickHandler={() => setPage(3)}
                />
            </div>
        </div>
    );
}
