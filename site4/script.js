/* parte 1 funciona 

window.onload = function () { // isto é um événement criado para que quando a janela se charge tu executas esta funçao.

    var canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 600;
    canvas.style.border = "1px solid";
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(30 , 30, 100, 50);
}
fim da parte 1 */

/* parte 2 criar animaçao do rectangulo
window.onload = function () {

    var canvas;
    var ctx;
    var delay = 100; - muda-se este para aumentar a velocidade de mudança do lugar do rectangulo;
    var xCoord = 0;
    var yCoord = 0;

    init();

    function init()
    {
        canvas = document.createElement('canvas');
        canvas.width = 900;
        canvas.height = 600;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);-agregar o documento ao HTML(no head tem la tb o nome deste doc js;)
        ctx = canvas.getContext('2d');
        refreshCanvas(); - chamar a funçao para a executar senao nd acontece;
    }
    
    function refreshCanvas() 
    {
        xCoord += 5;
        yCoord +=5;
        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(xCoord , yCoord, 100, 50);
        setTimeout(refreshCanvas,delay); - estabelcer o tempo de espera para a mudança de lugar;
    }

}
fim da parte 2*/

/* para fazer a serpente temos de ver o canvas como dividido em quadrados de tamanhos iguais que farao o corpo da serpente */


/* para criar o corpo da serpente. eu criei duas serpentes porque quis: snakee e snakee2.

window.onload = function () {

    
    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 100; 
    var snakee;
    var snakee2;

    init();

    function init()
    {
        var canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        snakee = new Snake([[6,4], [5,4], [4,4]]);
        snakee2 = new Snake([[6,6], [5,6], [4,6], [3,6]]);
        refreshCanvas(); 
    }
    
    function refreshCanvas() 
    {
        
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = "#ff0000";
        snakee.draw();
        snakee2.draw();
        setTimeout(refreshCanvas,delay); 
    }

    function drawBlock (ctx, position)
    {  console.log("antes" + position);
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);

        console.log ("depois " + position);
    }
   

    function Snake(body)
    {
        this.body = body;
        this.draw = function()
        { console.log("draw antes " + body);
           ctx.save();
           ctx.fillStyle = "#ff0000";
           for(var i = 0; i < this.body.length; i++){
               console.log("antes for draw" + i);
               drawBlock(ctx, this.body[i]);
           }
           ctx.restore();    
        };
    }
} */

/* criar corpo + movimento:
window.onload = function () {


    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 100;
    var snakee;


    init();

    function init() {
        var canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        snakee = new Snake([[6, 4], [5, 4], [4, 4]]);
        refreshCanvas();
    }

    function refreshCanvas() {

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        // esta parte foi retirada entretanto:  ctx.fillStyle = "#ff0000";
        snakee.advance(); // esta parte ja faz parte da fase de a fazer avnçar no canvas; 
        snakee.draw();
        setTimeout(refreshCanvas, delay);
    }

    function drawBlock(ctx, position) {  //console.log("antes" + position); 
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);

        //console.log ("depois " + position);
    }


    function Snake(body, direction) {
        this.body = body;
        this.draw = function () { //console.log("draw antes " + body);
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for (var i = 0; i < this.body.length; i++) {
                //console.log("antes for draw" + i);
                drawBlock(ctx, this.body[i]);
            }
            ctx.restore();
        } //até aqui criou-se 1 serpente com tres cubos de tamanho 
          // agora ara a fazer avançar no canvas acrescenta-e esta parte + chamar a funçao advance na function refresh Canvas
        this.advance = function () {
            var nextPosition = this.body[0].slice();
            nextPosition[0] += 1;
            this.body.unshift(nextPosition);
            this.body.pop();
        };
    } // até aqui entao criou-se o corpo da serpente et demos-lhe movimento.
    */

/* agora vamos aprender a dirigi-la com as setas do teclado. Dar-lhe direçao:

window.onload = function () {


    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 100;
    var snakee;


    init();

    function init() {
        var canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        snakee = new Snake([[6, 4], [5, 4], [4, 4]], "right");
        refreshCanvas();
    }

    function refreshCanvas() {

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        snakee.advance();
        snakee.draw();
        setTimeout(refreshCanvas, delay);
    }

    function drawBlock(ctx, position) {
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);
    }


    function Snake(body, direction) { // acrescentou-se aqui outro parametro, direction
        this.body = body;
        this.direction = direction;
        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for (var i = 0; i < this.body.length; i++) {
                drawBlock(ctx, this.body[i]);
            }
            ctx.restore();
        }
        this.advance = function () {
            var nextPosition = this.body[0].slice();
            // nextPosition[0] += 1; - esta parte foi apagada pk so a fazia mexer à direita e inscrita no switch para  direcao da direita;
            switch (this.direction) { // acrescentou-se este switch para indicar as direçoes;
                case "left":
                    nextPosition[0] -= 1;
                    break;
                case "right":
                    nextPosition[0] += 1;
                    break;
                case "down":
                    nextPosition[1] += 1; // faz parte da coordenada Y
                    break;
                case "up":
                    nextPosition[1] -= 1;
                    break;
                default: // o default é uma pratica "obrigatoria", boa, deve estar sp dentro de um switch
                    throw ("invalid direction") // lança uma mensagem de erro
            }
            this.body.unshift(nextPosition);
            this.body.pop();
        }; //depois de criar o switch de onkeydown, cria-se este novo método/function
        this.setDirection = function (newDirection) {
            var allowDirections;
            switch (this.direction) {
                case "left":
                case "right":
                    allowDirections = ["up", "down"]
                    break;
                case "down":
                case "up":
                    allowDirections = ["left", "right"]
                    break;
                default: // o default é uma pratica "obrigatoria", boa, deve estar sp dentro de um switch
                    throw ("Invalid Direction") // lança uma mensagem de erro

            } //agora pergunta-se se a direction e permitida 
            if (allowDirections.indexOf(newDirection) > -1) { // qaundo se quer saber se down esta entre as allowdirections permitidas

                this.direction = newDirection;
            }
        };
    }
    //cria-se um outro evenement (o anterior tinha sido o onload) para reagir ao toque das teclas para que o switch reaja em funçao do que o utilisador toca no teclado.

    document.onkeydown = function handleKeyDown(e) {
        var key = e.keyCode;
        var newDirection;
        switch (key) { // e preciso saber que cada tecla tem um codigo. ele disse-nos que 37,38,39,40
            case 37:
                newDirection = "left";
                break;
            case 38:
                newDirection = "up";
                break;
            case 39:
                newDirection = "right";
                break;
            case 40:
                newDirection = "down";
                break;
            default: // o default é uma pratica "obrigatoria", boa, deve estar sp dentro de um switch
                return; // este nao lança uma mensagem de erro como os outro defaults nos estamos a pedir-lhe que ele nao continua a funçao, para de executar.
        }
        snakee.setDirection(newDirection); // chamar a funçao setDirection;
    }
// agora a cobra mexe-se em funaçao das nossas teclas!!! Super!!!
} */

