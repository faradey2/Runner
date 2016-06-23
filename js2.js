var field = document.querySelector("#field");
var cell = document.querySelector("#cell");
var road = document.querySelector("#road");

var trngls = [];
var commandBuffer = [];
var record = 0;
var score = 0;
const acceleration = 12.0;
const roadSpeed = 3.5;
const g = 1.1;
var prTimer;
var jump = false;
var addjump = false;
var borderType = 'transp'; //transparent, non-transparent
const levels = [
'     0  0  0  0  0  0  0',
'     0000   0000   0000   0000   0000',
'     0     0      0      0     0',
'     00   00   00   00   00',
];


var level = levels[0];
var levelNumber = 0;

function startGame(){
	field.width = 700;
	field.height = 500;
	cell.left = 175;
	cell.top = 275;
	cell.width = 25;
	cell.height = 25;
	a = 0;
	trngls = []
	road.top = 300;
	road.x = 0.0;
	commandBuffer = [];
	score = 0;
	jump = false;
	flyjump = false;
	prTimer = setInterval(process,25);
}

var process = function (){
	if(commandBuffer.length != 0)
		if(commandBuffer[0] == 'jump')
		{
			if(jump){
				if(addjump);
				else 	
				{
					a = acceleration;
					addjump = true;
				}
			}
			else	
			{
				a = acceleration;
				jump = true;	
			}
			commandBuffer.splice(0,1);
		}

	cell.top -= a ;
	a -= g;
	if(cell.top >= 275){
		cell.top = 275;
		a = 0;
		jump = false;
		addjump = false;
	}

	for(var i = 0 ; i< trngls.length;i++)
	{
		trngls[i].x -= roadSpeed;
		if(trngls[i].x <=0) {trngls.splice(i--,1); continue;}
		if(cell.left<trngls[i].x+cell.width/2&&trngls[i].x+cell.width/2< cell.left + cell.width&&cell.top > road.top - cell.width*2)
					GameOver(trngls[i]);
	
	}

	road.x += roadSpeed;
	if(road.x >=24 ){
		road.x = 0;
		if (level.length == 0) level = levels[(++levelNumber)%levels.length];
		if(level.charAt(0) == '0')
			createTr();
	
		level = level.slice(1);
	}

	updateField();
}

function GameOver(obj){
	updateField();
	console.log('GameOver');
	record = (score>record)?score:record;
	clearInterval(prTimer);
}

function createTr(x){
	var node = document.createElement("div");
	node.className = 'trngl';

	if(isNaN(x))
		node.x = 677;
	else node.x = x;
	trngls.push(node);

	field.appendChild(node);
	return node;
}

function updateField(){
	drawCell(cell);

	for(var i=0;i<trngls.length;i++)
		drawTrngl(trngls[i]);
}

function drawTrngl (obj){
	obj.style.left = obj.x + 'px';
}

function drawCell (obj){
	obj.style.left = obj.left + 'px';
	obj.style.top = obj.top + 'px';
}

function intersects(obj1,obj2){
	if(obj1.x == obj2.x && obj1.y==obj2.y)
		return true;
	else return false;
}

startGame();

addEventListener("keydown",function(e){
	if(e.keyCode==82) {
		console.log('r');
		GameOver();
		for(var i=0;i<trngls.length;i++)
			field.removeChild(trngls[i]);

		startGame();}
	if(commandBuffer.length > 0) return;
	if(e.keyCode==32) commandBuffer.push('jump');

})
	
