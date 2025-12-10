var despesas = [];
var salario = 0;

if (localStorage.getItem("despesas")) {
    despesas = JSON.parse(localStorage.getItem("despesas"));
}

if (localStorage.getItem("salario")) {
    var salario=localStorage.getItem("salario");
    document.getElementById("salario").value = salario;
}

function salvarSalario() {
    var valor = document.getElementById("salario").value;

    if (valor == "" || valor <= 0) {
        alert("Digite um salário válido");
        return;
    }

    salario = Number(valor);
    localStorage.setItem("salario", salario);
    atualizarResumo();
}

function adicionarDespesa() {
    var data = document.getElementById("data").value;
    var nome = document.getElementById("nome").value;
    var valor = document.getElementById("valor").value;

    if (data == "" || nome == "" || valor == "" || valor <= 0) {
        alert("Preencha todos os campos");
        return;
    }

    despesas.push({
        data: data,
        nome: nome,
        valor: Number(valor)
    });

    localStorage.setItem("despesas", JSON.stringify(despesas));
    listarDespesas();
    atualizarResumo();

    document.getElementById("data").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("valor").value = "";
}

// listar despesas
function listarDespesas() {
    var lista = document.getElementById("listaDespesas");
    lista.innerHTML = "";
    for (var i=0; i<despesas.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = despesas[i].data + " - " +
                       despesas[i].nome + " - R$ " +
                       despesas[i].valor;
  
        var botao=document.createElement("button");
        botao.innerHTML = "Apagar";
        botao.className = "btn-remover";

        botao.onclick = (function(pos) {
            return function() {
                despesas.splice(pos, 1);
                localStorage.setItem("despesas", JSON.stringify(despesas));
                listarDespesas();
                atualizarResumo();
            };
        })(i);

        li.appendChild(botao);
        lista.appendChild(li);
    }
}

function atualizarResumo() {
    var total = 0;
    for (var i=0; i<despesas.length; i++) {
        total = total + despesas[i].valor;
    }
    document.getElementById("resSalario").innerHTML =
        "Salário: R$ " + salario;
    document.getElementById("resDespesas").innerHTML =
        "Total de despesas: R$ " + total;
    document.getElementById("resSaldo").innerHTML =
        "Saldo final: R$ " + (salario - total);
}

function apagarTudo() {
    localStorage.removeItem("despesas");
    localStorage.removeItem("salario");

    document.getElementById("listaDespesas").innerHTML = "";

    document.getElementById("resSalario").innerHTML = "Salário: R$ 0";
    document.getElementById("resDespesas").innerHTML = "Total de despesas: R$ 0";
    document.getElementById("resSaldo").innerHTML = "Saldo final: R$ 0";

    document.getElementById("salario").value = "";
}

function editar(){
    var novosalario = prompt("Digite o novo salário: ");
    if(novosalario == ""){
        alert("Digite um novo salário");
        return;
    }
    salario = novosalario;
    localStorage.setItem("salario", salario);
    document.getElementById("salario").value = salario;
    atualizarResumo();
}

listarDespesas();
atualizarResumo();

