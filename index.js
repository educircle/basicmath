
function fill_text(){
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

	ctx.font = "20px Georgia";
	ctx.fillText("Hello World!", 10, 50);

	ctx.font = "30px Verdana";
	// Create gradient
	var gradient = ctx.createLinearGradient(0, 0, c.width, 0);
	gradient.addColorStop("0"," magenta");
	gradient.addColorStop("0.5", "blue");
	gradient.addColorStop("1.0", "red");
	// Fill with gradient
	ctx.fillStyle = gradient;
	ctx.fillText("Big smile!", 10, 90);
}

function output(todo){
	var n1=parseInt(document.getElementById("n1").value);
	var n2=parseInt(document.getElementById("n2").value);
	if(todo=="add"){var result=n1+n2; var operator="plus"; var opsign="+";}
	if(todo=="dif"){var result=n1-n2; var operator="minus"; var opsign="-";}
	if(todo=="mult"){var result=n1*n2; var operator="into"; var opsign="X";}
	var right=180; var top=30; var linewidth=100;
	killTimeouts();
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.font = "30px Verdana";	// Create gradient
	var gradient = ctx.createLinearGradient(0, 0, c.width, 0);
	gradient.addColorStop("0"," magenta");
	gradient.addColorStop("0.5", "blue");
	gradient.addColorStop("1.0", "red");
	// Fill with gradient
	ctx.fillStyle = gradient;
	
	header(ctx,right,top,100);
	setTimeout(function(){speak(n1);num(ctx,right,top+30,n1);}, 1500);
	setTimeout(function(){speak(operator+' '+n2);num(ctx,right,top+60,n2,opsign);line(ctx,right-linewidth,right,top+62);}, 3000);
	setTimeout(function(){speak('equals '+result);num(ctx,right,top+90,result);line(ctx,right-linewidth,right,top+92);}, 4500);
}

function header(ctx,h,v,num){
	ctx.textAlign = "right";
	if(num<10)ctx.fillText("   O", h, v);
	else if(num<100)ctx.fillText(" T O",  h, v);
	else ctx.fillText("H T O",  h, v);
}

function num(ctx,h,v,num,p=""){
	var text="";
	var sign="";
	if(num<0){
		sign="(-)";
		num=num*-1;
	}
	var l=num.toString().length; 
	
	if(l==1)text="    "+num;
	else if(l==2){
		var t=parseInt(num/10);
		var o=num-t*10;
		text="  "+t+" "+o;
	}
	else{ 
		var hun=parseInt(num/100);
		var t=parseInt((num-hun*100)/10);
		var o=num-hun*100-t*10;
		text=hun+" "+t+" "+o;
	}
	ctx.textAlign = "right";
	ctx.fillText(p+sign+text,  h, v);
}

function line(ctx,v1,v2,h){
	ctx.beginPath();
	ctx.moveTo(v1,h);
	ctx.lineTo(v2,h);
	ctx.stroke();
}

function killTimeouts(){
 console.log("killing timeouts...");
 //clear all timeouts if any
 var id = window.setTimeout(function() {}, 0);
 while (id--) {
  window.clearTimeout(id); // will do nothing if no timeout with id is present
 }
}

function speak(t){
	msg.text = t;
	window.speechSynthesis.speak(msg);
}
var msg = new SpeechSynthesisUtterance();