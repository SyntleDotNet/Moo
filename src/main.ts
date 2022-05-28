/**
 * COPYRIGHT 2022 Phil Bladen www.philbladen.co.uk
 */

import "./style/style.scss";

class Application {
    private seizureMode: boolean = false;
    readonly numCharactersPerUpdate = 1;
    private rulesDiv: HTMLElement;
    
    private newTitleWords = ["tones", "cones", "crolls"];
    private newTitleWordIndex = 0;

    private lastBlinkTime = 0;

    private cowScale = 1;

    readonly moo_gameName = "<p style='display: inline;'><b>Moo</b></p>";
    readonly moo_concept = "<p style='display: inline;'><i>moo</i></p>";
    readonly moo_moove = "<p style='display: inline; color: #8ac926'>moo</p>";

    private setupText = "The game of " + this.moo_gameName + " is a gentleperson's game, played only by gentlepeople. " + 
                        "By agreeing to play, you take on the burden of gentlepersonhood: be honest and generous, and play for fun above all else. " +
                        "<br>In the game of " + this.moo_gameName + ", there is an imaginary " + this.moo_concept + " that moves around the circle of players. " + 
                        "You can pass the " + this.moo_concept + " using different mooves to send it different distances in different directions. " + 
                        "<br>To play, all players should sit in a loose circle, where it's clear who is to the left and right of who. ";

    private playingTheGame = "As this is a gentlepersons's game, play cannot be started unless a player is invited to start by a fellow player. " + 
                        "The first player must use the " + this.moo_moove + " moove to begin play. " +
                        "From there, players utilise the mooves listed below to pass the " + this.moo_concept + " around the circle until a violation is committed. " +
                        "<br>Upon spotting a violation, any and all players may accuse the offending player of that specific violation (bear in mind the standards of gentlepersonhood). " +
                        "If players agree a violation was committed, the offending player is awarded a point (points are bad), and a new round is started by inviting a player to start. " + 
                        "<br>Whenever one player reaches 5 points, the game ends and the player(s) with the fewest points wins. " + 
                        this.moo_gameName + " may be won by more than one player, however tie-breaker rules are included below for the benefit of hyper-competitive gentlepeople.";

    private rules: string[][] = [
        ["Moo", "Passes the moo one"],
    ];


    private violations: string[][] = [
        ["Hesitation", "A player hesitates for an unreasonable amount of time."],
        ["Acting out of Sequence", "A player makes a moove when it is not their turn to do so."],
        ["Fictional Moove", "A player uses a moove that doesn't exist."],
        ["Mismatching", "A player's hand gesture does not match the moove named."],
        ["Illegal Moove", "Certain mooves are banned or enforced at certain times; explained within their rule text."],
    ];

    private ancientText: string = "The Moo is sick bruh. It is your job to rescue the sacred Moo for the future generations of players. A small fee of 22BTC is required to unlock this quest. "+
                                    "If you live at the poor store and are not able to afford this transaction, we may accept a deposit of one medium egg instead. You must hurry, for the mother moo is already dwindling!";// Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
                                    // "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed tortor id elit lacinia facilisis. Sed volutpat elit a molestie maximus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris eget leo sapien. Nam risus lorem, sodales in viverra ut, faucibus ac ante. Curabitur at lacus dignissim, facilisis odio ut, molestie lectus. Nullam pharetra lorem ac nibh finibus luctus ut ut arcu. Phasellus vitae varius erat. Nulla sit amet efficitur justo."+
                                    // "Donec euismod feugiat ultricies. Nullam ac consequat erat, et aliquet lacus. Cras at maximus massa. Integer ex neque, interdum ut urna eget, tristique semper augue. Etiam elit lorem, interdum eget tincidunt ut, pulvinar eget sapien. Donec sit amet lacus vel sapien consequat sodales. Vivamus feugiat eros sem. Phasellus hendrerit sapien at tortor convallis dapibus. Suspendisse dui elit, bibendum sit amet felis quis, elementum blandit arcu. Nam vitae orci elit."+
                                    // "Pellentesque fringilla eleifend nisi sed egestas. Nam dapibus odio ultricies egestas tempor. Vivamus tempus consectetur mi, quis malesuada neque finibus at. Pellentesque suscipit, sem eu semper venenatis, ipsum sem fermentum massa, a rutrum diam ante eget eros. Donec dapibus sed ex quis viverra. Fusce suscipit nisi pretium ligula luctus, et dapibus ex fermentum. Mauris ut quam diam. Etiam faucibus pellentesque nisi eu vulputate. Quisque luctus, elit id hendrerit efficitur, est purus condimentum orci, sit amet ultricies eros quam at nunc. Morbi cursus pellentesque porta. In in lacus aliquet, volutpat diam vel, placerat lorem."+
                                    // "Nulla facilisi. Ut quis orci eu odio congue dictum non id est. Nunc at orci ac ante venenatis tincidunt. Mauris nisl arcu, ultrices non consectetur nec, gravida quis libero. Donec cursus luctus ex, nec sagittis est dapibus at. Ut et ultricies sapien. Curabitur pretium nisl ut nisi porttitor consequat."+
                                    // "Vestibulum id sapien nunc. Phasellus consectetur condimentum nisl, in elementum eros pharetra vel. Curabitur placerat eu urna ac interdum. Sed at luctus dui. Vivamus dignissim, leo in egestas scelerisque, ipsum felis rutrum ex, id ullamcorper nibh odio in diam. Etiam commodo mauris at neque egestas, vel facilisis massa lacinia. Aenean sodales purus lacus.";

