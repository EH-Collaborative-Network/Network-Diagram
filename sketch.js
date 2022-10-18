
var noConn = 50;
var gravityConstant = 1.1;
var forceConstant = 4000;
var physics = true;

var nodes = [];
var nodeCon = [];
var clicked = false;
var lerpValue = 0.2;
var startDisMultiplier = 1;
var closeNode;
var closeNodeMag;
const cats = [

  "Author for Volume",
  "Artist for Volume",
  "Artist for Exhibition",
  "RV Member",
  "CoLing Member",
  "Website Contributor",
  "Author for Spec. Edition",
  "Editorial Team for Volume"

]

const catsColors = [

    "#D08270",
    "#F2CDA2",
    "#DDBD5C",
    "#BDD6AC",
    "#A8C3C8",
    "#A9C0F0",
    "#B2A7D3",
    "#CDA7BC"
  
  ]
const people = [
  {"name": "Gwyneira Issac", "connections":[7,3,0]},
  {"name": "Stanisław Kordasiewicz", "connections":[7,4,0]},
  {"name": "Jesse van Amelsvoort", "connections":[7,4,0,6]},
  {"name": "Sylvia Ngo", "connections":[7]},
  {"name": "Madison King", "connections":[7,3]},
  {"name": "Chynara Bakyt Kyzyl and Aisha Manasova", "connections":[0]},
  {"name": "Anastasiia Alekseeva", "connections":[0]},
  {"name": "Nancy Maryboy and David Begay ", "connections":[0]},
  {"name": "Karina Lamb", "connections":[0]},
  {"name": "Omar Aguilar Sánchez, Izaira López Sánchez", "connections":[0]},
  {"name": "Jully Acuna", "connections":[0]},
  {"name": "Caio Simoes", "connections":[0]},
  {"name": "Hau olihiwahiwa Moniz", "connections":[0]},
  {"name": "Tomasz Wicherkiewicz", "connections":[0, 7,4]},
  {"name": "Evan Hepler Smith", "connections":[0]},
  {"name": "Mukarum Toktogulova", "connections":[0]},
  {"name": "Lena Chen", "connections":[0]},
  {"name": "Kseniia Utievska", "connections":[0]},
  {"name": "Michelle Daigle", "connections":[0]},
  {"name": "Tania Eulalia Martinez-Cruz, et al.", "connections":[0]},
  {"name": "Kyle Napier", "connections":[0]},
  {"name": "Kyunney Takasaeva", "connections":[0,7]},
  {"name": "Joey Chin", "connections":[0]},
  {"name": "Conal McCarthy", "connections":[0]},
  {"name": "Justyna Majerska-Sznajder", "connections":[0]},
  {"name": "Linda Sanchez", "connections":[0]},
  {"name": "Hōkūokahalelani Pihana, et al.", "connections":[0]},
  {"name": "Laura Gibson and Kristy Stone", "connections":[0]},
  {"name": "Ann Ang", "connections":[0]},
  {"name": "María Fernanda Olarte-Sierra", "connections":[0]},
  {"name": "Jamie Wong", "connections":[0]},
  {"name": "Kólá Túbosún", "connections":[0]},
  {"name": "Bina Brody", "connections":[0]},
  {"name": "Jorge Cano and Jorge Anselmo", "connections":[0]},
  {"name": "Djambawa Marawili, Howard Morphy", "connections":[0]},
  {"name": "Theodoros Kouros and Yiannis Christidis", "connections":[0]},
  {"name": "Sara Schneiderman, Mark Turin, et al.", "connections":[0]},
  {"name": "Tymoteusz Król", "connections":[0]},
  {"name": "Elias Wessel", "connections":[1]},
  {"name": "Jonathan Mayers", "connections":[1]},
  {"name": "Sayo’:kla Kindness Williams", "connections":[0, 2]},
  {"name": "Silvia Quattrini", "connections":[0]},
  {"name": "Leili Sreberny-Mohammadi", "connections":[6]},
  {"name": "Maria Bucur", "connections":[6]},
  {"name": "Dorell Ben", "connections":[5]},
  {"name": "Kanshouwa Susie", "connections":[5]},
  {"name": "Xia Meng", "connections":[5]},
  {"name": "Teresa Flores", "connections":[5]},
  {"name": "Zhoran Deng", "connections":[5]},
  {"name": "Zaynab Ali", "connections":[5]},
  {"name": "Zihwan", "connections":[5]},
  {"name": "Sofia De Los Angeles Grosso", "connections":[5]},
  {"name": "Ally Zlatar", "connections":[5,1]},
  {"name": "Keith Wilson", "connections":[2,1]},
  {"name": "Guarina Lopez", "connections":[1]},
  {"name": "Luz María Sánchez", "connections":[2,1]},
  {"name": "April A.H. Drexel, et al. ", "connections":[1]},
  {"name": "Trudy Borenstein-Sugiura", "connections":[1]},
  {"name": "Gabriella Zeno", "connections":[1]},
  {"name": "Dominique Angela Juntado", "connections":[1]},
  {"name": "Jenny Miller", "connections":[1,2]}
]
let noNodes = people.length;
function setup() {
  rectMode(CENTER)
  createCanvas(window.outerWidth, 1000);
  fill('#333')
  stroke("#333")
  nodes.push(new Node(createVector(0,0), 100,"To Be Named",[0,1,2,3,4,5,6,7], "#BCC2C3"));
  for (let i = 0; i < cats.length; i++) {
    let x = random(-startDisMultiplier*width , startDisMultiplier*width)
    let y = random(-startDisMultiplier*height , startDisMultiplier*height)
    node = new Node(createVector(x, y), 10, cats[i], [], catsColors[i])
    nodes.push(node);
  }
  for (let i = 0; i < noNodes; i++) {
    let x = random(-startDisMultiplier*width , startDisMultiplier*width)
    let y = random(-startDisMultiplier*height , startDisMultiplier*height)
    node = new Node(createVector(x, y), 10, people[i].name, people[i].connections, "#333")
    nodes.push(node);
  }
  closeNode = nodes[0]

  let connected = new Set()

  
  for (let n = 0; n < nodes.length; n++) {
  
    if (nodes[n].connections.length > 0){
      for(j = 0; j < nodes[n].connections.length; j++){
        nodeCon.push([
          n,
          nodes[n].connections[j] + 1,
          random(100, 300)
        ])
      
      }

    }
  }
}

