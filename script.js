//Matriz do jogo
var grids = [
    [
        ['9',' ',' ',' ',' ',' ','3',' ',' '],
        [' ',' ','7',' ',' ','8',' ',' ',' '],
        [' ','1',' ',' ','9',' ','2',' ','8'],

        [' ','3','2',' ',' ',' ','9','6',' '],
        [' ','4',' ',' ',' ',' ',' ',' ','2'],
        [' ',' ',' ','8','4',' ',' ',' ','7'],

        [' ',' ',' ','1','5',' ',' ',' ',' '],
        [' ',' ',' ','6','3',' ',' ',' ','1'],
        ['5','6',' ',' ',' ','9',' ',' ',' '],
    ],
    [
        ['5','3',' ',' ','7',' ',' ',' ',' '],
        ['6',' ',' ','1','9','5',' ',' ',' '],
        [' ','9','8',' ',' ',' ',' ','6',' '],

        ['8',' ',' ',' ','6',' ',' ',' ','3'],
        ['4',' ',' ','8',' ','3',' ',' ','1'],
        ['7',' ',' ',' ','2',' ',' ',' ','6'],

        [' ','6',' ',' ',' ',' ','2','8',' '],
        [' ',' ',' ','4','1','9',' ',' ','5'],
        [' ',' ',' ',' ','8',' ',' ','7','9'],
    ],
    [
        [' ',' ','5',' ',' ',' ',' ',' ',' '],
        [' ','6','2',' ',' ',' ',' ','3',' '],
        ['3','7',' ',' ','2',' ',' ',' ',' '],

        [' ',' ',' ','2',' ',' ',' ',' ',' '],
        [' ','1','8',' ','9',' ','5',' ','4'],
        ['4',' ','6',' ',' ',' ',' ','8',' '],

        [' ','3',' ','6',' ',' ',' ','9',' '],
        [' ',' ',' ',' ',' ',' ',' ','2',' '],
        [' ',' ','7','5',' ','9','3','6',' '],
    ]
];

function renderBoard(){
    var table = document.getElementById('table');
    table.innerHTML = '';
    for(var y=0; y<9; y++){
        var newLine = document.createElement('tr');
        if(y==3 || y==6){
            var emptyLine = document.createElement('tr');
            for(var x=0; x<9; x++){
                var emptyColumn = document.createElement('td');
                emptyColumn.setAttribute('id', 'empty');
                emptyLine.appendChild(emptyColumn);
            }
            table.appendChild(emptyLine);
        }

        for(var x=0; x<9; x++){
            var newColumn = document.createElement('td');
            if(x==3 || x==6){
                var emptyColumn = document.createElement('td');
                emptyColumn.setAttribute('id', 'empty');
                newLine.appendChild(emptyColumn);
            }

            if(grid[y][x]!=' '){
                newColumn.innerHTML = grid[y][x];
            }
            else{
                var inputEl = document.createElement('input');
                newColumn.appendChild(inputEl);
            }
            newLine.appendChild(newColumn);
        }
        table.appendChild(newLine);
    }
}

//Define se é possível colocar o número lá
function isPossible(number, xAxis, yAxis){
    for(var y=0; y<9; y++){
        if(grid[y][xAxis]==number){
            return false;
        }
    }
    for(var x=0; x<9; x++){
        if(grid[yAxis][x]==number){
            return false;
        }
    }
    var x0=Math.floor(xAxis/3)*3;
    var y0=Math.floor(yAxis/3)*3;
    for(var i=0; i<3; i++){
        for(var j=0; j<3; j++){
            if(grid[y0+i][x0+j]==number){
                return false;
            }
        }
    }
    return true;
}

function solve(){
    for(var y=0; y<9; y++){
        for(var x=0; x<9; x++){
            if(grid[y][x]==' '){
                for(var n=1; n<=9; n++){
                    if(isPossible(n, x, y)){
                        grid[y][x]=''+n;
                        solve();
                        grid[y][x]=' ';
                    }
                }
                return; 
            }
        }
    }
    console.table(grid);
    renderBoard();
    return;
}

function newGame(){
    grid = grids[Math.floor(Math.random() * 3)];
    renderBoard();
}