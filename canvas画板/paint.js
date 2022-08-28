let canvas = document.getElementById("drawing-board");
let ctx = canvas.getContext("2d");
let eraser = document.getElementById("eraser");
let brush = document.getElementById("brush");
let reSetCanvas = document.getElementById("clear");
let aColorBtn = document.getElementsByClassName("color-item");
let bColorBtn = document.getElementsByClassName("bgColor-item");
let font = document.querySelectorAll('.font');
let save = document.getElementById("save");
let undo = document.getElementById("undo");
let range = document.getElementById("range");
let clear = false;
let activeColor = 'black';
let lWidth = 4;
let bgColor = 'white';



setCanvasBg(bgColor);
listenToUser(canvas);

getbgColor();
getColor();

let pageWidth = document.documentElement.clientWidth;
let pageHeight = document.documentElement.clientHeight;

canvas.width = pageWidth;
canvas.height = pageHeight;


function setCanvasBg(bgColor) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = bgColor;
}

function listenToUser(canvas) {
    let painting = false;
    let lastPoint = { x: undefined, y: undefined };

    canvas.onmousedown = function (e) {
        this.firstDot = ctx.getImageData(0, 0, canvas.width, canvas.height);//在这里储存绘图表面
        saveData(this.firstDot);
        painting = true;
        let x = e.clientX;
        let y = e.clientY;
        lastPoint = { "x": x, "y": y };
        ctx.save();
        drawCircle(x, y, 0);
    };
    canvas.onmousemove = function (e) {
        if (painting) {
            let x = e.clientX;
            let y = e.clientY;
            let newPoint = { "x": x, "y": y };
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y, clear);
            lastPoint = newPoint;
        }
    };

    canvas.onmouseup = function () {
        painting = false;
    };

    canvas.mouseleave = function () {
        painting = false;
    }
}

function drawCircle(x, y, radius) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    if (clear) {
        ctx.clip();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
    }
}

function drawLine(x1, y1, x2, y2) {
    ctx.lineWidth = lWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (clear) {
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
        ctx.clip();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
    } else {
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
    }
}

range.onchange = function () {
    lWidth = this.value;
};

eraser.onclick = function () {
    clear = true;
    this.classList.add("active");
    brush.classList.remove("active");
};

brush.onclick = function () {
    clear = false;
    this.classList.add("active");
    eraser.classList.remove("active");
};

reSetCanvas.onclick = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasBg('white');
};

save.onclick = function () {
    let imgUrl = canvas.toDataURL("image/png");
    let saveA = document.createElement("a");
    document.body.appendChild(saveA);
    saveA.href = imgUrl;
    saveA.download = "zspic" + (new Date).getTime();
    saveA.target = "_blank";
    saveA.click();
};

function getColor() {
    for (let i = 0; i < aColorBtn.length; i++) {
        aColorBtn[i].onclick = function () {
            for (let i = 0; i < aColorBtn.length; i++) {
                aColorBtn[i].classList.remove("active");
                this.classList.add("active");
                activeColor = this.style.backgroundColor;
                ctx.fillStyle = activeColor;
                ctx.strokeStyle = activeColor;
            }
        }
    }
}

function getbgColor() {
    for (let i = 0; i < bColorBtn.length; i++) {
        bColorBtn[i].onclick = function () {
            for (let i = 0; i < bColorBtn.length; i++) {
                bColorBtn[i].classList.remove("active");
                this.classList.add("active");
                bgColor = this.style.backgroundColor;
                setCanvasBg(bgColor)
            }
            console.log(bgColor);
            if (bgColor == 'black') {
                for (let j = 0; j < font.length;j++){
                    console.log(font[j].innerHTML);
                    font[j].style.color = 'white'
                }
            }else{
                for (let j = 0; j < font.length;j++){
                    console.log(font[j].innerHTML);
                    font[j].style.color = 'black'
                }
            }
        }
    }
}

let historyDeta = [];

function saveData(data) {
    (historyDeta.length === 10) && (historyDeta.shift());// 上限为储存10步
    historyDeta.push(data);
}

undo.onclick = function () {
    if (historyDeta.length < 1) return false;
    ctx.putImageData(historyDeta[historyDeta.length - 1], 0, 0);
    historyDeta.pop()
};
