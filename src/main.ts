/**
 * COPYRIGHT 2022 Phil Bladen www.philbladen.co.uk
 */

import "./style/style.scss";

class Application {
    private readonly moo_gameName = "<p style='display: inline;'><b>Moo</b></p>";
    private readonly moo_concept = "<p style='display: inline;color: #c8b6ff'>moo</p>";
    private readonly moo_moove = "<p style='display: inline; color: #8ac926'>moo</p>";

    private readonly introText: string[][] = [
        ["The Game of Moo", "<br>The <b>Game of " + this.moo_gameName + "</b> is a gentleperson's game, played only by gentlepeople. " +
            "By agreeing to play, you take on the burden of gentlepersonhood: be honest and generous, and play for fun above all else. "],
        ["The Concept", "<br>In the game of " + this.moo_gameName + ", there is an imaginary " + this.moo_concept + " that moves around the circle of players. " +
            "You can pass the " + this.moo_concept + " using different mooves to send it different distances in different directions. "],
        ["The Setup", "<br>To play, all players should sit in a loose circle, where it's clear who is to the left and right of who. As this is a gentlepersons's game, play cannot be started unless a player is invited to start by a fellow player. "],
        ["The Game", "<br>The first player must use the " + this.moo_moove + " moove to begin play. " +
            "From there, players utilise the mooves listed below to pass the " + this.moo_concept + " around the circle until a violation is committed. "],
        ["The Points",  "<br>Upon spotting a violation, any and all players may accuse the offending player of that specific violation (bear in mind the standards of gentlepersonhood). " +
        "If players agree a violation was committed, the offending player is awarded a point (points are bad), and a new round is started by inviting a player to start. "],
        ["The End",  "<br>Whenever one player reaches 5 points, the game ends and the player(s) with the fewest points wins. " + 
        this.moo_gameName + " may be won by more than one player, however tie-breaker rules are included below for the benefit of hyper-competitive gentlepeople."],
    ];

    private readonly concept = "<br>To play, all players should sit in a loose circle, where it's clear who is to the left and right of who. ";

    private readonly playingTheGame = "As this is a gentlepersons's game, play cannot be started unless a player is invited to start by a fellow player. " + 
                        "The first player must use the " + this.moo_moove + " moove to begin play. " +
                        "From there, players utilise the mooves listed below to pass the " + this.moo_concept + " around the circle until a violation is committed. " +
                        "<br>Upon spotting a violation, any and all players may accuse the offending player of that specific violation (bear in mind the standards of gentlepersonhood). " +
                        "If players agree a violation was committed, the offending player is awarded a point (points are bad), and a new round is started by inviting a player to start. " + 
                        "<br>Whenever one player reaches 5 points, the game ends and the player(s) with the fewest points wins. " + 
                        this.moo_gameName + " may be won by more than one player, however tie-breaker rules are included below for the benefit of hyper-competitive gentlepeople.";
    
    private readonly rules: string[][] = [
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
                                    "If you live at the poor store and are not able to afford this transaction, we may accept a deposit of one medium egg instead. You must hurry, for the mother moo is already dwindling!";

    constructor() {
        let currentIntroText = 0;
        document.getElementById("introTitle").innerHTML = this.introText[0][0];
        document.getElementById("introContent").innerHTML = this.introText[0][1];
        let introNextButton = <HTMLObjectElement>document.getElementById("introNext");
        let introPreviousButton = <HTMLObjectElement>document.getElementById("introPrevious");
        introNextButton.addEventListener("click", () => {
            currentIntroText++;
            currentIntroText = Math.min(currentIntroText, this.introText.length - 1)
            document.getElementById("introTitle").innerHTML = this.introText[currentIntroText][0];
            document.getElementById("introContent").innerHTML = this.introText[currentIntroText][1];
            document.getElementById("introTitle").classList.add("text-accent");
            document.getElementById("introContent").classList.add("text-white");
            introNextButton.classList.add("text-accent");
            introPreviousButton.classList.add("text-accent");
            document.getElementById("transition-splash").classList.add("intro-transition-shape-transitioning");
            document.getElementById("transition-splash-wrap").classList.add("intro-transition-wrap-transitioning");
            document.getElementById("transition-splash-bg").classList.add("transition-splash-bg-transitioning");
        });
        introPreviousButton.addEventListener("click", () => {
            currentIntroText--;
            currentIntroText = Math.max(currentIntroText, 0)
            document.getElementById("introTitle").innerHTML = this.introText[currentIntroText][0];
            document.getElementById("introContent").innerHTML = this.introText[currentIntroText][1];
        });


        //document.getElementById("playingTheGameContent").innerHTML = this.playingTheGame;

        // let toggle = false;
        // let violationTemplate = document.getElementById("violationTemplate");
        // for (let violation of this.violations) {
        //     let newViolation = <HTMLElement>violationTemplate.cloneNode(true);
        //     newViolation.style.display = "";
        //     if (toggle) {
        //         newViolation.style.backgroundColor = "#2a2a2a";//"#2f3e46";
        //     }
        //     else {
        //         newViolation.style.backgroundColor = "#333";//"#354f52";
        //     }
        //     toggle = !toggle;
        //     newViolation.getElementsByTagName("td")[0].innerHTML = "<b>" + violation[0] + "</b>";
        //     newViolation.getElementsByTagName("td")[1].innerHTML = violation[1];
        //     violationTemplate.parentNode.appendChild(newViolation);
        // }
        // violationTemplate.parentNode.removeChild(violationTemplate);

        // This code ensures the title arrow is always at (and not below) the bottom of the screen on mobile, even when the browser banner is visible.
        let updateWindowSize = () => {
            let equivalent100PercentHeight = document.getElementById("titlebackground").clientHeight;
            let diff = equivalent100PercentHeight * 1.02 - window.innerHeight;
            document.getElementById("titleArrow").parentElement.style.marginBottom = diff + "px";
        }
        window.addEventListener("resize", updateWindowSize);
        updateWindowSize();

        setTimeout(() => {
            let loader = document.getElementById("loader");
            loader.addEventListener("transitionend", () => {
                loader.style.display = "none";
            });
            loader.style.opacity = "0";
        }, 0);
    }
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}

document.addEventListener("DOMContentLoaded", () => setTimeout(() => new Application(), 0));