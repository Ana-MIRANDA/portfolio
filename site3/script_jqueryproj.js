/* com os meus comentarios

// $(document).ready(function(){ // significa que o documento deve estar pronto p se atualizar ao invés de escrever isto tudo podemos abreviar com 

// console.log("eu")


//Para que ao clicar eùm cada foto que esta a preto e branco elas passem a foto a cores,faz-se:
$(function () {
    var $mainMenuItems = $("#main-menu ul").children("li"), // selecionar os li de cada atriz
        // pode usar-se a , para separar variaveis diferentes enkto n usar ; nem a palavra var
        totalMainMenuItems = $mainMenuItems.length,
        openedIndex = -1; // o menu sera fechado
    //  console.log($mainMenuItems)


    //depois de criar a funçao bindEvents, chamamos aqui a mesma para que seja executada:
    
//Primeira funçao criada:
    init = function () { // é uma var tb m n é obrigatorio escrever "var" 
 // console.log(typeof $mainMenuItems)
    bindEvents()},
    bindEvents = function(){
        $mainMenuItems.children(".images").click(function () { //evenement click

            var newIndex = $(this).parent().index(),
                // "this" é como document é o mm k o elemento sobre o qual me eocntro, k clikei
                // o "index" é o index do elemento clicado

                $item = $mainMenuItems.eq(newIndex);
            //Apos ter-se criado a funçao abaixo (animateItem), estas 3 funçoes desaparecem e sao substituidas pour esta nova funçao e seus parametros (animateItem)
                     // $colorImage = $item.find(".color"); // foi apagada depois de criada a funça animateItem abaixo
        // find= encontra-me o item que tem .color

 // console.log(" o newIndex é " , newIndex);
// console.log("o item é " , $item);
 // console.log("o que sai " , $colorImage);

 // ver que este IF foi criado no fim de todas as animaçoes do projeto para fechar as imagens quando clicadas enquto abertas:
// este if esta tb ligado à funçao de verificaçao de index (validIndex) abaixo apresentada: 
            if(openedIndex === newIndex){
                animateItem($item, false, 250)
                openedIndex= -1;
            }
        
            else{
                    if(valideIndex(newIndex)){

                          animateItem($mainMenuItems.eq(openedIndex), false, 250);
                          openedIndex = newIndex;
                          animateItem($item, true, 250);

                    }
                }

                      //  $colorImage.animate({ left: "0px" }, 250);// foi apagada tb 
 //  console.log("fim fuçao")
 // console.log($(this).parent());

            //Agora para que ao clicar nas imagens apareça o menu de cada atriz faz-se o seguinte: 
          // $item.animate({ width: "420px" }, 250); // foi apagada tb depois de criada a funçao abaixo (animateItem)
     // estas tres funçoes foram substituidas por (com base na funçao animateItem criada abaixo)      
            // qd clicadas as imagens continuam a abrir e a ficar em foto colorida como com as 3 funçoes de tras;
         // animateItem($item, true, 250); // foi agora incluida dentro do if anterior;
            // openedIndex = newIndex;
        });
    }; 
//funçao p validar index criada depois do if acima apresentado:
    },
valideIndex = function(indexToCheck){

    return(indexToCheck >= 0) && (indexToCheck < totalMainMenuItems)
};

// Segunda funçao criada: tem 3 argumentos(item, toOpen, speed)

animateItem = function($item, toOpen, speed){
    //para que o tamanho da imagem e da descriçao mudem em funçao de abrir e fechar cada atriz, 
    
    // os booleans escrevem- se:
    // As frases escrevem-se assim: Expressao ? {Valeur1} : {Valeur2}
    
    $colorImage = $item.find(".color"),
    //coloca-se uma questao (?) true ou false: true= aberto logo tamanho é 420px , se falso=fechado tamanho fica a 140px;Faz-se assim:
    itemParam = toOpen ? {width:"420px"} : {width:"140px"}, // cria-se um parametro (ex.itemParam em k PARAM é parâmetro) para se fazer a questao
    // Mais Outra questao a fazer dentro de um parametro (Param). Neste caso para as imagens coloridas
    //qaundo se quer abrir, o left da imagem colorida passa a 0px e quando fechado passa a 140px;
    colorImageParam = toOpen ? {left:"0px"} : {left:"140px"}
    $colorImage.animate(colorImageParam, speed);
    $item.animate(itemParam, speed); 
};

// NOTA: Para fazer as imagens e descriçoes das atrizes fecharem quando clicadas, fez-se um if em cima n $mainMenuItems
    init();

}); */


// Agora fazer a animaçao do inicio em ka jessica alaba aparece ja aberta mal s abre o site:
// fizemos a funçao bindEvents e meteram-se toas as funçoes de evenements/eventos dentro dela;

