class Enemigo {

    constructor(w, h, clase, gap, life, ctx) {
        this.ctx = ctx;

        this.canvasW = w;
        this.canvasH = h;

        this.life = life;

        // Posición original
        this.x = this.canvasW * gap
        this.y = this.canvasH * 0.67;

        this.img = new Image();
        this.img.src = `assets/${clase}/${clase}_walk.png`

        this.img.frames = 4;
        this.img.frameIndex = 0;
        this.clase = clase;
        // Enemy size
        this.w = 85;
        this.h = 65;
        
        this.dx = 1;

        this.action = "walking"
        this.wasAttacked = false
        this.isDead = false
    }

    draw(frameCounter) {
        if (this.isDead) return false 
        this.setSkin();
        
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

    setSkin() {

        this.img.frames = Math.floor(this.img.width / this.w) + 1;
     

    }

    animateImg(frameCounter) {
        if (!this.action) return false;

        if (frameCounter % 6 === 0) {

            
            this.img.frameIndex++;

            if(this.action === "dying") {
                console.log(this.img.frameIndex)
            }

            if(this.img.frameIndex > this.img.frames -1) {
                

                if(this.action === "dying") {
                    this.isDead = true;
                    this.x = -1500
                    this.action = null 
                    return false
                }

                if(this.action === "attacking" && !this.isDead) {
                    this.img.src = `assets/${this.clase}/${this.clase}_walk.png`
                    this.action = "walking"
                }

                this.img.frameIndex = 0;

                

            }
        }

    }

    walk() {
        this.x -= this.dx;
    }

    attack() {


        if(this.action !== "attacking" && !this.wasAttacked) {
            this.action = "attacking"
            
            this.wasAttacked = true;
            this.img.frameIndex = 0
            this.img.src = `assets/${this.clase}/${this.clase}_attack2.png`

        }
    }

    die() {


       
        this.action = "dying"
        console.log("MEURTOOOOOOOOOOOOOOOO")
      
        
    }

    hit(damage) {        


        // NO ESTAS MUERTO Y TE HAGA DAÑO
        // 
        if (this.action && this.action !== "dying") {
            this.life -= damage
        
           
            this.img.frameIndex = 0;
            this.img.src = `assets/${this.clase}/${this.clase}_hurt.png`
            if(this.life <= 0 && this.action !== "dying"){
                console.log("IMPACTA")
                this.img.frameIndex = 0;
                this.img.src = `assets/${this.clase}/${this.clase}_death.png`
                this.die()
            } else {

                setTimeout(() => {
                    this.img.frameIndex = 0;
                    this.img.src = `assets/${this.clase}/${this.clase}_walk.png`
                    
                }, 300)
            }

         
        } 

            
       
       
    
        
    }


}