// Agora vamos dar uma maça à serpente :) 

/* window.onload = function () {


    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 100;
    var snakee;
    var applee; // depois de ter criado a funçao Apple declara-se esta variavel;


    init();

    function init() {
        var canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        snakee = new Snake([[6, 4], [5, 4], [4, 4]], "right");
        applee = new Apple([10,10]);// acrescenta-se esta sabendo k a funçao construtora (Apple)pedia um bloc de 10 p 10;
        
        
        refreshCanvas();
    }

    function refreshCanvas() {

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        snakee.advance();
        snakee.draw();
        applee.draw();// no fim de tudo, chamar a funçao da maça pra que a maça apareça la no canvas na pagina da net
        
        
        setTimeout(refreshCanvas, delay);
    }

    function drawBlock(ctx, position) {
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);
    }


    function Snake(body, direction) { 
        this.body = body;
        this.direction = direction;
        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for (var i = 0; i < this.body.length; i++) {
                drawBlock(ctx, this.body[i]);
            }
            ctx.restore();
        }
        this.advance = function () {
            var nextPosition = this.body[0].slice();
           
            switch (this.direction) { 
                case "left":
                    nextPosition[0] -= 1;
                    break;
                case "right":
                    nextPosition[0] += 1;
                    break;
                case "down":
                    nextPosition[1] += 1; 
                    break;
                case "up":
                    nextPosition[1] -= 1;
                    break;
                default:
                    throw ("invalid direction") 
            }
            this.body.unshift(nextPosition);
            this.body.pop();
        }; 
        this.setDirection = function (newDirection) {
            var allowDirections;
            switch (this.direction) {
                case "left":
                case "right":
                    allowDirections = ["up", "down"]
                    break;
                case "down":
                case "up":
                    allowDirections = ["left", "right"]
                    break;
                default: 
                    throw ("Invalid Direction") 
            } 
            if (allowDirections.indexOf(newDirection) > -1) { 

                this.direction = newDirection;
            }
        };
    }
    
    function Apple(position) { // vamos dar-lhe o k precisa que é uma posiçao
        this.position = position;
        //2° desenhar a maça agora com o method/function seguinte
        this.draw =  function(){ // e recordar o que havia antes para o canvas
            ctx.save();
            ctx.fillStyle = "#33cc33";
            ctx.beginPath();
            var radius = blockSize/2; // tamanho do circulo é um blockSize (um dos quadrados) dividido por dois;
            // a coordenada ocupada nao é nos vertices como nos recatngulos é no centro preciso do circulo, o raio do circulo
            var x = position[0]*blockSize + radius;
            var y = position[1]*blockSize + radius;
            ctx.arc(x,y,radius, 0, Math.PI*2, true);
            ctx.fill();
            ctx.restore();
        };
    }

    document.onkeydown = function handleKeyDown(e) {
        var key = e.keyCode;
        var newDirection;
        switch (key) { 
            case 37:
                newDirection = "left";
                break;
            case 38:
                newDirection = "up";
                break;
            case 39:
                newDirection = "right";
                break;
            case 40:
                newDirection = "down";
                break;
            default: 
                return; 
        }
        snakee.setDirection(newDirection); 
    }
    
} */

// Até aqui demos uma maça estatica a serpente, mas a serpente mexe-se em funçao das nossas teclas das setas que nos carregamos.

//Agora vamos dar um muro a serpente para nao sair do canvas, para ficar sp visivel e que nao passe por cima do seu proprio corpo !!

/* window.onload = function () {


    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 100;
    var snakee;
    var applee; // depois da funçao acrescentamos variaveis
    var widthInBlocks = canvasWidth / blockSize;
    var heightInBlocks = canvasHeight / blockSize;


    init();

    function init() {
        var canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        snakee = new Snake([[6, 4], [5, 4], [4, 4]], "right");
        applee = new Apple([10, 10]);


        refreshCanvas();
    }

    function refreshCanvas() {

        snakee.advance();

        if (snakee.checkCollision()) {
            //GAME OVER
        }
        else {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            snakee.draw();
            applee.draw();
            setTimeout(refreshCanvas, delay);
        }
    }

    function drawBlock(ctx, position) {
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);
    }


    function Snake(body, direction) {
        this.body = body;
        this.direction = direction;
        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for (var i = 0; i < this.body.length; i++) {
                drawBlock(ctx, this.body[i]);
            }
            ctx.restore();
        }
        this.advance = function () {
            var nextPosition = this.body[0].slice();

            switch (this.direction) {
                case "left":
                    nextPosition[0] -= 1;
                    break;
                case "right":
                    nextPosition[0] += 1;
                    break;
                case "down":
                    nextPosition[1] += 1;
                    break;
                case "up":
                    nextPosition[1] -= 1;
                    break;
                default:
                    throw ("invalid direction")
            }
            this.body.unshift(nextPosition);
            this.body.pop();
        };
        this.setDirection = function (newDirection) {
            var allowDirections;
            switch (this.direction) {
                case "left":
                case "right":
                    allowDirections = ["up", "down"]
                    break;
                case "down":
                case "up":
                    allowDirections = ["left", "right"]
                    break;
                default:
                    throw ("Invalid Direction")
            }
            if (allowDirections.indexOf(newDirection) > -1) {

                this.direction = newDirection;
            }
        };
        this.checkCollision = function () //1° criar a funçao que permitera detetar se ha colisao seja c muro seja c  o proprio corpo
        {
            var wallCollision = false;
            var snakeCollision = false;
            var head = this.body[0];
            var rest = this.body.slice(1); // la var i passa ao valor 1;
            var snakeX = head[0];
            var snakeY = head[1];
            var minX = 0;
            var minY = 0;
            var maxX = widthInBlocks - 1;
            var maxY = heightInBlocks - 1;
            var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
            var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

            if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) {
                wallCollision = true;
            }

            for (var i = 0; i < rest.length; i++) {
                if (snakeX === rest[i][0] && snakeY === rest[i][1]) {
                    snakeCollision = true;
                }
            }
            return wallCollision || snakeCollision;

        };
    }

    function Apple(position) {
        this.position = position;

        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#33cc33";
            ctx.beginPath();
            var radius = blockSize / 2;

            var x = position[0] * blockSize + radius;
            var y = position[1] * blockSize + radius;
            ctx.arc(x, y, radius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.restore();
        };
    }

    document.onkeydown = function handleKeyDown(e) {
        var key = e.keyCode;
        var newDirection;
        switch (key) {
            case 37:
                newDirection = "left";
                break;
            case 38:
                newDirection = "up";
                break;
            case 39:
                newDirection = "right";
                break;
            case 40:
                newDirection = "down";
                break;
            default:
                return;
        }
        snakee.setDirection(newDirection);
    }

} */

