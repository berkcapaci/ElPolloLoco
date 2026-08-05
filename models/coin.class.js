class Coin extends DrawableObject{

    width = 100; 
    height = 100;

    IMAGES_ROTATING_COIN = [
    "img/8_coin/coin_1.png",
    "img/8_coin/coin_2.png"
    ];

    constructor(x, y){
        super();
        this.loadImage(this.IMAGES_ROTATING_COIN[0]);
        this.loadImages(this.IMAGES_ROTATING_COIN);
        this.x = x;
        this.y = y;
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATING_COIN);
        },300)
    }

}