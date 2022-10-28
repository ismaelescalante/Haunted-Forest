class Enemy2 {

    constructor(w, h, ctx) {
        this.ctx = ctx;
        
        this.canvasW = w;
        this.canvasH = h;
        this.life = 330;
      
        this.x = this.canvasW * 1.5

        // Posición original
        this.y0 = this.canvasH * 0.67;
        
        this.y = this.y0;

        this.img = new Image();
        this.img.src = "assets/Big_bloated/Big_bloated_walk.png"
        
        this.img.frames = 4;
        this.img.frameIndex = 0;

        this.w = 85;
        this.h = 65;   
        
        this.dx = 1;
    }

    animateImg(frameCounter) {

        if(frameCounter % 6 === 0) {
            this.img.frameIndex++;
        }

        if(this.img.frameIndex > 3) this.img.frameIndex = 0;
    }


    
    draw(frameCounter) {
        this.ctx.drawImage(

            
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
        
        this.x -= this.dx;
        this.img.frames = 6;
        this.img.src= 'assets/Big_bloated/Big_bloated_walk.png'
    }

    attack(){
        this.img.src = 'assets/Big_bloated/Big_bloated_attack1.png'
        this.img.frames = 6;
    }

    die(){
        this.img.src = 'assets/Big_bloated/Big_bloated_death.png'
        this.img.frames = 4;
        setTimeout(() => {
            this.dead = true
            this.x = -350;
        }, 300)

    
}

    hit(){
    this.img.src = 'assets/Big_bloated/Big_bloated_hurt.png'
    this.img.frames = 2;
    }   

}