class Boss {

    constructor(w, h, ctx) {
        this.ctx = ctx;
        
        this.canvasW = w;
        this.canvasH = h;
        this.life = 300;
      
        this.x = this.canvasW * 0.85

        // Posición original
        this.y0 = this.canvasH * -4.7;
        
        this.y = this.y0;

        this.img = new Image();
        this.img.src = "assets/boss.png"
        
        this.img.frames = 10;
        this.img.frameIndex = 0;

        this.w = 100;
        this.h = 100;   
        
        this.dx = 120;
        this.dy = 1;
    }

    animateImg(frameCounter) {

        if(frameCounter % 6 === 0) {
            this.img.frameIndex++;
        }

        if(this.img.frameIndex > 6) this.img.frameIndex = 0;
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

    walk(){
        
        this.y += this.dy;
        this.img.frames = 7;
        this.img.src= 'assets/ghost-idle.png'

        if(this.y === 315){
            this.dy = 0;
        }

        
    }

    hit(){
        this.img.src = 'assets/ghost-shriek.png'
        this.img.frames = 4;
    }
    
    die() {
        this.img.src = 'assets/ghost-vanish.png'
        this.img.frames = 7;

        setTimeout(() => {
            this.dead = true
            this.x = -1500
        }, 300)
    }

    
}