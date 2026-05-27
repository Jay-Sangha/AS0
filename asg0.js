var ctx;
var canvas;

function main() {
  canvas = document.getElementById('asg0');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return false;
  }

  ctx = canvas.getContext('2d');
  clearCanvas();

  var v1 = new Vector3([2.25, 2.25, 0.0]);
  drawVector(v1, 'red');
}

function clearCanvas() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawVector(v, color) {
  var cx = canvas.width / 2;
  var cy = canvas.height / 2;
  var scale = 20;

  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + v.elements[0] * scale, cy - v.elements[1] * scale);
  ctx.stroke();
}

function readVector(xId, yId) {
  var x = parseFloat(document.getElementById(xId).value);
  var y = parseFloat(document.getElementById(yId).value);
  return new Vector3([x, y, 0.0]);
}

function copyVector(v) {
  return new Vector3([v.elements[0], v.elements[1], v.elements[2]]);
}

function handleDrawEvent() {
  clearCanvas();

  var v1 = readVector('xcoord', 'ycoord');
  drawVector(v1, 'red');

  var v2 = readVector('xcoord2', 'ycoord2');
  drawVector(v2, 'blue');
}

function handleDrawOperationEvent() {
  clearCanvas();

  var v1 = readVector('xcoord', 'ycoord');
  var v2 = readVector('xcoord2', 'ycoord2');
  drawVector(v1, 'red');
  drawVector(v2, 'blue');

  var operator = document.getElementById('opt').value;
  var scalar = parseFloat(document.getElementById('scalar').value);

  if (operator === 'Add') {
    var v3 = copyVector(v1);
    v3.add(v2);
    drawVector(v3, 'green');
  } else if (operator === 'Subtract') {
    var v3 = copyVector(v1);
    v3.sub(v2);
    drawVector(v3, 'green');
  } else if (operator === 'Multiply') {
    var v3 = copyVector(v1);
    v3.mul(scalar);
    drawVector(v3, 'green');
    var v4 = copyVector(v2);
    v4.mul(scalar);
    drawVector(v4, 'green');
  } else if (operator === 'Divide') {
    var v3 = copyVector(v1);
    v3.div(scalar);
    drawVector(v3, 'green');
    var v4 = copyVector(v2);
    v4.div(scalar);
    drawVector(v4, 'green');
  } else if (operator === 'Mag') {
    console.log('Magnitude v1: ' + v1.magnitude());
    console.log('Magnitude v2: ' + v2.magnitude());
  } else if (operator === 'Norm') {
    var v3 = copyVector(v1);
    v3.normalize();
    drawVector(v3, 'green');
    var v4 = copyVector(v2);
    v4.normalize();
    drawVector(v4, 'green');
  } else if (operator === 'Ang') {
    console.log('Angle: ' + angleBetween(v1, v2).toFixed(2));
  } else if (operator === 'Area') {
    console.log('Area of this triangle: ' + areaTriangle(v1, v2).toFixed(2));
  }
}

function angleBetween(v1, v2) {
  var m1 = v1.magnitude();
  var m2 = v2.magnitude();
  var d = Vector3.dot(v1, v2);
  var alpha = Math.acos(d / (m1 * m2));
  return alpha * (180 / Math.PI);
}

function areaTriangle(v1, v2) {
  var cross = Vector3.cross(v1, v2);
  return cross.magnitude() / 2;
}
