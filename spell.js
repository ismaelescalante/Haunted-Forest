class Spell {

    constructor(x, y, y0, h, ctx) {
        
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = 40;
        this.h = 20;
        this.playerH = h;
        this.y0 = y0;
        this.power = 30;

        this.img = new Image()
        this.img.src = 'assets/spell.png'
        this.vx = 10;

        this.img.frames = 6;
        this.img.frameIndex = 0;

    }

    animateImg(frameCounter) {
        if(frameCounter % 6 === 0) {
            
            this.img.frameIndex++;
        }

    if(this.img.frameIndex > 5) this.img.frameIndex = 0;
    }


    draw(frameCounter){
            !this.hit && this.ctx.drawImage(
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
    
    move(){
        
        this.x += this.vx;
    }

    impact(){
        this.hit = true;
        this.x = -1500
    }

}