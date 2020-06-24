function cadastrar(){
    const nome = document.getElementById('nome').value;
    const tipo = document.getElementById('tipo').value;
    const categoria = document.getElementById('categorias').value;

    if(nome == ""){
        Swal.fire({
            icon: 'error',
            title: 'Preencha todos os campos!',
            text: '',
            footer: ''
        })
    }
    else{
        const conta = {id: Date.now(), nome, tipo, categoria};

        let contasGravadas = JSON.parse(window.localStorage.getItem('contas'));
        if(contasGravadas == null){
            window.localStorage.setItem('contas',JSON.stringify([]));
            contasGravadas = JSON.parse(window.localStorage.getItem('contas'));
            contasGravadas.push(conta);
            window.localStorage.setItem('contas',JSON.stringify(contasGravadas));
        }
        else{
            contasGravadas.push(conta);
            window.localStorage.setItem('contas',JSON.stringify(contasGravadas));
        }

        Limpar();
        Swal.fire({
            title: 'Cadastrado com sucesso!',
            icon: 'success',
            showCancelButton: false,
            ConfirmButtonText: 'OK'
        });
        listarContas();
    }
}

function listarContas(){
    let contasGravadas = JSON.parse(window.localStorage.getItem('contas'));
    linhaconta = "";
    if(contasGravadas == "[]"){
        linhaconta = ""
        row = document.getElementById('tbody');
        row.innerHTML = linhaconta;
    }
    else{
        contasGravadas.forEach(element => {
            row = document.getElementById('tbody');
            linhaconta += "<tr style='width: 100%'>"+
                     "<td style='color: black;' id='tdid'>"+element.id +"</td>"+
                     "<td style='color: black;' id='nome'>"+element.nome +"</td>"+
                     "<td style='color: black;' id='tdtipo'>"+element.tipo +"</td>"+
                     "<td style='color: black;' id='tdcategoria'>"+element.categoria +"</td>"+
                     "<td id='tdacoes'><button style='margin-right:2px' class='btn btn-outline-success' onclick='editarContas("+element.id+")'><i class='fa fa-edit'></i></button>"+
                     "<button class='btn btn-outline-danger'onclick='apagarContas("+element.id+")'><i class='fa fa-trash'></i></button></td>"
                     +"</tr>";
                    row.innerHTML = linhaconta;
        })
    }
}

function apagarContas(id){
    Swal.fire({
        title: 'Confirmar a exclusão da conta?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim'
    }).then((result) => {
        if(result.value){
            let contasGravadas = JSON.parse(window.localStorage.getItem('contas'));
            let posicao = contasGravadas.findIndex(conta => conta.id == id);
            contasGravadas.splice(posicao,1);
            localStorage.setItem('contas', JSON.stringify(contasGravadas));
            listarContas();
            if(window.localStorage.getItem('contas') == "[]"){
                window.location.reload('cadastrocontas.html');
            }
        }
    })
}

function ListarCatContas(){
    let Categorias = JSON.parse(localStorage.getItem('categorias'));
    let linhacad = "";
    Categorias.forEach(element => {
      let row = document.getElementById("categorias");
        linhacad += "<option value="+element.nome+">"+element.nome+"</option>"
        row.innerHTML = linhacad;
    });
}

function editarContas(id){

    let conta = JSON.parse(window.localStorage.getItem("contas"));
    for(let i = 0; i < conta.length; i++){
      if(conta[i].id == id){
        document.getElementById("id").value = conta[i].id;
        document.getElementById("nome").value = conta[i].nome;
        document.getElementById("tipo").value = conta[i].tipo;
        document.getElementById("categorias").value = conta[i].categoria;

      }
    }
  }

function Limpar(){
    let inputs = document.getElementsByTagName('input');
    for(let i = 0; i < inputs.length; i++){
        inputs[i].value = "";
    }
}

function alterar(){

  const id = document.getElementById("id").value;
  const nome = document.getElementById("nome").value;
  const tipo = document.getElementById("tipo").value;
  const categoria = document.getElementById("categorias").value;

  contaGravada = JSON.parse(window.localStorage.getItem("contas"));
  let contaIndex = contaGravada.findIndex((conta => conta.id == id));

  if(contaIndex >= 0){
    contaGravada[contaIndex] = {id, nome, tipo, categoria};
    window.localStorage.setItem("contas", JSON.stringify(contaGravada));
  }

  Swal.fire({
    title: 'Conta atualizada com sucesso!',
    icon: 'success',
    showCancelButton: false,
    ConfirmButtonText: 'OK'
});

  Limpar();
  listarContas();

}

ListarCatContas();
listarContas();