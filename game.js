
const Game = {
    canvas: undefined,
    ctx: undefined,
    fps: 60,
    keys: {
        RIGHT_KEY: 39,
        LEFT_KEY: 37,
        TOP_KEY: 38,
        SPACE: 32
    },
    
    
    

    init: function (){
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');

        this.start()
    },

    start: function(){
        
       
        this.reset()
        this.interval = setInterval(() => {
            this.frameCounter++;

            
            if (this.frameCounter > 1000) {
                this.frameCounter = 0;
            }
            this.drawAll()
            this.moveAll()
            this.enemy.walk()
            this.enemy2.walk()
            this.enemy3.walk()
            this.boss.walk()

            if(this.isCollision1()){
                this.enemy.attack()
                this.player.die()

               setTimeout(() => {
                this.gameOver()
               }, 1650) 
            }

            if(this.isCollision2()){
                this.enemy2.attack()
                this.player.die()

               setTimeout(() => {
                this.gameOver()
               }, 650) 

            }

            if(this.isCollision3()){
                this.enemy3.attack()
                this.player.die()

               setTimeout(() => {
                this.gameOver()
               }, 650) 

            }

            if(this.collisionBoss()){
                this.player.die()
                setTimeout(() => {
                    this.gameOver()
                   }, 650) 
            }

            if(this.isAttack()){
               
               
                this.enemy.hit(this.spell.power)
            }

            if(this.isAttack2()){
                
                this.enemy2.hit(this.spell.power)

            
            }

            if(this.isAttack3()){
             
                this.enemy3.hit(this.spell.power)

             
            }


            if(this.attackBoss()){
                this.boss.hit();
                this.boss.x -= this.boss.dx;

                if(this.player.x <= -20){
                    
                    this.boss.die()
                }
                }

        }, 1000 / this.fps)

    },

    
        


    reset: function() {
        this.background = new Background(this.canvas.width, this.canvas.height, this.ctx)
        this.player = new Player(this.canvas.width, this.canvas.height, this.ctx, this.keys)
        this.enemy = new Enemigo(this.canvas.width, this.canvas.height, "Centipede", 1, 250, this.ctx)
        this.enemy2 = new Enemigo(this.canvas.width, this.canvas.height, "Big_bloated", 1.5, 300, this.ctx)
        this.enemy3 = new Enemigo(this.canvas.width, this.canvas.height, "Battle_turtle", 2, 500, this.ctx)
  
        this.boss = new Boss(this.canvas.width, this.canvas.height, this.ctx)
        this.spell = new Spell(this.canvas.width, this.canvas.height, this.ctx)

        
        this.frameCounter = 0;
        
    },

    drawAll: function(){
        this.background.draw();
        this.player.draw(this.frameCounter)
        this.enemy.draw(this.frameCounter)
        this.enemy2.draw(this.frameCounter)
        this.enemy3.draw(this.frameCounter)
        this.boss.draw(this.frameCounter)
    },

    moveAll: function(){
        this.player.move()
    },

    isCollision1: function (){
        return (this.player.x + this.player.w - 60 >= this.enemy.x &&
            this.player.x < this.enemy.x + this.enemy.w - 60 &&
            this.player.y + (this.player.h - 20) >= this.enemy.y)
    },

    isCollision2: function (){
        return (this.player.x + this.player.w - 60 >= this.enemy2.x &&
            this.player.x < this.enemy2.x + this.enemy2.w - 60 &&
            this.player.y + (this.player.h - 20) >= this.enemy2.y)
    },

    isCollision3: function (){
        return (this.player.x + this.player.w - 60 >= this.enemy3.x &&
            this.player.x < this.enemy3.x + this.enemy3.w - 60 &&
            this.player.y + (this.player.h - 20) >= this.enemy3.y)
    },

    isAttack: function (){

        return this.player.spells.some((spell) => {

            return (
                spell.x + spell.w  >= this.enemy.x +30 &&
                spell.x < this.enemy.x)
                

            })
    },

    
    isAttack2: function (){

        return this.player.spells.some((spell) => {

            return (
                spell.x + spell.w  >= this.enemy2.x +30 &&
                spell.x < this.enemy2.x)

            })
    },

    
    isAttack3: function (){

        return this.player.spells.some((spell) => {

            return (
                spell.x + spell.w  >= this.enemy3.x +30 &&
                spell.x < this.enemy3.x)

            })
    },

    attackBoss: function(){
        return this.player.spells.some((spell) => {
            if(this.boss.y ===315){
            return (
                spell.x + spell.w  >= this.boss.x +30 &&
                spell.x < this.boss.x)
            }

            })
    },

    collisionBoss: function(){
        if(this.boss.y === 315){
        return (this.player.x + this.player.w + 60 >= this.boss.x &&
            this.player.x < this.boss.x + this.boss.w + 60 &&
            this.player.y + (this.player.h - 20) >= this.boss.y)
        }
    },


    stop: function(){
        clearInterval(this.interval)
    },

    gameOver: function(){
           
            this.stop();
            this.reset();
            this.start()
            }
        }
    

        

