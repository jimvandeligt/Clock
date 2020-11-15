const numbers = {
  ONE: "1",
  TWO: "2",
  THREE: "3",
  FOUR: "4",
  FIVE: "5",
  SIX: "6",
  SEVEN: "7",
  EIGHT: "8",
  NINE: "9",
  TEN: "10",
  ELEVENT: "11",
  TWELVE: "12"
}

window.onload = function() {
  var clock = new Clock();

  clock.setup();
  clock.play();
}

function Clock(){
  this.canvas;
  this.ctx;
  this.radius;
  this.sound;
  this.volume = 0.2;

  var nThis = this;

  this.setup = function(){
    this.canvas = document.getElementById("clock")
    this.ctx = this.canvas.getContext("2d")

    this.radius = this.canvas.height / 2;
    this.ctx.translate(this.radius, this.radius);
    this.radius = this.radius * 0.90;

    this.sound = new Audio("media/clock.mp3");
  }

  this.drawFace = function(){
    // Face
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = '#F6F28E'
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.fillStyle = '#333';
    this.ctx.fill();
  }

  this.drawNumbers = function(){
    var ang;
    var num;
    this.ctx.font = this.radius * 0.15 + "px Montserrat";
    this.ctx.textBaseline = "middle";
    this.ctx.textAlign = "center";

    var numberArray = Object.values(numbers)
    for(num = 1; num <= 12; num++){
      ang = num * Math.PI / 6;
      this.ctx.rotate(ang);
      this.ctx.translate(0, -this.radius * 0.85);
      this.ctx.rotate(-ang);
      this.ctx.fillText(numberArray[num-1].toString(), 0, 0);
      this.ctx.rotate(ang);
      this.ctx.translate(0, this.radius * 0.85);
      this.ctx.rotate(-ang);
    }
  }

  this.drawTime = function(){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour = hour%12;
    hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
    this.drawHand(hour, this.radius*0.5, this.radius*0.03);
    //minute
    minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
    this.drawHand(minute, this.radius*0.8, this.radius*0.02);
    // second
    second = (second*Math.PI/30);
    this.drawHand(second, this.radius*0.9, this.radius*0.005);
  }

  this.drawHand = function(pos, length, width) {
    this.ctx.beginPath();
    this.ctx.lineWidth = width;
    this.ctx.lineCap = "round";
    this.ctx.moveTo(0,0);
    this.ctx.rotate(pos);
    this.ctx.lineTo(0, -length);
    this.ctx.stroke();
    this.ctx.rotate(-pos);
  }

  this.drawClock = function(){
    nThis.drawFace();
    nThis.drawNumbers();
    nThis.drawTime();
  }

  this.playSound = function(){
      nThis.sound.play();
      nThis.sound.volume = nThis.volume;
  }

  this.play = function(){
    setInterval(this.drawClock, 1000);
    setInterval(this.playSound, 1000);
  }
}