//Agora a serpente vai comer a maça!!

/* window.onload = function () {


    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 100;
    var snakee;
    var applee; 
    var widthInBlocks = canvasWidth / blockSize;
    var heightInBlocks = canvasHeight / blockSize;


    init();

    function init() {
        var canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        snakee = new Snake([[6, 4], [5, 4], [4, 4]], "right");
        applee = new Apple([10, 10]);


        refreshCanvas();
    }

    function refreshCanvas() {

        snakee.advance();

        if (snakee.checkCollision()) {
            //GAME OVER
        }
        else {
             // 2° ACRESCENTAR AQUI a funçao do ato de comer a maça
            if(snakee.isEatingApple(applee))
            {
                //4° chamar a funçao criada;
               applee.setNewPosition();
            }
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            snakee.draw();
            applee.draw();
            setTimeout(refreshCanvas, delay);
        }
    }

    function drawBlock(ctx, position) {
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);
    }


    function Snake(body, direction) {
        this.body = body;
        this.direction = direction;
        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for (var i = 0; i < this.body.length; i++) {
                drawBlock(ctx, this.body[i]);
            }
            ctx.restore();
        }
        this.advance = function () {
            var nextPosition = this.body[0].slice();

            switch (this.direction) {
                case "left":
                    nextPosition[0] -= 1;
                    break;
                case "right":
                    nextPosition[0] += 1;
                    break;
                case "down":
                    nextPosition[1] += 1;
                    break;
                case "up":
                    nextPosition[1] -= 1;
                    break;
                default:
                    throw ("invalid direction")
            }
            this.body.unshift(nextPosition);
            this.body.pop();
        };
        this.setDirection = function (newDirection) {
            var allowDirections;
            switch (this.direction) {
                case "left":
                case "right":
                    allowDirections = ["up", "down"]
                    break;
                case "down":
                case "up":
                    allowDirections = ["left", "right"]
                    break;
                default:
                    throw ("Invalid Direction")
            }
            if (allowDirections.indexOf(newDirection) > -1) {

                this.direction = newDirection;
            }
        };
        this.checkCollision = function () 
        {
            var wallCollision = false;
            var snakeCollision = false;
            var head = this.body[0];
            var rest = this.body.slice(1); 
            var snakeX = head[0];
            var snakeY = head[1];
            var minX = 0;
            var minY = 0;
            var maxX = widthInBlocks - 1;
            var maxY = heightInBlocks - 1;
            var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
            var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

            if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) {
                wallCollision = true;
            }

            for (var i = 0; i < rest.length; i++) {
                if (snakeX === rest[i][0] && snakeY === rest[i][1]) {
                    snakeCollision = true;
                }
            }
            return wallCollision || snakeCollision;

        };
         //1° criar la méthode/function que indicara a posiçao da maça e da cabeça
        this.isEatingApple = function(appleToEat)
        {
            var head = this.body[0];
            if(head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])
             //como é so uma linha podem tirar-se as {}; 
            return true;
            else
            return false; 
        };
    }

    function Apple(position) {
        this.position = position;

        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#33cc33";
            ctx.beginPath();
            var radius = blockSize / 2;
//por fim, aqui corrigiu-se a var x e y acrescentando "this." a position[0] do x e [1] do y para que a nov
            var x = this.position[0] * blockSize + radius;
            var y = this.position[1] * blockSize + radius;
            ctx.arc(x, y, radius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.restore();
        };
  //3° acrescentar esta méthode/ funcao contrutora para dar uma nova posiçao a maça
        this.setNewPosition = function (){
            var newX = Math.round(Math.random() * (widthInBlocks - 1));
            var newY = Math.round(Math.random() * (heightInBlocks - 1));
            this.position = [newX, newY];
        };
    }

    document.onkeydown = function handleKeyDown(e) {
        var key = e.keyCode;
        var newDirection;
        switch (key) {
            case 37:
                newDirection = "left";
                break;
            case 38:
                newDirection = "up";
                break;
            case 39:
                newDirection = "right";
                break;
            case 40:
                newDirection = "down";
                break;
            default:
                return;
        }
        snakee.setDirection(newDirection);
    }

} */

//Agora como a posiçao da maça e aleatoria como evitar que a maça calhe em cima de uma parte do corpo da serpente? 

