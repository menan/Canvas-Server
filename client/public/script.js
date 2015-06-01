
var canvas;

var colors = ["#df4b26", "#00FF33", "#660000","#FFFF33", "#CCFFFF"]

var color = colors[Math.random() * colors.length];

function prepareCanvas () {
	// body...

	console.log("preparing canvas");
	var canvasDiv = document.getElementById('canvasDiv');

	canvas = document.createElement('canvas');
	canvas.setAttribute('width', 960);
	canvas.setAttribute('height', 600);
	canvas.setAttribute('id', 'canvas');
	canvasDiv.appendChild(canvas);
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas = G_vmlCanvasManager.initElement(canvas);
	}
	context = canvas.getContext("2d");


	$('#canvas').mousedown(function(e){
		var mouseX = e.pageX - this.offsetLeft;
		var mouseY = e.pageY - this.offsetTop;
		// console.log("mouse down");
		paint = true;
		addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
		redraw();
	});

	$('#canvas').mousemove(function(e){
		// console.log("mouse move");
		if(paint){
			addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
			redraw();
		}
	});

	$('#canvas').mouseup(function(e){
		// console.log("mouse up");
		paint = false;
  		redraw();
	});

	$('#canvas').mouseleave(function(e){
		// console.log("mouse leave");
		paint = false;
	});



}




var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

function addClick(x, y, dragging)
{
	clickX.push(x);
	clickY.push(y);
	clickDrag.push(dragging);
}

function redraw(){
	context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

	context.strokeStyle = color;
	context.lineJoin = "round";
	context.lineWidth = 5;
		
	for(var i=0; i < clickX.length; i++) {	
		context.beginPath();

		if(clickDrag[i] && i){
			context.moveTo(clickX[i-1], clickY[i-1]);
		}else{
			context.moveTo(clickX[i]-1, clickY[i]);
		}
		context.lineTo(clickX[i], clickY[i]);
		context.closePath();
		context.stroke();
	}
}


$(document).ready(function() {
	prepareCanvas();
});
