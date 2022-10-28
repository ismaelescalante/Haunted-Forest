class Player {

    constructor(w, h, ctx, keys) {
        this.ctx = ctx;
        
        this.canvasW = w;
        this.canvasH = h;

        this.keys = keys;
        
        this.x = this.canvasW * 0.3
        this.y0 = this.canvasH * 0.67;
        
        this.y = this.y0;

        this.img = new Image();
        this.img.src = "assets/WitchIdle.png"
        
        this.img.frames = 13;
        this.img.frameIndex = 0;

        this.w = 85;
        this.h = 65;  
        
        this.vy = 1;
        
        this.dx = 0;

        this.spells = [];

        this.setListeners();
    }

    animateImg(frameCounter) {

        if(frameCounter % 6 === 0) {
            this.img.frameIndex++;
            if(this.img.frameIndex > this.img.frames -1) {
                this.img.frames = 13;
                this.img.src = "assets/WitchIdle.png"
                this.img.frameIndex = 0;

            }
        }

    
    }


    setListeners(){

        let fired = false;
        document.onkeydown = function(e){
                if(!fired){
                    fired = true;
                     if((e.keyCode === this.keys.SPACE)) {
                        this.img.frameIndex = 0;
                        this.img.src='assets/attack.png'
                        this.img.frames = 10;
                        
                        this.cast()
                    }
                }
            if(e.keyCode === this.keys.RIGHT_KEY){
               this.img.frames = 16;
               this.img.src = 'assets/run.png'
               this.img.frameIndex = 0;
               this.dx = 3; 
               
            } else if (e.keyCode === this.keys.LEFT_KEY){
                this.dx = -3;
            }  else  if (e.keyCode === this.keys.TOP_KEY && 
                this.y === this.y0) {
                    this.img.src = 'assets/jump.png'
                    this.img.frameIndex = 0;
                    this.img.frames = 15;
                    this.y -=5
                    this.vy -= 10;
                    
                    
                } 
        }.bind(this)
        
        document.onkeyup = function(e){
                fired = false;
            if(e.keyCode === this.keys.LEFT_KEY || e.keyCode === this.keys.RIGHT_KEY || e.keyCode === this.keys.SPACE ||e.keyCode === this.keys.TOP_KEY){
            this.dx = 0;
        
            }

            if(e.keyCode === this.keys.LEFT_KEY || e.keyCode === this.keys.RIGHT_KEY || e.keyCode === this.keys.TOP_KEY) {
                this.img.frames = 13;
                this.img.src = "assets/WitchIdle.png"
                this.img.frameIndex = 0;
            }
           
        }.bind(this)
    }


    move(){
        this.x += this.dx;
        let gravity = 0.4;

        if (this.y >= this.y0) {
         this.vy = 1;
         this.y = this.y0;
        } else {
            this.vy += gravity;
            this.y += this.vy;
        }
    
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

    this.spells = this.spells.filter((spell) => spell.x < this.canvasW)
        
        this.spells.forEach((spell) => {
            setTimeout(()=> {
                spell.draw(frameCounter);
                spell.move();
            }, 600)
           
        })
}

     die(){
        this.img.src = 'assets/death.png'
        this.img.frames = 10;
    }

    cast(){
        
        const spell = new Spell (
            this.x + this.w,
            this.y + this.h / 2,
            this.y0,
            this.h,
            this.ctx
        )

        this.spells.push(spell)
    }
}
