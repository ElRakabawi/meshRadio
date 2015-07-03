//  Core calculations kindly stolen from podlipensky[dot]com, copyrights for authors.
	(function(){
		var isStartMove=false,knob,lBar,rBar,pos,center, Amute, Ahigh, Anorm;
		function findPos(obj){
			var curleft=curtop=0;
			if(obj.offsetParent){
				do{
					curleft+=obj.offsetLeft;curtop+=obj.offsetTop;
				}
				while(obj=obj.offsetParent);
			}
			return{X:curleft,Y:curtop};
		}
		function onKnobTouchStart(e){
			if(!e) var e=window.event;isStartMove=true;
		}
		function onKnobTouchMove(e){
			if(!e) var e=window.event;
			if(isStartMove){
			var a=Math.atan2((e.pageY-center.Y),(e.pageX-center.X))*180/Math.PI;
			var b=(a>=90?a-90:270+a)-30;displayProgress(b);
			}
		}
		function onKnobTouchEnd(e){
			if(!e) var e=window.event;
			isStartMove=false;
		}
		function displayProgress(a){
			if(a >= 0 && a <= 180){
				progressBar.style.clip="rect(0px, 140px, 280px, 0px)";
				progressBar.style.webkitTransform="rotate(30deg)";
				lBar.style.webkitTransform="rotate("+-1*(180-a)+"deg)";
				rBar.style.display="none";
				Ahigh.style.opacity="0.3";
				Amute.style.opacity="0";
				Anorm.style.opacity="1";
			}
			else if(a > 180 && a < 303){
				progressBar.style.clip="rect(0px, 280px, 280px, 0px)";
				rBar.style.display="block";
				lBar.style.webkitTransform="rotate(0deg)";
				rBar.style.webkitTransform="rotate("+a+"deg)";
				Amute.style.opacity="0";
				Ahigh.style.opacity="1";
				Anorm.style.opacity="0.4";
			}
			else if(a <= 10){
				Amute.style.opacity="1";
				Ahigh.style.opacity="0.4";
				Anorm.style.opacity="0";
			}
		}
		window.onload=function(){
			knob=document.getElementById('volume-knob');
			progressBar=document.getElementById('progress-bar');
			lBar=document.getElementById('l-bar');
			rBar=document.getElementById('r-bar');
			Ahigh=document.getElementById('icon-sound-alt');
			Amute=document.getElementById('icon-sound-off');
			Anorm=document.getElementById('icon-sound');
			knob.addEventListener('touchstart',onKnobTouchStart,false);
			knob.addEventListener('touchmove',onKnobTouchMove,false);
			knob.addEventListener('touchend',onKnobTouchEnd,false);
			knob.addEventListener('mousedown',onKnobTouchStart,false);
			knob.addEventListener('mousemove',onKnobTouchMove,false);
			knob.addEventListener('mouseup',onKnobTouchEnd,false);
			pos=findPos(knob);
			center={X:pos.X+knob.offsetWidth/2,Y:pos.Y+knob.offsetHeight/2};displayProgress(147);
		};
	})();
