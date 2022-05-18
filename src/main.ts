/**
 * COPYRIGHT 2022 Phil Bladen www.philbladen.co.uk
 */

import "./style/style.scss";

class Application {
    readonly seizureMode: boolean = false;
    readonly numCharactersPerUpdate = 1;
    private rulesDiv: HTMLElement;
    
    private newTitleWords = ["tones", "cones", "crolls"];
    private newTitleWordIndex = 0;

    private lastBlinkTime = 0;

    private ancientText: string = "The Moo is sick bruh. It is your job to rescue the sacred Moo for the future generations of players. A small fee of 22BTC is required to unlock this quest.";// Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
                                    // "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed tortor id elit lacinia facilisis. Sed volutpat elit a molestie maximus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris eget leo sapien. Nam risus lorem, sodales in viverra ut, faucibus ac ante. Curabitur at lacus dignissim, facilisis odio ut, molestie lectus. Nullam pharetra lorem ac nibh finibus luctus ut ut arcu. Phasellus vitae varius erat. Nulla sit amet efficitur justo."+
                                    // "Donec euismod feugiat ultricies. Nullam ac consequat erat, et aliquet lacus. Cras at maximus massa. Integer ex neque, interdum ut urna eget, tristique semper augue. Etiam elit lorem, interdum eget tincidunt ut, pulvinar eget sapien. Donec sit amet lacus vel sapien consequat sodales. Vivamus feugiat eros sem. Phasellus hendrerit sapien at tortor convallis dapibus. Suspendisse dui elit, bibendum sit amet felis quis, elementum blandit arcu. Nam vitae orci elit."+
                                    // "Pellentesque fringilla eleifend nisi sed egestas. Nam dapibus odio ultricies egestas tempor. Vivamus tempus consectetur mi, quis malesuada neque finibus at. Pellentesque suscipit, sem eu semper venenatis, ipsum sem fermentum massa, a rutrum diam ante eget eros. Donec dapibus sed ex quis viverra. Fusce suscipit nisi pretium ligula luctus, et dapibus ex fermentum. Mauris ut quam diam. Etiam faucibus pellentesque nisi eu vulputate. Quisque luctus, elit id hendrerit efficitur, est purus condimentum orci, sit amet ultricies eros quam at nunc. Morbi cursus pellentesque porta. In in lacus aliquet, volutpat diam vel, placerat lorem."+
                                    // "Nulla facilisi. Ut quis orci eu odio congue dictum non id est. Nunc at orci ac ante venenatis tincidunt. Mauris nisl arcu, ultrices non consectetur nec, gravida quis libero. Donec cursus luctus ex, nec sagittis est dapibus at. Ut et ultricies sapien. Curabitur pretium nisl ut nisi porttitor consequat."+
                                    // "Vestibulum id sapien nunc. Phasellus consectetur condimentum nisl, in elementum eros pharetra vel. Curabitur placerat eu urna ac interdum. Sed at luctus dui. Vivamus dignissim, leo in egestas scelerisque, ipsum felis rutrum ex, id ullamcorper nibh odio in diam. Etiam commodo mauris at neque egestas, vel facilisis massa lacinia. Aenean sodales purus lacus.";

    constructor() {
        this.rulesDiv = document.getElementById("rules");
        this.rulesDiv.innerHTML = "";
        // this.rulesDiv.style.display = "";

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
        
                if (this.seizureMode) {
                    document.body.style.backgroundColor = "rgb(" + (Math.random() * 256) + "," + (Math.random() * 256) + "," + (Math.random() * 256) + ")";
            
                    document.body.scrollTop = Math.random() * (this.rulesDiv.clientHeight + document.body.clientHeight);
                }
                // document.body.scrollTop = 10000;
        }

        let time = Date.now() * 0.001;

        let cow = <HTMLImageElement>document.getElementById("cow");
        cow.style.maxWidth = "400px";
        let scale = (Math.sin(4 * Date.now() / 1000) * 0.1 + 1);
        let angle = (Math.sin(1 * Date.now() / 1000) * 10);
        
        if (cow.matches(":hover")) {
            angle += Date.now() * 0.1;
        }
        cow.style.transform = "rotate(" + angle + "deg) scale(" + scale + ")";

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