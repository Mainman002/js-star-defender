// ParallaxBG class
export class ParallaxBG {
    constructor(_source, _img, _pw, _ph){
        this.pos = {x:0, y:0};
        this.size = {w:0, h:0};
        this.pixels = {w:_pw, h:_ph}
        this.dir = {x:0 ,y:0};
        this.speed = 4;
        this.image = _source;
        this.image.src = _img;
    }

    move(_x, _y, _w, _h){
        this.pos = {x:_x, y:_y};
        this.size = {w:_w, h:_h};
    }

    draw(ctx){
        ctx.globalAlpha = 1;
        // ctx.fillStyle = `Green`;
        // ctx.fillRect(this.pos.x, this.pos.y, this.size.w, this.size.h);
        ctx.drawImage(this.image, 0, 0, this.pixels.w, this.pixels.h, this.pos.x-this.size.w, this.pos.y, this.size.w, this.size.h);

        ctx.drawImage(this.image, 0, 0, this.pixels.w, this.pixels.h, this.pos.x, this.pos.y, this.size.w, this.size.h);

        ctx.drawImage(this.image, 0, 0, this.pixels.w, this.pixels.h, this.pos.x+this.size.w, this.pos.y, this.size.w, this.size.h);

        this.process();
    }

    process(){
        if (!(this.pos.x < 0 || this.pos.x > canvas.width - this.size.w)) {
            this.dir.x = 1;
        } else {
            this.dir.x = 0;
        }

        if (!(this.pos.y < 0 || this.pos.y > canvas.height - this.size.h)) {
            this.dir.y = 1;
        } else {
            this.dir.y = 0;
        }

        // if (this.shooting){
        //     this.shootTimer++;
        //     if (this.shootTimer > this.shootReset) this.shoot(), this.shootTimer = 0;
        // }

        // if (!(this.pos.y < 0 && this.dir.y === -1 || this.pos.y > canvas.height - this.size.h && this.dir.y === 1)) {
        //     this.pos.y += this.dir.y * this.speed;
        // }
    }
}