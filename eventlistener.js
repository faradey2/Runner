var contr1 = document.querySelector(".contr");
var stat1 = document.querySelector(".status");
contr1.addEventListener("mousedown",function(e){
	stat1.style.width = e.offsetX + 'px';
	addEventListener("mousemove",move);
})

function move(e){
	if (event.which != 1) 
    		removeEventListener("mousemove", move);
    else 	{
    	if(stat1.offsetWidth + e.movementX > contr1.offsetWidth) return;
    	stat1.style.width = stat1.offsetWidth + e.movementX + 'px';
    	roadSpeed = 8*stat1.offsetWidth / contr1.offsetWidth;
    }
}