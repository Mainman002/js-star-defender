import {Laser} from '../../modules/entities/laser.js';

// Player class
export class Player {
    constructor(_x, _y){
        this.pos = {x:_x, y:_y};
        this.size = {w:32, h:32};
        this.dir = {x:0 ,y:0};
        this.speed = 4;
        this.shooting = false;
        this.shootTimer = 0;
        this.shootReset = 16;
        // this.image = playerImage;
        // this.image.src = playerImage.src;
    }

    shoot(){
        lasers.push(new Laser(this.pos.x + this.size.w*.5, this.pos.y, 6));
    }

    // Cell draw function
    draw(ctx){
        ctx.globalAlpha = 1;
        ctx.fillStyle = `Green`;
        ctx.fillRect(this.pos.x, this.pos.y, this.size.w, this.size.h);
        // ctx.drawImage(this.image, this.frame*this.sprite.w, 0, this.sprite.w, this.sprite.h, this.x, this.y, this.width, this.height);

        this.process();
    }

    process(){
        if (!(this.pos.x < 0 && this.dir.x === -1 || this.pos.x > canvas.width - this.size.w && this.dir.x === 1)) {
            this.pos.x += this.dir.x * this.speed;
        }

        if (this.shooting){
            this.shootTimer++;
            if (this.shootTimer > this.shootReset) this.shoot(), this.shootTimer = 0;
        }

        if (!(this.pos.y < 0 && this.dir.y === -1 || this.pos.y > canvas.height - this.size.h && this.dir.y === 1)) {
            this.pos.y += this.dir.y * this.speed;
        }
    }
}