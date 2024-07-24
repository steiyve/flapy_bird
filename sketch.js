let player, pillar, text_box;
let points = 0;

function setup() {
	new Canvas(500, 500);
	pillar = new Group();
	pillar.color = "green";
	text_box = new Sprite(50,25,100,50,'n');
	text_box.color = "grey";
	text_box.text = points;
	//world.gravity.y = 20
	player = new Sprite();
	player.diameter = 50;
	player.overlaps(pillar, game_over);
}

function game_over(){
	clear();
	background('skyblue')
	noLoop();
}

let count = 0;
function draw() {
	player.image = "yellowbird-midflap.png"
	if (count%30 == 0){
		let the_pillar_ground = new pillar.Sprite(500, 500, 50, 100);

		the_pillar_ground.h = Math.floor(Math.random()*451);
		console.log(the_pillar_ground.h);
		the_pillar_ground.vel.x -= 3;
		the_pillar_ground.vel.y -= 0;
		let the_pillar_sky = new pillar.Sprite(500, 0, 50, 100);
		the_pillar_sky.h = Math.floor(Math.random()*451);
		console.log(the_pillar_sky.h);
		the_pillar_sky.vel.x -= 3;
		the_pillar_sky.vel.y -= 0;
		points++;
	}
	background('skyblue');
	if (kb.pressing("space")){
		player.image = "yellowbird-downflap.png"
		player.vel.y = -3
	}
	else {
		player.image = "yellowbird-upflap.png"
		player.vel.y = 3
	}
	count++;
	text_box.text = points;
}
