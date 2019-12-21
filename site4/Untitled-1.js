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
}




//para dar maça

window.onload = function () {


    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 100;
    var snakee;
    var applee // depois de ter criado a funçao Apple declara-se esta variavel;


    init();

    function init() {
        var canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        snakee = new Snake([[6, 4], [5, 4], [4, 4]], "right");
        applee = new Apple(10,10);// acrescenta-se esta sabendo k a funçao construtora (Apple)pedia um bloc de 10 p 10;
        refreshCanvas();
    }

    function refreshCanvas() {

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        snakee.advance();
        snakee.draw();
        applee.draw(); // no fim de tudo, chamar a funçao da maça pra que a maça apareça la no canvas na pagina da net
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
   // 1° vamos criar a funçao para a maça

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
}