/* window.onload = function () {


    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 100;
    var snakee;
    var applee;
    var widthInBlocks = canvasWidth / blockSize;
    var heightInBlocks = canvasHeight / blockSize;


    init();

    function init() {
        var canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        snakee = new Snake([[6, 4], [5, 4], [4, 4]], "right");
        applee = new Apple([10, 10]);


        refreshCanvas();
    }

    function refreshCanvas() {

        snakee.advance();

        if (snakee.checkCollision()) {
            //GAME OVER
        }
        else {
            //2°acrescentar aqui a verificaçao da sobreposiçao aquando do refresh 
            if (snakee.isEatingApple(applee)) {
                
                do{
                    applee.setNewPosition();
                }
                while(applee.isOnSnake(snakee))

                
            }
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            snakee.draw();
            applee.draw();
            setTimeout(refreshCanvas, delay);
        }
    }

    function drawBlock(ctx, position) {
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);
    }


    function Snake(body, direction) {
        this.body = body;
        this.direction = direction;
        
        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for (var i = 0; i < this.body.length; i++) {
                drawBlock(ctx, this.body[i]);
            }
            ctx.restore();
        }
        this.advance = function () {
            var nextPosition = this.body[0].slice();

            switch (this.direction) {
                case "left":
                    nextPosition[0] -= 1;
                    break;
                case "right":
                    nextPosition[0] += 1;
                    break;
                case "down":
                    nextPosition[1] += 1;
                    break;
                case "up":
                    nextPosition[1] -= 1;
                    break;
                default:
                    throw ("invalid direction")
            }
            this.body.unshift(nextPosition);
            this.body.pop();
        };
        this.setDirection = function (newDirection) {
            var allowDirections;
            switch (this.direction) {
                case "left":
                case "right":
                    allowDirections = ["up", "down"]
                    break;
                case "down":
                case "up":
                    allowDirections = ["left", "right"]
                    break;
                default:
                    throw ("Invalid Direction")
            }
            if (allowDirections.indexOf(newDirection) > -1) {

                this.direction = newDirection;
            }
        };
        this.checkCollision = function () {
            var wallCollision = false;
            var snakeCollision = false;
            var head = this.body[0];
            var rest = this.body.slice(1);
            var snakeX = head[0];
            var snakeY = head[1];
            var minX = 0;
            var minY = 0;
            var maxX = widthInBlocks - 1;
            var maxY = heightInBlocks - 1;
            var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
            var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

            if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) {
                wallCollision = true;
            }

            for (var i = 0; i < rest.length; i++) {
                if (snakeX === rest[i][0] && snakeY === rest[i][1]) {
                    snakeCollision = true;
                }
            }
            return wallCollision || snakeCollision;

        };

        this.isEatingApple = function (appleToEat) {
            var head = this.body[0];
            if (head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])
                return true;
            else
                return false;
        };
    }

    function Apple(position) {
        this.position = position;

        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#33cc33";
            ctx.beginPath();
            var radius = blockSize / 2;
            var x = this.position[0] * blockSize + radius;
            var y = this.position[1] * blockSize + radius;
            ctx.arc(x, y, radius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.restore();
        };

        this.setNewPosition = function () {
            var newX = Math.round(Math.random() * (widthInBlocks - 1));
            var newY = Math.round(Math.random() * (heightInBlocks - 1));
            this.position = [newX, newY];
        };

        //1° methode para verificar se a maça esta em cima da cobra
        this.isOnSnake = function (snakeToCheck) {

            var isOnSnake = false;

            for (var i = 0; i < snakeToCheck.body.length; i++) {
                if (this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1]) {
                    isOnSnake = true;
                }
            }
            return isOnSnake;

        };

    }

    document.onkeydown = function handleKeyDown(e) {
        var key = e.keyCode;
        var newDirection;
        switch (key) {
            case 37:
                newDirection = "left";
                break;
            case 38:
                newDirection = "up";
                break;
            case 39:
                newDirection = "right";
                break;
            case 40:
                newDirection = "down";
                break;
            default:
                return;
        }
        snakee.setDirection(newDirection);
    }

} */

// Agora como fazer crescer a serpente a cada maça que come?? 

/* window.onload = function () {


    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 100;
    var snakee;
    var applee;
    var widthInBlocks = canvasWidth / blockSize;
    var heightInBlocks = canvasHeight / blockSize;


    init();

    function init() {
        var canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        snakee = new Snake([[6, 4], [5, 4], [4, 4]], "right");
        applee = new Apple([10, 10]);


        refreshCanvas();
    }

    function refreshCanvas() {

        snakee.advance();

        if (snakee.checkCollision()) {
            //GAME OVER
        }
        else {


            if (snakee.isEatingApple(applee)) {
                //2° definir qaui como true que ela comeu uma maça
                snakee.ateApple = true;
                do {
                    applee.setNewPosition();
                }
                while (applee.isOnSnake(snakee))


            }
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            snakee.draw();
            applee.draw();
            setTimeout(refreshCanvas, delay);
        }
    }

    function drawBlock(ctx, position) {
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);
    }


    function Snake(body, direction) {
        this.body = body;
        this.direction = direction;
        // 1° para saber se a snake comeu uma maça vamos fazer uma propriedade nova
        this.ateApple = false;

        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for (var i = 0; i < this.body.length; i++) {
                drawBlock(ctx, this.body[i]);
            }
            ctx.restore();
        }
        this.advance = function () {
            var nextPosition = this.body[0].slice();

            switch (this.direction) {
                case "left":
                    nextPosition[0] -= 1;
                    break;
                case "right":
                    nextPosition[0] += 1;
                    break;
                case "down":
                    nextPosition[1] += 1;
                    break;
                case "up":
                    nextPosition[1] -= 1;
                    break;
                default:
                    throw ("invalid direction")
            }
            this.body.unshift(nextPosition);
            // 3° se ela comer a maça 
            if (!this.ateApple)
                this.body.pop();
            else
                this.ateApple = false;
        };
        this.setDirection = function (newDirection) {
            var allowDirections;
            switch (this.direction) {
                case "left":
                case "right":
                    allowDirections = ["up", "down"]
                    break;
                case "down":
                case "up":
                    allowDirections = ["left", "right"]
                    break;
                default:
                    throw ("Invalid Direction")
            }
            if (allowDirections.indexOf(newDirection) > -1) {

                this.direction = newDirection;
            }
        };
        this.checkCollision = function () {
            var wallCollision = false;
            var snakeCollision = false;
            var head = this.body[0];
            var rest = this.body.slice(1);
            var snakeX = head[0];
            var snakeY = head[1];
            var minX = 0;
            var minY = 0;
            var maxX = widthInBlocks - 1;
            var maxY = heightInBlocks - 1;
            var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
            var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

            if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) {
                wallCollision = true;
            }

            for (var i = 0; i < rest.length; i++) {
                if (snakeX === rest[i][0] && snakeY === rest[i][1]) {
                    snakeCollision = true;
                }
            }
            return wallCollision || snakeCollision;

        };

        this.isEatingApple = function (appleToEat) {
            var head = this.body[0];
            if (head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])
                return true;
            else
                return false;
        };
    }

    function Apple(position) {
        this.position = position;

        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#33cc33";
            ctx.beginPath();
            var radius = blockSize / 2;
            var x = this.position[0] * blockSize + radius;
            var y = this.position[1] * blockSize + radius;
            ctx.arc(x, y, radius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.restore();
        };

        this.setNewPosition = function () {
            var newX = Math.round(Math.random() * (widthInBlocks - 1));
            var newY = Math.round(Math.random() * (heightInBlocks - 1));
            this.position = [newX, newY];
        };


        this.isOnSnake = function (snakeToCheck) {

            var isOnSnake = false;

            for (var i = 0; i < snakeToCheck.body.length; i++) {
                if (this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1]) {
                    isOnSnake = true;
                }
            }
            return isOnSnake;
        };

    }

    document.onkeydown = function handleKeyDown(e) {
        var key = e.keyCode;
        var newDirection;
        switch (key) {
            case 37:
                newDirection = "left";
                break;
            case 38:
                newDirection = "up";
                break;
            case 39:
                newDirection = "right";
                break;
            case 40:
                newDirection = "down";
                break;
            default:
                return;
        }
        snakee.setDirection(newDirection);
    }

} */

