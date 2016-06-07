window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

	var renderers = {
		'r3': (function() {
			var circles = [];
			var initialized = false;
			var height = 0;
			var width = 0;

			var init = function(config) {
			var count = config.count;
			width = config.width;
					
			height = config.height;
			var circleMaxWidth = (width*0.66) >> 0;
			circlesEl = document.getElementById('circles');
			for(var i = 0; i < count; i++ ){
				var node = document.createElement('div');
				node.style.width = node.style.height = (i/count*circleMaxWidth) + 'px';
				node.classList.add('circle');
				circles.push(node);
				circlesEl.appendChild(node);
				}
			initialized = true;
			};
			var max = 256;

			var renderFrame = function(frequencyData) {
			for(var i = 0; i < circles.length; i++) {
				var circle = circles[i];
				circle.style.cssText = '-webkit-transform:scale('+((frequencyData[i]/max))+')';
				}
			};


			return {
				init: init,
				isInitialized: function() {
					return initialized;
				},
				renderFrame: renderFrame
			}
		})()
	};

	window.onload = function() {

		function Visualization(config) {
			var audio,
				audioStream,
				analyser,
				source,
				audioCtx,
				canvasCtx,
				frequencyData,
				running = false,
				renderer = config.renderer,
				width = config.width || 245,
				height = config.height || 245;

			var init = function() {
				audio = document.getElementById('stream_audio');
				audioCtx = new AudioContext();
				analyser = audioCtx.createAnalyser();
				source =  audioCtx.createMediaElementSource(audio);
				source.connect(analyser);
				analyser.connect(audioCtx.destination);
				analyser.fftSize = 64;
				frequencyData = new Uint8Array(analyser.frequencyBinCount);
				renderer.init({
					count: analyser.frequencyBinCount,
					width: width,
					height: height
				});
			};
			this.start = function() {
				audio.play();
				running = true;
				renderFrame();
			};
			this.stop = function() {
				running = false;
				audio.pause();
			};
			this.setRenderer = function(r) {
				if (!r.isInitialized()) {
					r.init({
						count: analyser.frequencyBinCount,
						width: width,
						height: height
					});
				} 
				renderer = r;
			};
			this.isPlaying = function() {
				return running;
			}

			var renderFrame = function() {
				analyser.getByteFrequencyData(frequencyData);
				renderer.renderFrame(frequencyData);
				if (running) {
					requestAnimationFrame(renderFrame);
				}
			};

			init();

		};
		var vis = document.querySelectorAll('.area');
		var v = null;
		var lastEl;
		var lastElparentId;
		for(var i=0; i<vis.length; i++) {
			vis[i].onclick = (function() {

				return function() {
					var el = this;
					var id = el.parentNode.id;

						if (!v) {
							v = new Visualization({renderer: renderers[id] });
						}
						v.setRenderer(renderers[id]);
						if (v.isPlaying()) {
							if (lastElparentId === id) {
								v.stop();
								el.style.backgroundColor = 'rgba(0,0,0,0.3)';
							} 
							else {
								lastEl.style.backgroundColor = 'rgba(0,0,0,0.3)';
								el.style.backgroundColor = 'rgba(0,0,0,0)';
							}
								
						}
						else {
								
							v.start();
							el.style.backgroundColor = 'rgba(0,0,0,0)';
						}
					lastElparentId = id;
					lastEl = el;
				};
			})();
		}
	};
