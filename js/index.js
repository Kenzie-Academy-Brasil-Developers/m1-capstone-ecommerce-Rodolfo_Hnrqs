const body = document.querySelector("body");

let sectionVitrine = document.querySelector(".vitrine");
let listaVitrine = document.createElement("ul");
listaVitrine.setAttribute("class", "vitrineUL");
sectionVitrine.appendChild(listaVitrine);

for (let i = 0; i < data.length; i++){
    let vitrineCard = document.createElement("li");
    vitrineCard.setAttribute("class", "vitrineLista")
    listaVitrine.appendChild(vitrineCard);

    let vitrineDiv = document.createElement("div");
    vitrineDiv.setAttribute("class", "vitrineDiv");
    vitrineCard.appendChild(vitrineDiv);

    let imagem = document.createElement("img");
    imagem.src = data[i].img;
    imagem.setAttribute("class", "imgCard");
    vitrineDiv.appendChild(imagem);

    let tagItem = document.createElement("span");
    vitrineDiv.appendChild(tagItem);
    tagItem.setAttribute("class", "tagItem");
    tagItem.innerText = data[i].tag;

    let nomeItem = document.createElement("span");
    vitrineDiv.appendChild(nomeItem);
    nomeItem.setAttribute("class", "tituloItem");
    nomeItem.innerText = data[i].nameItem;

    let descItem = document.createElement("p");
    vitrineDiv.appendChild(descItem);
    descItem.setAttribute("class", "descItem");
    descItem.innerText = data[i].description;

    let valorItem = document.createElement("span");
    vitrineDiv.appendChild(valorItem);
    valorItem.setAttribute("class", "valorItem");
    valorItem.innerText = `R$ ${data[i].value.toFixed(2)}`;

    let addBtn = document.createElement("button");
    vitrineDiv.appendChild(addBtn);
    addBtn.setAttribute("class", "addBtn");
    addBtn.setAttribute("id", data[i].id);
    addBtn.innerText = data[i].addCart;
    
}

let insideCarrinho = document.querySelector(".insideCarrinho");
let listaCarrinho = document.createElement("ul");
listaCarrinho.setAttribute("class", "carrinhoUL");
insideCarrinho.appendChild(listaCarrinho);
let carrinhoL1 = document.createElement("li");
carrinhoL1.setAttribute("id", "listaVazia");
listaCarrinho.appendChild(carrinhoL1);
let carroVazio = document.createElement("span");
carroVazio.setAttribute("class", "textoVazio");
carroVazio.innerText = "Carrinho Vazio";
carrinhoL1.appendChild(carroVazio);
let sugerir = document.createElement("p");
sugerir.setAttribute("class", "texto2");
sugerir.innerText = "Adicionar Itens";
carrinhoL1.appendChild(sugerir);

let carrinhoVazio = document.querySelector("#listaVazia");
let botoesAdd = document.querySelectorAll(".addBtn");

let cont = 0;
let soma = 0;

for (let i = 0; i < botoesAdd.length; i++){
    let botao = botoesAdd[i];

    botao.addEventListener("click", function(event){
        carrinhoVazio.style = "display:none;"
        let idBotao = parseInt(event.target.id);
        let itemAtual = procuraItem(idBotao);
        let valorProduto = procuraValor(idBotao);

        cont ++;
        soma += valorProduto;

        valorQuantidade.innerText = cont;
        totalSomado.innerText = `R$ ${soma.toFixed(2)}`;

        sectionSoma.style = "display:flex;"
        criarCompra(itemAtual);
    })
}

function procuraValor(idBotao){
    for(let i = 0; i < data.length; i++){
        if (data[i].id == idBotao){
            return data[i].value;
        }
    }
    return 'Item não listado.'
}

function procuraItem(idBotao){
    for(let i = 0; i < data.length; i++){
        if (data[i].id == idBotao){
            return data[i];
        }
    }
    return 'Item não listado.'
}




