var canvas, canvasContext;

window.onload = function () {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  canvasContext.fillStyle = 'black';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  let img = new Image();
  img.src = 'https://raw.githubusercontent.com/aahmad94/Tank-Wars/master/docs/images/board_ground.png';
  img.onload = function(){
  // create pattern
    var pattern = canvasContext.createPattern(img, 'repeat'); // Create a pattern with this image, and set it to "repeat".
    canvasContext.fillStyle = pattern;
    canvasContext.fillRect(0, (canvas.height - 50), 50, 50); // context.fillRect(x, y, width, height);
  };
};