// Para que a cobra nao fique so parada colada a parede do canvas ou quando toca no seu proproio corpo tem de se definir o GameOver e a tecla espaco para rejogar
/*
window.onload = function () {


    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 100;
    var snakee;
    var applee;
    var widthInBlocks = canvasWidth / blockSize;
    var heightInBlocks = canvasHeight / blockSize;


    init();

    function init() {
        var canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        snakee = new Snake([[6, 4], [5, 4], [4, 4]], "right");
        applee = new Apple([10, 10]);


        refreshCanvas();
    }

    function refreshCanvas() {

        snakee.advance();

        if (snakee.checkCollision()) {
           
           //2° chamar a funçao
            gameOver();
        }
        else {


            if (snakee.isEatingApple(applee)) {
                
                snakee.ateApple = true;
                do {
                    applee.setNewPosition();
                }
                while (applee.isOnSnake(snakee))


            }
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            snakee.draw();
            applee.draw();
            setTimeout(refreshCanvas, delay);
        }
    }

    //1° estabelecer que ela escreva "Game Over" no ecran
    function gameOver(){
        ctx.save(); // com isto ele guarda o canvas, a cor, etc
        ctx.fillText("Game Over", 5, 15);
        ctx.fillText("Appuyer sur la touche Espace pour rejouer", 5, 30)
        ctx.restore();
    }
// criar a funçao restart 
    function restart(){
        snakee = new Snake([[6, 4], [5, 4], [4, 4]], "right");
        applee = new Apple([10, 10]);
        refreshCanvas();
    }

    function drawBlock(ctx, position) {
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);
    }

    function Snake(body, direction) {
        this.body = body;
        this.direction = direction;
        this.ateApple = false;

        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for (var i = 0; i < this.body.length; i++) {
                drawBlock(ctx, this.body[i]);
            }
            ctx.restore();
        }
        this.advance = function () {
            var nextPosition = this.body[0].slice();

            switch (this.direction) {
                case "left":
                    nextPosition[0] -= 1;
                    break;
                case "right":
                    nextPosition[0] += 1;
                    break;
                case "down":
                    nextPosition[1] += 1;
                    break;
                case "up":
                    nextPosition[1] -= 1;
                    break;
                default:
                    throw ("invalid direction")
            }
            this.body.unshift(nextPosition);
            // 3° se ela comer a maça 
            if (!this.ateApple)
                this.body.pop();
            else
                this.ateApple = false;
        };
        this.setDirection = function (newDirection) {
            var allowDirections;
            switch (this.direction) {
                case "left":
                case "right":
                    allowDirections = ["up", "down"]
                    break;
                case "down":
                case "up":
                    allowDirections = ["left", "right"]
                    break;
                default:
                    throw ("Invalid Direction")
            }
            if (allowDirections.indexOf(newDirection) > -1) {

                this.direction = newDirection;
            }
        };
        this.checkCollision = function () {
            var wallCollision = false;
            var snakeCollision = false;
            var head = this.body[0];
            var rest = this.body.slice(1);
            var snakeX = head[0];
            var snakeY = head[1];
            var minX = 0;
            var minY = 0;
            var maxX = widthInBlocks - 1;
            var maxY = heightInBlocks - 1;
            var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
            var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

            if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) {
                wallCollision = true;
            }

            for (var i = 0; i < rest.length; i++) {
                if (snakeX === rest[i][0] && snakeY === rest[i][1]) {
                    snakeCollision = true;
                }
            }
            return wallCollision || snakeCollision;

        };

        this.isEatingApple = function (appleToEat) {
            var head = this.body[0];
            if (head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])
                return true;
            else
                return false;
        };
    }

    function Apple(position) {
        this.position = position;

        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#33cc33";
            ctx.beginPath();
            var radius = blockSize / 2;
            var x = this.position[0] * blockSize + radius;
            var y = this.position[1] * blockSize + radius;
            ctx.arc(x, y, radius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.restore();
        };

        this.setNewPosition = function () {
            var newX = Math.round(Math.random() * (widthInBlocks - 1));
            var newY = Math.round(Math.random() * (heightInBlocks - 1));
            this.position = [newX, newY];
        };


        this.isOnSnake = function (snakeToCheck) {

            var isOnSnake = false;

            for (var i = 0; i < snakeToCheck.body.length; i++) {
                if (this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1]) {
                    isOnSnake = true;
                }
            }
            return isOnSnake;
        };

    }

    document.onkeydown = function handleKeyDown(e) {
        var key = e.keyCode;
        var newDirection;
        switch (key) {
            case 37:
                newDirection = "left";
                break;
            case 38:
                newDirection = "up";
                break;
            case 39:
                newDirection = "right";
                break;
            case 40:
                newDirection = "down";
                break;
        // definir entao, a tecla espace (n°32) para quando se quer tornar a jogar chamandoa funçao restart
            case 32:
                restart();
                return;

            default:
                return;
        }
        snakee.setDirection(newDirection);
    }

} */