function draw() {
  translate(width / 2, height / 2)
  background("#ECF6F5");
    nodeCon.forEach(con => {
    node1 = nodes[con[0]]
    node2 = nodes[con[1]]
      stroke(51,51,51,100)
      if(node1.colors !== "#333"){
        stroke(node1.colors)
      }else if(node2.colors !== "#333"){
        stroke(node2.colors)
      }else{
        stroke("#333")
      }
    line(node1.pos.x, node1.pos.y,
      node2.pos.x, node2.pos.y)
  })
  applyForces(nodes)
  nodes.slice().reverse().forEach(node => {
    node.draw()
    if (physics) {
      node.update()
    }
  })
  if (clicked == true) {
    let mousePos = createVector(mouseX-width/2, mouseY-height/2)
    closeNode.pos.lerp(mousePos, lerpValue)
    if (lerpValue < 0.95) {
        lerpValue+=0.02;
    }
  }
}

function touchStarted() {
    clicked = true
    let mousePos = createVector(mouseX-width/2, mouseY-height/2)
    nodes.forEach((node)=>{
      if (mousePos.copy().sub(node.pos).mag() - closeNode.mass/(2 * PI) < mousePos.copy().sub(closeNode.pos).mag() - closeNode.mass/(2 * PI))
        closeNode = node;
    })
}

function touchEnded() {
    clicked = false
    lerpValue = 0.2
}

function applyForces(nodes) {

  // apply force towards centre
  nodes.forEach(node => {
    gravity = node.pos.copy().mult(-1).mult(gravityConstant)
    node.force = gravity
  })

  // apply repulsive force between nodes
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      pos = nodes[i].pos
      dir = nodes[j].pos.copy().sub(pos)
      force = dir.div(dir.mag() * dir.mag())
      force.mult(forceConstant)
      nodes[i].force.add(force.copy().mult(-1))
      nodes[j].force.add(force)
    }
  }

  // apply forces applied by connections
  nodeCon.forEach(con => {
    let node1 = nodes[con[0]]
    let node2 = nodes[con[1]]
    let maxDis = con[2]
    let dis = node1.pos.copy().sub(node2.pos)

    diff = dis.mag() - maxDis
    if(node1.colors == "#333" || node2.colors == "#333"){
        node1.force.sub(dis)
        node2.force.add(dis)
    }else{
        node2.force.add(dis/2)
    }
    
  })
}

function Node(pos, size, name, connections, c) {
  this.pos = pos
  this.force = createVector(0, 0)
  this.mass = (2 * PI * size)/1.5
  if(size == 1){
    this.mass = (2 * PI * size)*10 
  }
  this.size = size
  this.fs = []
  this.colors = c
  this.name = name;
  this.connections = connections
}

Node.prototype.update = function() {
  force = this.force.copy()
  vel = force.copy().div(this.mass)
  this.pos.add(vel)
}

Node.prototype.draw = function() {
  noStroke()
  let s = 1;
  let c;

  c = this.colors
  

  fill(c)
  ellipse(this.pos.x, this.pos.y, s, s)
  if(c !== "#333"){
    stroke(c)
    fill(c)
    strokeWeight(4)
  }else{
    strokeWeight(1)
    stroke(51,51,51,100)
    fill("#ECF6F5")
  }
  let h;
  let m;
  if(c == "#BCC2C3"){
    textSize(14)
    h = 18
    m = 4
  }else{
    textSize(10)
    h = 12
    m = 2
  }
  let w = textWidth(this.name);
  rect(this.pos.x, this.pos.y - m, w + 10, 20, 15)
  fill(51,51,51,255)
  noStroke()
  strokeWeight(2)
  text(this.name, this.pos.x - w/2, this.pos.y + 2)
}