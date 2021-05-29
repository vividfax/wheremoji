class Wally {

    constructor(x, y, emoji) {

        this.x = x;
        this.y = y;
        this.emoji = emoji;
    }

    display() {

        if (this.emoji != "complete") {
            image(this.emoji, this.x, this.y, 30, 30);
        }
    }

    clicked() {

        let distance = dist(this.x, this.y, mouseX, mouseY);

        if (distance < 15) {
            return true;
        }
        return false;
    }
}