// Agora o score 
/*
window.onload = function () {


    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 100;
    var snakee;
    var applee;
    var widthInBlocks = canvasWidth / blockSize;
    var heightInBlocks = canvasHeight / blockSize;
    //1° introduzir a variavel score 
    var score;


    init();

    function init() {
        var canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        snakee = new Snake([[6, 4], [5, 4], [4, 4]], "right");
        applee = new Apple([10, 10]);

        //2 definir o score a 0 no inicio de cada jogo;
        score = 0; 

        refreshCanvas();
    }

    function refreshCanvas() {

        snakee.advance();

        if (snakee.checkCollision()) {
        
            gameOver();
        }
        else {
            if (snakee.isEatingApple(applee)) {
                //4 indicar que o score aumenta cada vez que a serpente come uma maça
                score++;
                snakee.ateApple = true;
                do {
                    applee.setNewPosition();
                }
                while (applee.isOnSnake(snakee))

            }
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            snakee.draw();
            applee.draw();
            //6 chamar a funçao de apresentaçao do score no ecra;
            drawScore();
            setTimeout(refreshCanvas, delay);
        }
    }

   
    function gameOver(){
        ctx.save(); 
        ctx.fillText("Game Over", 5, 15);
        ctx.fillText("Appuyer sur la touche Espace pour rejouer", 5, 30)
        ctx.restore();
    }

    function restart(){
        snakee = new Snake([[6, 4], [5, 4], [4, 4]], "right");
        applee = new Apple([10, 10]);

        //3 definir o score a 0 no inicio de cd relançar de um jogo;
        score = 0;

        refreshCanvas();
    }

    //5 apresentar no ecra o valor do score atraves de uma funçao:

    function drawScore(){
        ctx.save(); 
        ctx.fillText(score.toString(), 5, canvasHeight - 5); // coordenadas do ecra onde deve aparecer essa informaçao
        
        ctx.restore();

    }

    function drawBlock(ctx, position) {
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);
    }

    function Snake(body, direction) {
        this.body = body;
        this.direction = direction;
        this.ateApple = false;

        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for (var i = 0; i < this.body.length; i++) {
                drawBlock(ctx, this.body[i]);
            }
            ctx.restore();
        }
        this.advance = function () {
            var nextPosition = this.body[0].slice();

            switch (this.direction) {
                case "left":
                    nextPosition[0] -= 1;
                    break;
                case "right":
                    nextPosition[0] += 1;
                    break;
                case "down":
                    nextPosition[1] += 1;
                    break;
                case "up":
                    nextPosition[1] -= 1;
                    break;
                default:
                    throw ("invalid direction")
            }
            this.body.unshift(nextPosition);
           
            if (!this.ateApple)
                this.body.pop();
            else
                this.ateApple = false;
        };
        this.setDirection = function (newDirection) {
            var allowDirections;
            switch (this.direction) {
                case "left":
                case "right":
                    allowDirections = ["up", "down"]
                    break;
                case "down":
                case "up":
                    allowDirections = ["left", "right"]
                    break;
                default:
                    throw ("Invalid Direction")
            }
            if (allowDirections.indexOf(newDirection) > -1) {

                this.direction = newDirection;
            }
        };
        this.checkCollision = function () {
            var wallCollision = false;
            var snakeCollision = false;
            var head = this.body[0];
            var rest = this.body.slice(1);
            var snakeX = head[0];
            var snakeY = head[1];
            var minX = 0;
            var minY = 0;
            var maxX = widthInBlocks - 1;
            var maxY = heightInBlocks - 1;
            var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
            var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

            if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) {
                wallCollision = true;
            }

            for (var i = 0; i < rest.length; i++) {
                if (snakeX === rest[i][0] && snakeY === rest[i][1]) {
                    snakeCollision = true;
                }
            }
            return wallCollision || snakeCollision;

        };

        this.isEatingApple = function (appleToEat) {
            var head = this.body[0];
            if (head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])
                return true;
            else
                return false;
        };
    }

    function Apple(position) {
        this.position = position;

        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#33cc33";
            ctx.beginPath();
            var radius = blockSize / 2;
            var x = this.position[0] * blockSize + radius;
            var y = this.position[1] * blockSize + radius;
            ctx.arc(x, y, radius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.restore();
        };

        this.setNewPosition = function () {
            var newX = Math.round(Math.random() * (widthInBlocks - 1));
            var newY = Math.round(Math.random() * (heightInBlocks - 1));
            this.position = [newX, newY];
        };


        this.isOnSnake = function (snakeToCheck) {

            var isOnSnake = false;

            for (var i = 0; i < snakeToCheck.body.length; i++) {
                if (this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1]) {
                    isOnSnake = true;
                }
            }
            return isOnSnake;
        };

    }

    document.onkeydown = function handleKeyDown(e) {
        var key = e.keyCode;
        var newDirection;
        switch (key) {
            case 37:
                newDirection = "left";
                break;
            case 38:
                newDirection = "up";
                break;
            case 39:
                newDirection = "right";
                break;
            case 40:
                newDirection = "down";
                break;
     
            case 32:
                restart();
                return;

            default:
                return;
        }
        snakee.setDirection(newDirection);
    }
} */

// E voilà o projeto todo finalizado de A a Z!!! Mas gora com estilo à nossa maneira com estilo feito diretamente comJS sem CSS