    constructor() {
        this.rulesDiv = document.getElementById("rules");
        this.rulesDiv.innerHTML = "";
        // this.rulesDiv.style.display = "";

        this.seizureMode = this.getParam("seizureMode") != undefined;

        document.getElementById("introContent").innerHTML = this.setupText;
        document.getElementById("playingTheGameContent").innerHTML = this.playingTheGame;

        let violationContent = document.getElementById("violationsContent");
        let violationTemplate = document.getElementById("violationTemplate");
        for (let violation of this.violations) {
            let newViolation = <HTMLElement>violationTemplate.cloneNode(true);
            newViolation.style.display = "";
            newViolation.getElementsByTagName("td")[0].innerHTML = "<b>" + violation[0] + "</b>";
            newViolation.getElementsByTagName("td")[1].innerHTML = violation[1];
            violationTemplate.parentNode.appendChild(newViolation);
        }

        window.requestAnimationFrame(() => this.updateRulesText());

        let changeWord = () => {
            let title = document.getElementById("title");
            let numRemoved = 0;

            let newWord = this.newTitleWords[this.newTitleWordIndex++];
            this.newTitleWordIndex %= this.newTitleWords.length;

            let addChar = () => {
                title.innerHTML += newWord.at(0);
                newWord = newWord.substring(1);

                numRemoved--;
                if (numRemoved > 0 && newWord.length > 0) {
                    setTimeout(addChar, 50);        
                }
                else {
                    
                }
            }

            let removeChar = () => {
                let letterToRemove = title.innerHTML.at(title.innerHTML.length - 1);
                numRemoved++;
                if (letterToRemove !== "S") {
                    title.innerHTML = title.innerHTML.substring(0, title.innerHTML.length - 1);
                    setTimeout(removeChar, 50);        
                }
                else {
                    setTimeout(addChar, 50);        
                }
            }

            setTimeout(removeChar, 50);
        };

        setInterval(changeWord, 10000);

        // let cow = <HTMLObjectElement>document.getElementById("cow");
        // // cow.addEventListener("click", () => {

        // let clickTime = 0;
        // document.getElementById("cowClickBox").addEventListener("mousedown", () => {
        //     cow.data = "iconhyp.svg";

        //     cow.onload = () => {
        //         // let eye = <SVGGraphicsElement><any>cow.contentDocument.getElementById("Eye");

        //         // let b = eye.getBBox();

        //         // let rotateX = b.x + b.width * 0.5;
        //         // let rotateY = b.y + b.height * 0.5;

        //         // let t = cow.contentDocument.getElementById("Eye2");
        //         // console.log(t);

        //         // setInterval(() => t.setAttribute("transform", "rotate(" + ((Date.now() * 0.1) % 360) + "," + rotateX + "," + rotateY + ")"), 16);

        //         clickTime = Date.now() * 0.001;

        //         setInterval(() => {
        //             let angle = (Date.now() * 0.1) % 360;
        //             this.rotateSVGElementAboutCenter("EyeL", angle);
        //             angle *= -2;
        //             this.rotateSVGElementAboutCenter("EyeR", angle);

        //             let time = Date.now() * 0.001;
        //             let timeSinceClick = time - clickTime;

        //             if (timeSinceClick > Math.PI / 2) {
        //                 timeSinceClick = Math.PI / 2;
        //             }
        //             this.cowScale = 1 + 3 * Math.sin(timeSinceClick);
        //             // cow.style.transform = "scale(" + scale + ")";
        //         }, 16);
        //         // setInterval(() => this.rotateSVGElementAboutCenter("EyeR", angle), 16);
        //     }

        // });

        if (this.seizureMode) {
            document.body.style.background = "unset";
        }

        setTimeout(() => {
            document.getElementById("loader").style.opacity = "0";
            setTimeout(() => {
                document.getElementById("loader").style.display = "none";
            }, 1500);
        }, 500);
    }

