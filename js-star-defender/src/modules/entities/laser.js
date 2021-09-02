// Laser class
export class Laser {
    constructor(x, y, speed){
        this.pos = {x:x, y:y};
        this.size = {w:4, h:18};
        this.dir = {x:0 ,y:0};
        this.speed = speed;
        // this.image = laserImage;
        // this.image.src = laserImage.src;
    }

    // Cell draw function
    draw(ctx){
        ctx.globalAlpha = 1;
        ctx.fillStyle = `Red`;
        ctx.fillRect(this.pos.x-this.size.w*.5, this.pos.y, this.size.w, this.size.h);
        // ctx.drawImage(this.image, this.frame*this.sprite.w, 0, this.sprite.w, this.sprite.h, this.x, this.y, this.width, this.height);

        this.process();
    }

    process(){
        // if (!(this.pos.x < 0 && this.dir.x === -1 || this.pos.x > canvas.width - this.size.w && this.dir.x === 1)) {
        //     this.pos.x += this.dir.x * this.speed;
        // }

        this.pos.y += -1 * this.speed;

        for (let i = 0; i < lasers.length; i++){
            if (lasers[i] && lasers[i].pos.y < -16){
                lasers.splice( i, 1);
                i--;
            }
        }
    }
}