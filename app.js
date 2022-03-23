//https://developer.mozilla.org/ko/docs/Web/API/Canvas_API/Tutorial

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); // 2d로 작업을 구성
const color = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const INITIAL_COLOR = "";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE; // 캔버스의 크기 지정 pixel modifier

ctx.fillStyle = "white";
ctx.strokeStyle = INITIAL_COLOR; // 선의 색
ctx.lineWidth = 2.5; //선의 너비
// ctx.fillStyle = INITIAL_COLOR;

// ctx.fillRect(50, 20, 100, 49);

let painting = false; //기본적으로 그리지 않는 상태
let filling = false; //색으로 채워지지 않은 상태

function stopPainting(){
    painting = false; // 그리기 끝
}
function startPainting(){
    painting = true; //그리기 시작
}


function onMouseMove(event){
    // console.log(event);
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){ //그림 그리지 않을 때
        ctx.beginPath(); // path를 만들기 시작 (path는 우리가 그리는 선을 의미함)
        ctx.moveTo(x, y); // 특정 위치로 이동 (이 곳 부터 그림이 시작될 것이다. 하지만 아직 그림이 그려지진 않는다)
    } else{ //그림을 그리고 있을 때
        ctx.lineTo(x, y); // 선을 특정 위치로 이동 시킴(마우스를 움직이는 내내 발생)
        ctx.stroke(); // 획을 긋는 역할을 함(그림이 실제로 그려짐)
    }
    // console.log(x, y);

}

function onMouseUp(event){ // 클릭 안할 때
    stopPainting()
}
function handleColorClick(event){
    // console.log(event.target.style);
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}
function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else{
        filling = true;
        mode.innerText = "Paint";
    }
}
function handleCanvasClick(){
    if(filling === true){
        ctx.fillRect(0, 0, canvas.width,canvas.height);
    }
    
}
function handleCM(event){
    event.preventDefault(); // 우클릭 방지
}
function handleSaveClick(){
    const image = canvas.toDataURL("image/jpeg");
//     console.log(image);
    const link = document.createElement("a");
    link.href = image; // url
    link.download = "PaintJS";
    // console.log(link);
    link.click();
 }

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove); //마우스가 움직일 때
    canvas.addEventListener("mousedown", startPainting); //클릭을 했을 때
    canvas.addEventListener("mouseup", stopPainting);// 클릭을 땠을 때
    canvas.addEventListener("mouseleave", stopPainting); //캔버스에서 이탈했을 때
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM); // 우클릭 방지(우클릭 메뉴를 눌렀을 때 handleCM함수가 실행되도록 함)
}
if(color){
    Array.from(color).forEach(color => 
    color.addEventListener("click", handleColorClick));
}


if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}
if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}