/* sem os meus comentarios: 
$(function () {
    var $mainMenuItems = $("#main-menu ul").children("li"),
        totalMainMenuItems = $mainMenuItems.length,
        openedIndex = 2; // mudou de -1 p 2 para que a jessica esteja aberta ogo s q s entre no site; 

    init = function () {
        bindEvents();
        if (valideIndex(openedIndex)) {
            animateItem($mainMenuItems.eq(openedIndex), true, 700)
        }
    },
        bindEvents = function () {
            $mainMenuItems.children(".images").click(function () {
                var newIndex = $(this).parent().index(),
                    $item = $mainMenuItems.eq(newIndex);
                if (openedIndex === newIndex) {
                    animateItem($item, false, 250)
                    openedIndex = -1;
                } else {
                    if (valideIndex(newIndex)) {// para que a jessica esteja aberta mal se entre no site
                        animateItem($mainMenuItems.eq(openedIndex), false, 250);
                        openedIndex = newIndex;
                        animateItem($item, true, 250);
                    }
                }
            });
            //para os botoes terem funcionalidade

            $(".button").hover(function () {
                $(this).addClass("hovered");
            },
                function () {
                    $(this).removeClass("hovered");
                }
            );
//para que os botoes abaram a atriz sem termos d carregar nas fotos, soclicar nos botoes;
            $(".button").click(function () {
                var newIndex = $(this).index();
                $item = $mainMenuItems.eq(newIndex);
                if (openedIndex === newIndex) {
                    animateItem($item, false, 250)
                    openedIndex = -1;
                } else {
                    if (valideIndex(newIndex)) {// para que a jessica esteja aberta mal se entre no site
                        animateItem($mainMenuItems.eq(openedIndex), false, 250);
                        openedIndex = newIndex;
                        animateItem($item, true, 250);
                    }
                }
            })
        },
        valideIndex = function (indexToCheck) {

            return (indexToCheck >= 0) && (indexToCheck < totalMainMenuItems)
        };

    animateItem = function ($item, toOpen, speed) {
        $colorImage = $item.find(".color"),
            itemParam = toOpen ? { width: "420px" } : { width: "140px" },
            colorImageParam = toOpen ? { left: "0px" } : { left: "140px" }
        $colorImage.animate(colorImageParam, speed);
        $item.animate(itemParam, speed);
    };

    init();

}); */ 

// Como ha funçoes que se repetem, o melhor é escrever so uma vez cada funçao e chama-la qd necessario: 
$(function () {
    var $mainMenuItems = $("#main-menu ul").children("li"),
        totalMainMenuItems = $mainMenuItems.length,
        openedIndex = 2; 

    init = function () {
        bindEvents();
        if (valideIndex(openedIndex)) {
            animateItem($mainMenuItems.eq(openedIndex), true, 700)
        }
    },
        bindEvents = function () {
            $mainMenuItems.children(".images").click(function () {
                var newIndex = $(this).parent().index(),
                    $item = $mainMenuItems.eq(newIndex);
                if (openedIndex === newIndex) {
                    animateItem($item, false, 250)
                    openedIndex = -1;
                } else {
                    if (valideIndex(newIndex)) {
                        animateItem($mainMenuItems.eq(openedIndex), false, 250);
                        openedIndex = newIndex;
                        animateItem($item, true, 250);
                    }
                }
            });
            //para os botoes terem funcionalidade

            $(".button").hover(function () {
                $(this).addClass("hovered");
            },
                function () {
                    $(this).removeClass("hovered");
                }
            );

            $(".button").click(function () {
                var newIndex = $(this).index();
                $item = $mainMenuItems.eq(newIndex);
                if (openedIndex === newIndex) {
                    animateItem($item, false, 250)
                    openedIndex = -1;
                } else {
                    if (valideIndex(newIndex)) {
                        animateItem($mainMenuItems.eq(openedIndex), false, 250);
                        openedIndex = newIndex;
                        animateItem($item, true, 250);
                    }
                }
            })
        },
        valideIndex = function (indexToCheck) {

            return (indexToCheck >= 0) && (indexToCheck < totalMainMenuItems)
        };

    animateItem = function ($item, toOpen, speed) {
        $colorImage = $item.find(".color"),
            itemParam = toOpen ? { width: "420px" } : { width: "140px" },
            colorImageParam = toOpen ? { left: "0px" } : { left: "140px" }
        $colorImage.animate(colorImageParam, speed);
        $item.animate(itemParam, speed);
    };

        checkAndAnimateItem = function (indexToCheckAndAnimate){
            if (openedIndex === indexToCheckAndAnimate) {
                animateItem($item, false, 250)
                openedIndex = -1;
            } else {
                if (valideIndex(newIndex)) {
                    animateItem($mainMenuItems.eq(openedIndex), false, 250);
                    openedIndex = indexToCheckAndAnimate;
                    animateItem($mainMenuItems.eq(openedIndex), true, 250);
                }
            }
    };

    init();

});

                <!-- FIM DO PROJETO -->