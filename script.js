var Val=0
var arr=[]
var arr1=[[1,2,3], [4,5,6], [7,8,9], [1,5,9], [3,5,7], [8,5,2], [1,4,7], [3,6,9]]
var arr2=[[1,2,3], [4,5,6], [7,8,9], [1,5,9], [3,5,7], [8,5,2], [1,4,7], [3,6,9]]
var pxScore = 0
var poScore = 0
var ROUND=1
var END = 0


function handleCellClick(event){

    document.querySelector(".game--restart").style.backgroundColor = "#1ed86c"
    document.querySelector(".game--restart").style.color = "black"
    let element = event.target
    if(isOveriding(arr, element.getAttribute("data-cell-index"))){
            document.querySelector(".game--status").textContent = "You cannot Overwrite!!!";
        return
    }
    if(END == 0){
        let symbol = Val ? "O" : "X";
        element.style.color = Val ? "#8ba100" : "#a18b00";
        element.textContent = symbol;
        let iswin = handleWin(Val, element.getAttribute("data-cell-index"))
        if(iswin == true){
            document.querySelector(".game--status").textContent = "Player " + (Val ? "O" : "X") + " won the match";
            if(Val==1) pxScore+=1
            if(Val==0) poScore+=1
            document.querySelector(".score-cell1").textContent = "Player X Score: "+ poScore
            document.querySelector(".score-cell2").textContent = "Player O Score: "+ pxScore
            END = 1
            return
        }
        else if(arr.length == 9){
            document.querySelector(".game--status").textContent = "Match Draw!!!"
            END = 1
            return
        }
        Val = Val==1 ? 0 : 1 ;
        document.querySelector(".game--status").textContent = "Its " + (Val ? "O" : "X") + " turn";
    }
}

function handleRestart(){
    document.querySelector(".game--restart").style.backgroundColor = "#cfcfcfa5"
    document.querySelector(".game--restart").style.color = "#959595c4"
    let cells = document.querySelectorAll('.cell')
    ROUND = END==1 ? ROUND+=1: ROUND;
    document.querySelector(".round").textContent = "Round "+ROUND
    END = 0
    arr1=[[1,2,3], [4,5,6], [7,8,9], [1,5,9], [3,5,6], [8,5,2], [1,4,7], [3,6,9]]
    arr2=[[1,2,3], [4,5,6], [7,8,9], [1,5,9], [3,5,6], [8,5,2], [1,4,7], [3,6,9]]
    arr=[];
    for(let i of cells){
        i.textContent = '';
    }
    
}

function isOveriding(arr, x){
    for(let i of arr){
        if(i==x){
            return true
        }
    }
    arr.push(x);
    return false
}

function handleWinArray(arr, posn){
    for(let i of arr){
        for(let j=0; j<i.length; j++){
            if(i[j] == posn){
                i.splice(j, 1)
            }
        }
        if(i.length == 0){
            return true
        }
    }
    return false
}

function handleWin(Val, posn){
    if(Val == 1){
        return handleWinArray(arr1, posn )
    }
    else if(Val==0){
        return handleWinArray(arr2,posn )
    }
}


document.querySelectorAll('.cell').forEach((cell) =>{ cell.addEventListener('click', handleCellClick)});
document.querySelector('.game--restart').addEventListener('click', handleRestart);