window.onload = function () {

    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 100;
    var snakee;
    var applee;
    var widthInBlocks = canvasWidth / blockSize;
    var heightInBlocks = canvasHeight / blockSize;

    var score;

    init();

    function init() {
        var canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        //1° estilisar o canvas, cor e margens:
        canvas.style.border = "30px solid gray";
        canvas.style.margin = "50px auto";
        canvas.style.display = "block";
        canvas.style.backgroundColor = "#ddd";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        snakee = new Snake([[6, 4], [5, 4], [4, 4]], "right");
        applee = new Apple([10, 10]);
        score = 0; 

        refreshCanvas();
    }

    function refreshCanvas() {
        snakee.advance();
        if (snakee.checkCollision()) {
            gameOver();
        }
        else {
            if (snakee.isEatingApple(applee)) {
                score++;
                snakee.ateApple = true;
                do {
                    applee.setNewPosition();
                }
                while (applee.isOnSnake(snakee))

            }
            
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            //para que o score nao se sobreponha visualmente à serpente nem a pinta da maça, que nao fiquem por detras da cor do score, muda-se a sequencia destas funccoes: 
            //coloca-se o draw score antes de todas as outras.*/
            drawScore();
            snakee.draw();
            applee.draw();
            
            setTimeout(refreshCanvas, delay);
        }
    }

    function gameOver(){ // estilisar o game over
        ctx.save(); 
        ctx.font = "bold 70px sans-serif";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseLine = "middle";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        var centreX = canvasWidth / 2;  //aqui calcula-se o centro na horizontal
        var centreY = canvasHeight / 2; //aqui o centro na vertical; 
        ctx.strokeText("Game Over", centreX,  centreY - 180);
        ctx.fillText("Game Over", centreX,  centreY - 180);
        ctx.font = "bold 30px sans-serif";
        ctx.strokeText("Appuyer sur la touche Espace pour rejouer", centreX,  centreY - 120)
        ctx.fillText("Appuyer sur la touche Espace pour rejouer", centreX,  centreY - 120)
        ctx.restore();
    }

    function restart(){ 
        snakee = new Snake([[6, 4], [5, 4], [4, 4]], "right");
        applee = new Apple([10, 10]);
        score = 0;

        refreshCanvas();
    } 

    function drawScore(){
        ctx.save(); 
        //2mudar o estilo do score:
        ctx.font = "bold 200px sans-serif";
        ctx.fillStyle = "gray";
        ctx.textAlign = "center";
        ctx.textBaseLine = "middle";
        var centreX = canvasWidth / 2;  //aqui calcula-se o centro na horizontal
        var centreY = canvasHeight / 2; //aqui o centro na vertical; 

        ctx.fillText(score.toString(), centreX, centreY+75); 
        
        ctx.restore();
    }

    function drawBlock(ctx, position) {
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);
    }

    function Snake(body, direction) {
        this.body = body;
        this.direction = direction;
        this.ateApple = false;

        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for (var i = 0; i < this.body.length; i++) {
                drawBlock(ctx, this.body[i]);
            }
            ctx.restore();
        }
        this.advance = function () {
            var nextPosition = this.body[0].slice();

            switch (this.direction) {
                case "left":
                    nextPosition[0] -= 1;
                    break;
                case "right":
                    nextPosition[0] += 1;
                    break;
                case "down":
                    nextPosition[1] += 1;
                    break;
                case "up":
                    nextPosition[1] -= 1;
                    break;
                default:
                    throw ("invalid direction")
            }
            this.body.unshift(nextPosition);
           
            if (!this.ateApple)
                this.body.pop();
            else
                this.ateApple = false;
        };
        this.setDirection = function (newDirection) {
            var allowDirections;
            switch (this.direction) {
                case "left":
                case "right":
                    allowDirections = ["up", "down"]
                    break;
                case "down":
                case "up":
                    allowDirections = ["left", "right"]
                    break;
                default:
                    throw ("Invalid Direction")
            }
            if (allowDirections.indexOf(newDirection) > -1) {

                this.direction = newDirection;
            }
        };
        this.checkCollision = function () {
            var wallCollision = false;
            var snakeCollision = false;
            var head = this.body[0];
            var rest = this.body.slice(1);
            var snakeX = head[0];
            var snakeY = head[1];
            var minX = 0;
            var minY = 0;
            var maxX = widthInBlocks - 1;
            var maxY = heightInBlocks - 1;
            var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
            var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

            if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) {
                wallCollision = true;
            }

            for (var i = 0; i < rest.length; i++) {
                if (snakeX === rest[i][0] && snakeY === rest[i][1]) {
                    snakeCollision = true;
                }
            }
            return wallCollision || snakeCollision;
        };

        this.isEatingApple = function (appleToEat) {
            var head = this.body[0];
            if (head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])
                return true;
            else
                return false;
        };
    }

    function Apple(position) {
        this.position = position;
        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#33cc33";
            ctx.beginPath();
            var radius = blockSize / 2;
            var x = this.position[0] * blockSize + radius;
            var y = this.position[1] * blockSize + radius;
            ctx.arc(x, y, radius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.restore();
        };

        this.setNewPosition = function () {
            var newX = Math.round(Math.random() * (widthInBlocks - 1));
            var newY = Math.round(Math.random() * (heightInBlocks - 1));
            this.position = [newX, newY];
        };


        this.isOnSnake = function (snakeToCheck) {
            var isOnSnake = false;
            for (var i = 0; i < snakeToCheck.body.length; i++) {
                if (this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1]) {
                    isOnSnake = true;
                }
            }
            return isOnSnake;
        };

    }

    document.onkeydown = function handleKeyDown(e) {
        var key = e.keyCode;
        var newDirection;
        switch (key) {
            case 37:
                newDirection = "left";
                break;
            case 38:
                newDirection = "up";
                break;
            case 39:
                newDirection = "right";
                break;
            case 40:
                newDirection = "down";
                break;
     
            case 32:
                restart();
                return;

            default:
                return;
        }
        snakee.setDirection(newDirection);
    }
} 

//Agora corrigir o bug d perder sem ter perdido so por tocar na tecla espaço. A serpente anda mt rapido qd s e toca na tecla space. 
//Corrijamos!!


