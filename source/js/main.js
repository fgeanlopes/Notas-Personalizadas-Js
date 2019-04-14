// VARIAVEL DO CARD
var $cards = document.querySelectorAll('.wrap-card');

// VARIVEL DOS ITENS NAV DENTRO DO CARD
var $cardColors = document.querySelectorAll('.card-options');


for (var index = 0; index < $cards.length; index++) {
    $cards[index].addEventListener('click', function (event) {

        // PEGA O EVENTO TARGE FEITO EM CIMA DO ITEM NAV NO CARD
        var $capClick = event.target;
        // LINK ATIVO NO MOMENTO
        var $card = $capClick.parentNode.parentNode.parentNode;

        //VARIAVEL DO PROPRIEDADE EDITAVEL
        var $cardContent = $card.querySelector('.card-content');


        // SE CLICAR EM UM DOS ITENS DA NAV DO CARD
        if ($capClick.dataset.color) {

            // MUDA A COR DO CARD PASSANDO A COR DO LINK QUE FOI CLICADO NA NAV DO CARD
            $card.dataset.color = $capClick.dataset.color;

            // PERCORRE OS ITENS REMOVENDO A CLASS "IsActive";
            for (var position = 0; position < $cardColors.length; position++) {
                $cardColors[position].classList.remove('isActive');
            }

            // ADICIONA A CLASS NO LINK CLICADO
            $capClick.classList.add('isActive');

        }
        // REMOVER O CARD
        if ($capClick.classList.contains('card_delete')) {
            $card.remove();
        }

        //EDITAR CARD
        // VERIFICA DE EXISTE ESTA CLASSE NO ITEM CLICADO
        if ($capClick.classList.contains('card_edit')) {
            if ($cardContent.getAttribute('contenteditable') == 'false') {

                $cardContent.setAttribute('contenteditable', 'true');
                $cardContent.focus();
                // $capClick.classList.add('isActive');

            } else {
                $cardContent.setAttribute('contenteditable', 'false');
                $cardContent.blur();
                // $capClick.classList.remove('isActive');
            }
        }
    });
}

// VEFIFICA DE HÁ INFORMAÇÕES ANTES DE CRIAR UM NOVO CARD
var $newCard = document.querySelector('.newCard');
var $newCardContent = document.querySelector('.newCard-content');
var $newCardAction = document.querySelector('.newCard-action');
var $mensagemAlertaErro = document.querySelector('.error');

// REMOVER A MENSAGEM DE ERRO QUANDO TEXTO FOR DIGITADO
$newCardContent.addEventListener('input', function () {
    if ($mensagemAlertaErro != null) {
        $mensagemAlertaErro.remove();
    }
});

function limparTextArea(){
    $newCardContent.value=('');
}

//EVENTO DE ENVIAR OS DADOS
$newCard.addEventListener('submit', function (event) {
    event.preventDefault();
    // VALIDAÇÃO DE CAMPO VAZIO
    if ($newCardContent.value == '') {
        // SE NÃO HOUVER A CLASSE, FAÇA....
        if ($mensagemAlertaErro == null) {
            // CRIANDO UM SPAN PARA A MENSAGEM DE ERRO
            $mensagemAlertaErro = document.createElement('span');
            $mensagemAlertaErro.classList.add('error');
            // INSERINDO A MENSAGEM DENTRO DO SPAN
            $mensagemAlertaErro.textContent = 'Por Favor, preencha o campo  a cima.';

            // INSERINDO NA TELA
            // 1 - PARAMETRO É --> O QUEREMOS INSERIR NA TELA
            // 2 - PARAMETRO É --> ONDE A GENTE QUER INSERIR
            // 3 - SÓ PODE SER PASSADO NO PAI DO ELEMENTO. --> FORMULARIO NO CASO
            $newCard.insertBefore($mensagemAlertaErro, $newCardAction);
        };
    }
    else {
        // CLONANDO O CARTÃO
        var $warpCard = document.querySelector('.wrap-card');
        var $card = document.querySelector('.card');
        // COPIA DO CARTAO
        var $copyCard = $card.cloneNode(true);

        // PASSANDO O CONTEUDO DIGITADO PARA O NOVO CARD
        $copyCard.querySelector('.card-content').textContent = $newCardContent.value;

        //INSERINDO CONTEUDO FINAL
        $warpCard.insertBefore($copyCard, $card);

        limparTextArea();

    }
});


