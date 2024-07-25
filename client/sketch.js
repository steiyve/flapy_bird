let player, pillar, text_box;
let points = 0;

let file;
let best;

function preload(){
	file = loadJSON("best_score.json");
}

function setup() {
	new Canvas(500, 500);
	pillar = new Group();
	pillar.color = "green";
	pillar.life = 200;
	//world.gravity.y = 20
	player = new Sprite();
	player.w = 34;
	player.h = 24;
	player.debug = true;
	player.image = "yellowbird-midflap.png"
	player.overlaps(pillar, game_over);
	best = file.best_score;
}

function game_over(){
	file.best_score = best;
	saveJSON(file, "best_score.json");
	callShellScript();
	clear();
	background('skyblue')
	noLoop();
}
function callShellScript() {
	fetch('http://localhost:3000/execute-script', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json'
	  },
	  body: JSON.stringify({ scriptPath: '' })
	}).then(response => response.text())
	  .then(data => console.log(data))
	  .catch((error) => console.error('Error:', error));
}

let count = 0;
function draw() {
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
	if (points >= best) best = points;
	count++;
	text('Score: ' + points, 10, 10);
	text('Best: ' + best, 10, 20);
}
