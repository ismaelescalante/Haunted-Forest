class Enemy {

    constructor(w, h, ctx) {
        this.ctx = ctx;

        this.canvasW = w;
        this.canvasH = h;

        this.life = 240;
        this.x = this.canvasW * 0.99

        // Posición original
        this.y0 = this.canvasH * 0.67;

        this.y = this.y0;

        this.img = new Image();
        this.img.src = "assets/centipede/Centipede_walk.png"
       
        this.img.frames = 4;
        this.img.frameIndex = 0;

        this.w = 85;
        this.h = 65;

        this.dx = 1;
    }

    animateImg(frameCounter) {

        if (frameCounter % 6 === 0) {
            this.img.frameIndex++;

            if(this.img.frameIndex > this.img.frames -1) {
                this.img.frameIndex = 0;

            }
        }

    }



    draw(frameCounter) {
        !this.dead && this.ctx.drawImage(


            this.img,
            this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
            0,
            Math.floor(this.img.width / this.img.frames),
            this.img.height,
            this.x,
            this.y,
            this.w,
            this.h
        )

        this.animateImg(frameCounter)
    }

    walk() {
        this.x -= this.dx;
    }

    attack() {
        this.img.frameIndex = 0;
        this.img.src = 'assets/centipede/Centipede_attack2.png'
        this.img.frames = 6;
    }

    die() {
        this.img.frameIndex = 0;
        this.img.src = 'assets/centipede/Centipede_hurt.png'
        this.img.frames = 2;

        setTimeout(() => {
            this.dead = true
            this.x = -1500
        }, 300)
    }

    hit(damage) {
        console.log("TOQUE")
        this.life -= damage
        this.img.frameIndex = 0;
        this.img.src = 'assets/centipede/Centipede_hurt.png'
        this.img.frames = 2;

        if(this.life <= 0){

            setTimeout(() => {
                this.die()
            }, 300)
           
        } else {

            setTimeout(() => {
                this.img.src = "assets/centipede/Centipede_walk.png"
                this.img.frames = 4;
                this.img.frameIndex = 0;
            }, 300)
        }
    }
}

