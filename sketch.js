let player, pillar, text_box1, text_box2;
let points = 0;

let file;
let best;
let data;

function saveBestData(data) {
	fetch('http://localhost:3000/save_best', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
	.then(response => response.text())
	.then(message => console.log(message))
	.catch(error => console.error('Error:', error));
}

function getBestData() {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:3000/get_best')
            .then(response => {
                if (!response.ok) {
                    reject(new Error(`HTTP error! status: ${response.status}`));
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

async function preload(){
	data = await getBestData();
	console.log(`data: ${data.best_score}`);
	best = data.best_score;
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
}


function game_over(){
	const dataToSend = {"best_score": best};
	console.log(dataToSend);
	saveBestData(dataToSend);
	clear();
	background('skyblue')
	noLoop();
}


let count = 0;
function draw() {
	text_box1 = new Sprite(100,25, 200,50, 'n');
	text_box1.color = "grey";
	text_box1.life = 100;
	text_box2 = new Sprite(100,75, 200,50, 'n');
	text_box2.color = "grey";
	text_box2.life = 100;
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
	text_box1.text = `score: ${points}`;
	text_box2.text = `best score: ${best}`;
}
