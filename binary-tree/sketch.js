var tree;

var MIN = 1,
    MAX = 50;

function setup() {

    tree = new Tree();

    for (var i = 0; i < 1000; i++) {
        tree.add(
            Math.floor(random(MIN, MAX))
        );
    }
    colorMode(HSB);
    createCanvas(windowWidth, windowHeight - 60);

}

function draw() {
    background(51);
    drawTree(tree);
}

function drawTree(t) {
    function levelAmount(level) {
        if (level == 1) return 1;
        return 2 * levelAmount(level - 1);
    }
    var levels = t._maxLevel;
    // Draw horizontal lines separating each level
    // stroke(255);
    // for (var i = 0; i < levels; i++) {
    //     var y = i * (height / levels);
    //     line(0, y, width, y);
    // }
    textAlign(CENTER, CENTER);
    textSize(14);
    t.traverse(function(n) {
        noStroke();
        fill(0);
        text(n.value, x, y);
        stroke(255);
        var x = (n.x - 0.5) * width / levelAmount(n._level);
        var y = (n.y - 0.5) * height / levels;
        if (n.left != null) {
            var x2 = (n.left.x - 0.5) * width / levelAmount(n.left._level);
            var y2 = (n.left.y - 0.5) * height / levels;
            line(x, y, x2, y2);
        }
        if (n.right != null) {
            var x2 = (n.right.x - 0.5) * width / levelAmount(n.right._level);
            var y2 = (n.right.y - 0.5) * height / levels;
            line(x, y, x2, y2);
        }
        stroke(255);
        fill(map(n.value, MIN, MAX, 0, 360), 255, 255);
        ellipse(x, y, 30, 30);
        noStroke();
        fill(0);
        text(n.value, x, y);
    });
}