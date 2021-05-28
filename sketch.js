let emojis = [];
let tier1 = ["😍", "🤑", "😎", "😱", "🤪", "🤓"];
let tier2 = ["🥳", "🥰", "😇", "🤣", "😘", "😴", "😵", "🤯", "😳", "😫", "😷", "🤬", "😭", "😁", "🙃"];

let noise = [];
let wally;

let thud;
let ding;
let munch;
let muzak;

let interacted = false;

function setup() {

    createCanvas(windowWidth, windowHeight);
    textSize(30);
    textAlign(CENTER, CENTER);
    textFont("Gaegu");

    emojis = emojis.concat(shuffle(tier2));
    emojis = emojis.concat(shuffle(tier1));

    thud = createPlayer("samples/thud.wav");
    ding = createPlayer("samples/ding.wav");
    munch = createPlayer("samples/munch.mp3");

    muzak = new Audio("samples/muzak.ogg");
    muzak.loop = true;

    noLoop();
    display();
}

let iterate = 0;

function draw() {

    if (frameCount == 1) {
        return;
    }
    if (iterate >= height) {
        iterate = 0;
        noLoop();
        display();
    } else if (iterate >= height - 10) {
        background("#FFC83A")
    } else {
        noStroke();
        fill("#FFC83A");
        ellipse(random(width)/2 + width/4, random(height), random(50, 300));
    }
    iterate += 10;
}

function display() {

    background("#FFC83A");

    if (wally) {
        noise.push(wally.emoji);
    }
    if (noise.length == 0) {
        noise.push(emojis.pop());
    }
    if (emojis.length == 0) {
        wally = "complete";
    } else {
        wally = emojis.pop();
    }
    wally = new Wally(random(width)/2 + width/4, random(height)/2 + height/4, wally);

    if (wally.emoji != "complete") {

        for (let i = 0; i < 10000; i++) {
            text(random(noise), random(width)/2 + width/4, random(height)/2 + height/4);
        }
        wally.display();

        let extraSpace = "";

        if (noise.length >= 10) {
            extraSpace = " "
        }
        displayText(noise.length + ". wally is    ", width/2, height/8, 2);
        text("           " + extraSpace + wally.emoji, width/2, height/8 + 4)

    } else {
        for (let i = 0; i < 20000; i++) {
            text(random(noise), random(width), random(height));
        }
        rectMode(CENTER);
        fill("#7A4DB2");
        rect(width/2 + 10, height/2 + 10, 400, 300, 0);
        strokeWeight(1.5);
        stroke("#7A4DB2");
        fill("#FFC83A");
        rect(width/2, height/2, 400, 300, 0);

        noStroke();
        textSize(60);
        fill("#fff");
        displayText("wally is\ncomplete!", width/2, height/2, 3);
    }
}

function mousePressed() {

    if (!interacted) {
        muzak.play();
        interacted = true;
    }
    if (wally.clicked()) {
        ding.start();
        munch.start();
        loop();
    } else {
        thud.start();
    }
}

function displayText(message, x, y, size) {

    noStroke();
    fill("#7A4DB2")
    text(message, x + size, y + size);

    stroke("#7A4DB2");
    strokeWeight(2);
    fill("#fff")
    text(message, x, y);
}

function createPlayer(url) {

    return new Tone.Player({
        url: url,
    }).toMaster();
}