window.onload = function () {

    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 100;
    var snakee;
    var applee;
    var widthInBlocks = canvasWidth / blockSize;
    var heightInBlocks = canvasHeight / blockSize;
    var score;
    //1. acrescenta-se esta variavel:
    var timeout;

    init();

    function init() {
        var canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        
        canvas.style.border = "30px solid gray";
        canvas.style.margin = "50px auto";
        canvas.style.display = "block";
        canvas.style.backgroundColor = "#ddd";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        snakee = new Snake([[6, 4], [5, 4], [4, 4]], "right");
        applee = new Apple([10, 10]);
        score = 0; 

        refreshCanvas();
    }

    function refreshCanvas() {
        snakee.advance();
        if (snakee.checkCollision()) {

            gameOver();
        }
        else {
            if (snakee.isEatingApple(applee)) {
                score++;
                snakee.ateApple = true;
                do {
                    applee.setNewPosition();
                } while (applee.isOnSnake(snakee))

            }
            
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            
            drawScore();
            snakee.draw();
            applee.draw();
            // o setTimeout é o conteudo da nova variavel criada timeout;
            //esta ultima linha esta muito ligada ao facto de ela andar rapidoqaundo se toca no espaço
            timeout = setTimeout(refreshCanvas, delay);
        }
    }

    function gameOver(){ 
        ctx.save(); 
        ctx.font = "bold 70px sans-serif";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseLine = "middle";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        var centreX = canvasWidth / 2;  
        var centreY = canvasHeight / 2; 
        ctx.strokeText("Game Over", centreX,  centreY - 180);
        ctx.fillText("Game Over", centreX,  centreY - 180);
        ctx.font = "bold 30px sans-serif";
        ctx.strokeText("Appuyer sur la touche Espace pour rejouer", centreX,  centreY - 120)
        ctx.fillText("Appuyer sur la touche Espace pour rejouer", centreX,  centreY - 120)
        ctx.restore();
    }

    function restart(){ 
        snakee = new Snake([[6, 4], [5, 4], [4, 4]], "right");
        applee = new Apple([10, 10]);
        score = 0;
        //3° antes do refresh acrescenta-se esta antes do refreshCanvas para que a cada 100 vezes por segundo (var delay = 100) para refazer a refreshcanvas
        clearTimeout(timeout);

        refreshCanvas(); // nesta funçao ve se houve colisao razao p perder se houver ela faz gameover se nao, no fim do jogo o timeout pede que a funçao refresh seja refeita a partir d um determinado tempo, neste caso 100 como esta na var delay = 100 logo no inicio do codigo
    } 

    function drawScore(){
        ctx.save(); 

        ctx.font = "bold 200px sans-serif";
        ctx.fillStyle = "gray";
        ctx.textAlign = "center";
        ctx.textBaseLine = "middle";
        var centreX = canvasWidth / 2;  
        var centreY = canvasHeight / 2;

        ctx.fillText(score.toString(), centreX, centreY+75); 
        
        ctx.restore();
    }

    function drawBlock(ctx, position) {
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);
    }

    function Snake(body, direction) {
        this.body = body;
        this.direction = direction;
        this.ateApple = false;

        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for (var i = 0; i < this.body.length; i++) {
                drawBlock(ctx, this.body[i]);
            }
            ctx.restore();
        }
        this.advance = function () {
            var nextPosition = this.body[0].slice();

            switch (this.direction) {
                case "left":
                    nextPosition[0] -= 1;
                    break;
                case "right":
                    nextPosition[0] += 1;
                    break;
                case "down":
                    nextPosition[1] += 1;
                    break;
                case "up":
                    nextPosition[1] -= 1;
                    break;
                default:
                    throw ("invalid direction")
            }
            this.body.unshift(nextPosition);
           
            if (!this.ateApple)
                this.body.pop();
            else
                this.ateApple = false;
        };

        this.setDirection = function (newDirection) {
            var allowDirections;
            switch (this.direction) {
                case "left":
                case "right":
                    allowDirections = ["up", "down"]
                    break;
                case "down":
                case "up":
                    allowDirections = ["left", "right"]
                    break;
                default:
                    throw ("Invalid Direction")
            }
            if (allowDirections.indexOf(newDirection) > -1) {

                this.direction = newDirection;
            }
        };
        
        this.checkCollision = function () {
            var wallCollision = false;
            var snakeCollision = false;
            var head = this.body[0];
            var rest = this.body.slice(1);
            var snakeX = head[0];
            var snakeY = head[1];
            var minX = 0;
            var minY = 0;
            var maxX = widthInBlocks - 1;
            var maxY = heightInBlocks - 1;
            var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
            var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

            if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) {
                wallCollision = true;
            }

            for (var i = 0; i < rest.length; i++) {
                if (snakeX === rest[i][0] && snakeY === rest[i][1]) {
                    snakeCollision = true;
                }
            }
            return wallCollision || snakeCollision;
        };

        this.isEatingApple = function (appleToEat) {
            var head = this.body[0];
            if (head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])
                return true;
            else
                return false;
        };
    }

    function Apple(position) {
        this.position = position;
        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#33cc33";
            ctx.beginPath();
            var radius = blockSize / 2;
            var x = this.position[0] * blockSize + radius;
            var y = this.position[1] * blockSize + radius;
            ctx.arc(x, y, radius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.restore();
        };

        this.setNewPosition = function () {
            var newX = Math.round(Math.random() * (widthInBlocks - 1));
            var newY = Math.round(Math.random() * (heightInBlocks - 1));
            this.position = [newX, newY];
        };


        this.isOnSnake = function (snakeToCheck) {
            var isOnSnake = false;
            for (var i = 0; i < snakeToCheck.body.length; i++) {
                if (this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1]) {
                    isOnSnake = true;
                }
            }
            return isOnSnake;
        };

    }

    document.onkeydown = function handleKeyDown(e) {
        var key = e.keyCode;
        var newDirection;
        switch (key) {
            case 37:
                newDirection = "left";
                break;
            case 38:
                newDirection = "up";
                break;
            case 39:
                newDirection = "right";
                break;
            case 40:
                newDirection = "down";
                break;
     
            case 32:
                restart();
                return;

            default:
                return;
        }
        snakee.setDirection(newDirection);
    }
} 