    rotateSVGElementAboutCenter(nameOfElement: string, angle: number) {
        let cow = <HTMLObjectElement>document.getElementById("cow");
        let element = <SVGGraphicsElement><any>cow.contentDocument.getElementById(nameOfElement);

        let b = element.getBBox();

        let rotateX = b.x + b.width * 0.5;
        let rotateY = b.y + b.height * 0.5;

        element.setAttribute("transform", "rotate(" + angle + "," + rotateX + "," + rotateY + ")");
    }

    getParam(key: string): string {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(key);
    }

    updateRulesText() {
        if (this.ancientText.length != 0) {
            for (let i = 0; i < 10; i++) {
                let d2 = document.createElement("div");
                // d2.style.display = "inline";
                // d2.style.position = "relative";
        
                let d = document.createElement("div");
                d.style.display = "flex";
                // d.style.fle
                d.style.fontSize = (10 + (Math.random() * 150) >> 1) + "px";
                d.style.color = "rgb(" + (Math.random() * 256) + "," + (Math.random() * 256) + "," + (Math.random() * 256) + ")";
                d.style.transform = "rotate(" + (Math.random() * 90 - 45) + "deg) translate(0px, " + (Math.random() * 50 - 25) + "px)"
                // d.style.maxWidth = d.style.minWidth = "10px";
                // d2.style.overflow = "hidden"
                // d.style.margin = "0px";
                // d.style.flex = "1 1 0px";
        
                d2.appendChild(d);
        
                d.innerHTML = this.ancientText.substring(0, this.numCharactersPerUpdate);
                this.ancientText = this.ancientText.substring(this.numCharactersPerUpdate);
        
                this.rulesDiv.appendChild(d2);
            }
        

                // document.body.scrollTop = 10000;
        }

        if (this.seizureMode) {
                    
            document.body.style.backgroundColor = "rgb(" + (Math.random() * 256) + "," + (Math.random() * 256) + "," + (Math.random() * 256) + ")";
    
            document.body.style.paddingTop = (Math.random()) * 15 + "px";// * (this.rulesDiv.clientHeight + document.body.clientHeight);
        }

        let time = Date.now() * 0.001;

        // let cow = <HTMLImageElement>document.getElementById("cow");
        // // cow.style.maxWidth = "400px";
        // let scale = (Math.sin(4 * time) * 0.1 + 1);
        // let angle = (Math.sin(1 * time) * 10);
        
        // // if (cow.matches(":hover")) {
        // //     angle += Date.now() * 0.1;
        // // }
        // cow.style.transform = "rotate(" + angle + "deg) scale(" + scale * this.cowScale + ")";

        let title = document.getElementById("title");
        if (time - this.lastBlinkTime > 0.5) {
            this.lastBlinkTime = time;

            if (title.classList.contains("cursor")) {
                title.classList.remove("cursor");
            }
            else {
                title.classList.add("cursor");
            }

            // title.innerHTML = title.innerHTML.substring(0, title.innerHTML.length - 1);
        }

        window.requestAnimationFrame(() => this.updateRulesText());
    }
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}

document.addEventListener("DOMContentLoaded", () => setTimeout(() => new Application(), 0));