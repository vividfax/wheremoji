class Wally {

    constructor(x, y, emoji) {

        this.x = x;
        this.y = y;
        this.emoji = emoji;
    }

    display() {

        if (this.emoji != "complete") {
            text(this.emoji, this.x, this.y);
        }
    }

    clicked() {

        let distance = dist(this.x, this.y, mouseX, mouseY);

        if (distance < textSize()/2) {
            return true;
        }
        return false;
    }
}
