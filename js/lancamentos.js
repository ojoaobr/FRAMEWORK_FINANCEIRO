function cadastrar(){

    const conta = document.getElementById('contalancamento').value;
    const valor = document.getElementById('valor').value;
    const data = document.getElementById('data').value;
    const tipo = document.getElementById('tipo').value;

    tipoConta = localizarConta(id);
    
    const lancamento = {id: Date.now(), tipo, conta, valor, data: formataData()};

        let lancamentosGravados = JSON.parse(window.localStorage.getItem("lancamentos"));
        if(lancamentosGravados == null){
            window.localStorage.setItem('lancamentos',JSON.stringify([]));
            lancamentosGravados = JSON.parse(window.localStorage.getItem('lancamentos'));
            lancamentosGravados.push(lancamento);
            window.localStorage.setItem('lancamentos',JSON.stringify(lancamentosGravados));
        }
        else{
            lancamentosGravados.push(lancamento);
            window.localStorage.setItem('lancamentos',JSON.stringify(lancamentosGravados));
        }

        Limpar();
        listarContas();
}

function formataData(data = new Date()){
    var dia = data.getDate();
    var mes = data.getMonth()+1;
    var ano = data.getFullYear();

    if(dia.toString().length == 1){
        dia = '0' + dia;
    }
    if(mes.toString().length == 1){
        mes = '0' + mes;
    }

    return dia + '/' + mes + '/' + ano;
}

function localizarConta(id){

    let contaGravada = JSON.parse(window.localStorage.getItem("contas"));
    let contaIndex = contaGravada.findIndex((conta => conta.id == id));


    return contaGravada[contaIndex];
}

function listarContas(){

    let linha = "";
    let lancamentosGravados = JSON.parse(window.localStorage.getItem("lancamentos"));

    let Contas = JSON.parse(localStorage.getItem('contas.tipo'));

    if(lancamentosGravados || Contas){
        lancamentosGravados.forEach(element => {
        row = document.getElementById("tbody2");
          if(row){
          linha += "<tr>"+
                    "<td id='tdid'>"+element.id +"</td>"+
                    "<td id='conta'>"+element.tipo +"</td>"+
                    "<td id='tdnome'>"+element.conta +"</td>"+
                    "<td id='tdvalor'>"+'R$ '+element.valor+"</td>"+
                    "<td id='tddata'>"+element.data+"</td>"+
                    "<td id='tdacoes'><button class='btn btn-outline-success' onclick='editar("+element.id+")'><i class='fa fa-edit'></i></button>"+
                    "<button class='btn btn-outline-danger'onclick='apagar("+element.id+")'><i class='fa fa-trash'></i></button></td>"
                  +"</tr>";
          row.innerHTML = linha;
          }
      });

    }
  
  }

  function apagar(id){
    Swal.fire({
        title: 'Apagar Lançamento?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim'
    }).then((result) => {
        if(result.value){
            let lancamentosGravados = JSON.parse(window.localStorage.getItem('lancamentos'));
            let posicao = lancamentosGravados.findIndex(lancamento => lancamento.id == id);
            lancamentosGravados.splice(posicao,1);
            localStorage.setItem('lancamentos', JSON.stringify(lancamentosGravados));
            listarContas();
            if(window.localStorage.getItem('lancamentos') == "[]"){
                window.location.reload('dashboard.html');
            }
        }
    })
}

function editar(id){
    let lancamentosGravados = JSON.parse(window.localStorage.getItem("lancamentos"));
  for(let i = 0; i < lancamentosGravados.length; i++){
      if(lancamentosGravados[i].id == id){
        document.getElementById("id").value = lancamentosGravados[i].id;
        document.getElementById("tipo").value = lancamentosGravados[i].tipo;
        document.getElementById("contalancamento").value = lancamentosGravados[i].conta;
        document.getElementById("valor").value = lancamentosGravados[i].valor;
      }
   }
}

function alterar(){

    const id = document.getElementById("id").value;
    const conta = document.getElementById("contalancamento").value;
    const valor = document.getElementById("valor").value;
    
    lancamentosGravados = JSON.parse(window.localStorage.getItem("lancamentos"));
    let lancamentoIndex = lancamentosGravados.findIndex((lancamento => lancamento.id == id));

    debugger
    if(lancamentoIndex >= 0){
        lancamentosGravados[lancamentoIndex] = {id,tipo,conta,valor,data};
        window.localStorage.setItem("lancamentos", JSON.stringify(lancamentosGravados));
    }

    Limpar();
    listarContas();
  }

  function Limpar(){
    let inputs = document.getElementsByTagName('input');
    for(let i = 0; i < inputs.length; i++){
        inputs[i].value = "";
    }
}






listarContas();