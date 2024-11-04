let birdPositions = [];
let cloudPositions = [];

function setup() {
  createCanvas(800, 400);
  
  for (let i = 0; i < 8; i++) {
    birdPositions.push(createVector(random(width), random(50, 150)));
  }
  
  for (let i = 0; i < 4; i++) {
    cloudPositions.push(createVector(random(width), random(50, 120)));
  }
}

function draw() {

  for (let y = 0; y < height; y++) {
    let skyColor = lerpColor(color(180, 230, 255), color(135, 206, 250), y / height);
    stroke(skyColor);
    line(0, y, width, y);
  }

  for (let r = 80; r > 0; r -= 1) {
    fill(255, 204, 153, map(r, 80, 0, 0, 180));
    noStroke();
    ellipse(width / 2, 190, r * 2, r * 2);
  }
  
  drawMountain(0, 300, 300, 130, 500, 300, color(100, 80, 80), color(150, 110, 110));
  drawMountain(300, 300, 500, 130, 800, 300, color(80, 80, 100), color(110, 110,150));

  drawFields();
  
  fill(60);
  beginShape();
  vertex(220, height);
  vertex(370, 300);
  vertex(430, 300);
  vertex(580, height);
  endShape(CLOSE);

  stroke(255);
  strokeWeight(2);
  for (let y = 320; y < height; y += 25) {
    let lineLength = map(y, 320, height, 15, 8);
    line(width / 2, y, width / 2, y + lineLength);
  }

  // Draw clouds
  for (let cloud of cloudPositions) {
    drawCloud(cloud.x, cloud.y);
    cloud.x += 0.5; // Move cloud to the right
    if (cloud.x > width) { // Reset cloud position if it goes off screen
      cloud.x = -100;
      cloud.y = random(50, 120); // Randomize new height
    }
  }
  
  // Draw birds
  for (let bird of birdPositions) {
    drawBird(bird.x, bird.y);
    bird.x += 2; // Move bird to the right
    if (bird.x > width) { // Reset bird position if it goes off screen
      bird.x = -20; 
      bird.y = random(50, 150); // Randomize new height
    }
  }

  // Draw trees
  drawTree(50, 330);
  drawTree(150, 330);
  drawTree(650, 330);
  drawTree(750, 330);
}

function drawMountain(x1, y1, x2, y2, x3, y3, col1, col2) {
  let gradient = drawingContext.createLinearGradient(x1, y1, x3, y3);
  gradient.addColorStop(0, col1);
  gradient.addColorStop(1, col2);
  drawingContext.fillStyle = gradient;
  noStroke();
  triangle(x1, y1, x2, y2, x3, y3);
}

function drawFields() {
  noStroke();
  fill(60, 180, 60); // Full green color for fields
  rect(0, 300, width, 100); // Use a single rectangle for full green coverage
}

function drawBird(x, y) {
  stroke(0);
  strokeWeight(1.5);
  line(x - 5, y, x, y - 3);
  line(x, y - 3, x + 5, y);
}

function drawCloud(x, y) {
  noStroke();
  fill(255, 255, 255, 200);
  ellipse(x, y, 60, 30);
  ellipse(x + 20, y + 10, 80, 40);
  ellipse(x - 20, y + 10, 80, 40);
}

function drawTree(x, y) {
  fill(139, 69, 19); // Brown color for trunk
  rect(x, y, 20, 40); // Draw trunk
  fill(34, 139, 34); // Green color for leaves
  triangle(x - 30, y, x + 10, y - 50, x + 50, y); // Draw leaves
}