function criarCompra(data){
    let carrinhoItemList = document.createElement("li");
    carrinhoItemList.setAttribute("class", "listaCompras");
    carrinhoItemList.setAttribute("id", `li${cont}`);
    listaCarrinho.appendChild(carrinhoItemList);

    let divImg = document.createElement("div");
    divImg.setAttribute("class", "divImg");
    carrinhoItemList.appendChild(divImg);
    let imgCarrinho = document.createElement("img");
    imgCarrinho.src = data.img;
    imgCarrinho.setAttribute("class", "miniaturaCarrinho");
    divImg.appendChild(imgCarrinho);

    let divInfo = document.createElement("div");
    divInfo.setAttribute("class", "divInfo");
    carrinhoItemList.appendChild(divInfo);
    let nomeCarrinho = document.createElement("span");
    divInfo.appendChild(nomeCarrinho);
    nomeCarrinho.setAttribute("class", "nomeCarrinho");
    nomeCarrinho.innerText = data.nameItem;
    let valorCarrinho = document.createElement("span");
    divInfo.appendChild(valorCarrinho);
    valorCarrinho.setAttribute("class", "valorCarrinho");
    valorCarrinho.setAttribute("id", `valor${cont}`);
    valorCarrinho.innerText = `R$ ${data.value.toFixed(2)}`;
    let removeBtn = document.createElement("button");
    divInfo.appendChild(removeBtn);
    removeBtn.setAttribute("class", "removeBtn");
    removeBtn.innerText = "Remover produto"
    removeBtn.setAttribute("id", `botao_${cont}`);

    removeBtn.addEventListener("click", function(ev){
        let botaoAtual = ev.target.id;
        console.log(botaoAtual)
        let idBotao = parseInt(botaoAtual.substring(6));
        console.log(idBotao)
        let botaoDeletar = document.querySelector("#li"+idBotao);
        console.log(botaoDeletar)
        let valorProduto = document.querySelector("#valor"+idBotao);
        let valorItem = valorProduto.innerText.substring(3);
        let valor = parseFloat(valorItem);
        console.log(valor)

        botaoDeletar.remove(); 
        
        soma -= valor;
        cont --;
        valorQuantidade.innerText = cont;
        totalSomado.innerText = `R$ ${soma.toFixed(2)}`;

        if (cont <= 0){
            sectionSoma.style = "display:none;"
            carrinhoVazio.style = "display:block;"
        }
        
    })

    return carrinhoItemList;

}

let sectionSoma = document.createElement("section");
sectionSoma.setAttribute("class", "sectionSoma");
insideCarrinho.appendChild(sectionSoma);

let divQuantia = document.createElement("div");
divQuantia.setAttribute("class", "divQuantia");
sectionSoma.appendChild(divQuantia);
let quantidadeTxt = document.createElement("p");
divQuantia.appendChild(quantidadeTxt);
quantidadeTxt.setAttribute("class", "quantidadeTxt");
let valorQuantidade = document.createElement("span");
divQuantia.appendChild(valorQuantidade);
valorQuantidade.setAttribute("id", "valorQuantidade");
valorQuantidade.innerText = cont;
quantidadeTxt.innerText = "Quantidade:"

let divTotal = document.createElement("div");
divTotal.setAttribute("class", "divTotal");
sectionSoma.appendChild(divTotal);
let totalTxt = document.createElement("p");
divTotal.appendChild(totalTxt);
totalTxt.setAttribute("class", "totalTxt");
totalTxt.innerText = "Total:"
let totalSomado = document.createElement("span");
divTotal.appendChild(totalSomado);
totalSomado.setAttribute("id", "totalSomado");
totalSomado.innerText = `R$ ${soma.toFixed(2)}`;

let botaoAll = document.querySelector("#botaoAll");
let botaoAcessorios = document.querySelector("#botaoAcessorios");
let botaoCalcados = document.querySelector("#botaoCalcados");
let botaoCamisetas = document.querySelector("#botaoCamisetas");


botaoAll.addEventListener("click", function(e){
    let itensLista = document.querySelectorAll(".vitrineDiv");
    let tagItem = document.querySelectorAll(".tagItem");
    for (let i = 0; i < itensLista.length; i++){
        itensLista[i].style = "display:block;";
    }
})

botaoAcessorios.addEventListener("click", function(e){
    let itensLista = document.querySelectorAll(".vitrineDiv");
    let tagItem = document.querySelectorAll(".tagItem");
    for (let i = 0; i < itensLista.length; i++){
        if (tagItem[i].innerText != "Acessórios"){
            itensLista[i].style = "display:none;";
        }else{
            itensLista[i].style = "display:block;";
        }
    }
})

botaoCalcados.addEventListener("click", function(e){
    let itensLista = document.querySelectorAll(".vitrineDiv");
    let tagItem = document.querySelectorAll(".tagItem");
    for (let i = 0; i < itensLista.length; i++){
        if (tagItem[i].innerText != "Calçados"){
            itensLista[i].style = "display:none;";
        }else{
            itensLista[i].style = "display:block;";
        }
    }
})

botaoCamisetas.addEventListener("click", function(e){
    let itensLista = document.querySelectorAll(".vitrineDiv");
    let tagItem = document.querySelectorAll(".tagItem");
    for (let i = 0; i < itensLista.length; i++){
        if (tagItem[i].innerText != "Camisetas"){
            itensLista[i].style = "display:none;";
        }else{
            itensLista[i].style = "display:block;";
        }
    }
})
