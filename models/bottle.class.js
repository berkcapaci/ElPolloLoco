class Bottle extends DrawableObject {

    width = 60;
    height = 60;

    IMAGES_BOTTLE_ON_GROUND = [
        "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        "img/6_salsa_bottle/2_salsa_bottle_on_ground.png"
    ];

    constructor(x, y){
        super();

        this.loadImage(this.IMAGES_BOTTLE_ON_GROUND[0]);
        this.loadImages(this.IMAGES_BOTTLE_ON_GROUND);

        this.x = x;
        this.y = y;

        this.animate();
    }

    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_ON_GROUND);
        }, 200);
    }


}