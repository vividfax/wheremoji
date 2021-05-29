let heartEyes, money, sunglasses, scream, zany, nerd, hot;
let partyFace, threeHearts, halo, rofl, kiss, dead, explode, wideEye, wah, mask, swear, cry, grin, upsideDown, please, starEyes, yum, hands, dash, mouthless;

let emojis = [];

let noise = [];
let wally;

let thud;
let ding;
let munch;
let muzak;
let party;

let interacted = false;

function preload() {

    heartEyes = loadImage("pngs/smiling-face-with-heart-eyes_1f60d.png");
    money = loadImage("pngs/money-mouth-face_1f911.png");
    sunglasses = loadImage("pngs/smiling-face-with-sunglasses_1f60e.png");
    scream = loadImage("pngs/face-screaming-in-fear_1f631.png");
    zany = loadImage("pngs/zany-face_1f92a.png");
    nerd = loadImage("pngs/nerd-face_1f913.png");
    hot = loadImage("pngs/hot-face_1f975.png");

    partyFace = loadImage("pngs/partying-face_1f973.png");
    threeHearts = loadImage("pngs/smiling-face-with-hearts_1f970.png");
    halo = loadImage("pngs/smiling-face-with-halo_1f607.png");
    rofl = loadImage("pngs/rolling-on-the-floor-laughing_1f923.png");
    kiss = loadImage("pngs/face-blowing-a-kiss_1f618.png");
    dead = loadImage("pngs/dizzy-face_1f635.png");
    explode = loadImage("pngs/exploding-head_1f92f.png");
    wideEye = loadImage("pngs/flushed-face_1f633.png");
    wah = loadImage("pngs/tired-face_1f62b.png");
    mask = loadImage("pngs/face-with-medical-mask_1f637.png");
    swear = loadImage("pngs/face-with-symbols-on-mouth_1f92c.png");
    cry = loadImage("pngs/loudly-crying-face_1f62d.png");
    grin = loadImage("pngs/beaming-face-with-smiling-eyes_1f601.png");
    upsideDown = loadImage("pngs/upside-down-face_1f643.png");
    please = loadImage("pngs/pleading-face_1f97a.png");
    starEyes = loadImage("pngs/star-struck_1f929.png");
    yum = loadImage("pngs/face-savoring-food_1f60b.png");
    hands = loadImage("pngs/hugging-face_1f917.png");
    dash = loadImage("pngs/expressionless-face_1f611.png");
    mouthless = loadImage("pngs/face-without-mouth_1f636.png");

    let tier1 = [heartEyes, money, sunglasses, scream, zany, nerd, hot];
    let tier2 = [partyFace, threeHearts, halo, rofl, kiss, dead, explode, wideEye, wah, mask, swear, cry, grin, upsideDown, please, starEyes, yum, hands, dash, mouthless];

    emojis = shuffle(tier2);
    emojis = emojis.concat(shuffle(tier1));
}

function setup() {

    createCanvas(windowWidth, windowHeight);
    textSize(30);
    textAlign(CENTER, CENTER);
    textFont("Gaegu");
    imageMode(CENTER);

    thud = createPlayer("samples/thud.wav");
    ding = createPlayer("samples/ding.wav");
    munch = createPlayer("samples/munch.mp3");
    party = createPlayer("samples/party.mp3");

    muzak = new Audio("samples/muzak.ogg");
    muzak.loop = true;

    noLoop();
    display();
}

function draw() {

    if (frameCount == 1) {
        return;
    }
    if (emojis.length != 0) {
        munchTransition();
    } else {
        emojiDance();
    }
}

let iterate = 0;

function munchTransition() {

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

let partySize = 0;

function emojiDance() {

    for (let i = 0; i < 2; i++) {
        image(random(noise), random(width), random(height), 30, 30);
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

function display() {

    background("#FFC83A");

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
            image(random(noise), random(width/2) + width/4, random(height/2) + height/4, 30, 30);
        }
        wally.display();

        let extraSpace = false;

        if (noise.length >= 10) {
            extraSpace = true;
        }
        displayText(noise.length + ". wally is    ", width/2, height/8, 2);

        if (extraSpace) {
            image(wally.emoji, width/2 + 77, height/8, 30, 30)
        } else {
            image(wally.emoji, width/2 + 70, height/8, 30, 30)
        }
    }
    noise.push(wally.emoji);
}

function mousePressed() {

    if (!interacted) {
        muzak.play();
        interacted = true;
    }
    if (emojis.length != 0) {

        if (wally.clicked()) {
            ding.start();
            munch.start();
            loop();
        } else {
            thud.start();
        }
    } else {
        party.start();
        loop();
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
