const usuarios = [];

function salvarUsuario(){

  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;
  const usuario = {id: Date.now(), status: "ativo", nome, endereco, telefone, email};
     usuarios.push(usuario); 
  // gravar no localstorage
  window.localStorage.setItem("usuarios",JSON.stringify(usuarios));   
  Swal.fire({
    icon: 'success',
    title: 'Usuário cadastrado com sucesso!',
    showConfirmButton: false,
    timer: 1500
  });
  listarUsuarios();
  limpar();

 }

function cadUsuario(){

  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const usuario = {id: Date.now(),status: "ativo", nome, endereco, telefone, email, senha};
  // primeiro acesso verificar se existe a chave na memoria
  let usuarioGravado = JSON.parse(window.localStorage.getItem("usuarios"));
  if(usuarioGravado == null){ // primeiro acesso chave ainda não foi criada
    window.localStorage.setItem('usuarios',JSON.stringify([])); // criar
    usuarioGravado = JSON.parse(window.localStorage.getItem("usuarios"));// atualizar a minha variavel
    // validar se o email já existe
    let usuarioIndex = usuarioGravado.findIndex(usuario => usuario.email === email);
    if(usuarioIndex !== -1){ // já existe um email gravado na memoria
      Swal.fire({
        icon: 'warning',
        title: 'Email já está cadastrado no sistema!',
        showConfirmButton: false,
        timer: 1500
      });
    }else{
      usuarioGravado.push(usuario); // adiciona um novo usuario
      window.localStorage.setItem('usuarios', JSON.stringify(usuarioGravado)); // gravar na memoria o objeto atualizado
    }
  }else{ // chave usuario já existe na memória
    let usuarioIndex = usuarioGravado.findIndex(usuario => usuario.email === email);
    if(usuarioIndex !== -1){ // já existe um email gravado na memoria
      Swal.fire({
        icon: 'warning',
        title: 'Email já está cadastrado no sistema!',
        showConfirmButton: false,
        timer: 1500
      });
    }
    else{
      usuarioGravado.push(usuario); // adiciono um novo usuario
      window.localStorage.setItem('usuarios',JSON.stringify(usuarioGravado)); // gravar na memoria
    }  
  }
  Swal.fire({
    icon: 'success',
    title: 'Usuário cadastrado com sucesso!',
    showConfirmButton: false,
    timer: 1500
  });
  limpar();
  window.location.href = "dashboard.html";

}

function apagarUsuario(id){

  Swal.fire({
    title: 'Excluir Usuário?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim'
  }).then((result) => {
    if (result.value) {
      let usuarioIndex = usuarios.findIndex(usuario => usuario.id == id);
      if(usuarioIndex >= 0){
        usuarios.splice(usuarioIndex,1);
        if(usuarios.length > 0){
          listarUsuarios();
        }else{
          row = document.getElementById("tbody");
          row.innerHTML = "";
        }
      }
      Swal.fire(
        'Usuário excluído!',
        '',
        'success'
      )
    }
  });

}

function logar(){

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  // recuperar o valor do localstorage
  let usuariosGravados = JSON.parse(window.localStorage.getItem("usuarios"));
  let usuarioIndex = usuariosGravados.findIndex(usuario => usuario.email === email);
  if(usuarioIndex === -1){ // não tem email cadastrado
    Swal.fire({
      icon: 'warning',
      title: 'Email não cadastrado!',
      showConfirmButton: false,
      timer: 1500
    });
  }else{ // o email é valido e agora vou testar a senha
        if(usuariosGravados[usuarioIndex].senha !== senha){ // senha incorreta
          Swal.fire({
            icon: 'warning',
            title: 'Senha incorreta!',
            showConfirmButton: false,
            timer: 1500
          });
        }else{ // email e senha validados corretos
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          });
          Toast.fire({
            icon: 'success',
            title: `Bem vindo, ${usuariosGravados[usuarioIndex].nome}!`
          });
          setInterval(function(){
            window.location.href = "dashboard.html"; 
          }),3000;
        }
  }
  
}

function limpar(){

let inputs = document.getElementsByTagName("input");
for(let i = 0; i < inputs.length; i++){
   inputs[i].value = "";
}
  
}

function editarUsuario(id){

  let usuarios = JSON.parse(window.localStorage.getItem("usuarios"));
  for(let i = 0; i < usuarios.length; i++){
    if(usuarios[i].id == id){
      document.getElementById("id").value = usuarios[i].id;
      document.getElementById("status").value = usuarios[i].status;
      document.getElementById("nome").value = usuarios[i].nome;
      document.getElementById("endereco").value = usuarios[i].endereco;
      document.getElementById("telefone").value = usuarios[i].telefone;
      document.getElementById("email").value = usuarios[i].email;
    }
  }

}

function alterarUsuario(){

  const id = document.getElementById("id").value;
  const status = document.getElementById("status").value;
  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;
  // como fazer para atualiza a posicao do array
  usuarios[id] = {id,status,nome,endereco,telefone,email};
  Swal.fire({
    icon: 'success',
    title: 'Dados atualizados com sucesso!',
    showConfirmButton: false,
    timer: 1500
  });
  limpar();
  listarUsuarios();

}

function listarUsuarios(){

  let linha = "";
  let usuariosGravado = JSON.parse(window.localStorage.getItem("usuarios"));
  if(usuariosGravado){
    usuariosGravado.forEach(usuario => {
      row = document.getElementById("tbody");
        if(row){
        linha += "<tr>"+
                  "<td id='tdnome'>"+usuario.nome +"</td>"+
                  "<td id='tdendereco'>"+usuario.endereco+"</td>"+
                  "<td id='tdtelefone'>"+usuario.telefone+"</td>"+
                  "<td id='tdemail'>"+usuario.email+"</td>"+
                  "<td id='tdacoes'><button class='btn btn-success' onclick='editarUsuario("+usuario.id+")'><i class='fa fa-edit'></i></button>"
                +"</tr>";
        row.innerHTML = linha;
        }
    });
  }

}

 listarUsuarios();

function alterarSenha(){

  const senha = document.getElementById("senha").value;
  const novasenha = document.getElementById("novasenha").value;
  const confirmar = document.getElementById("confirmar").value;
  // recuperar o valor do localstorage
  let usuariosGravados = JSON.parse(window.localStorage.getItem("usuarios"));
  let usuarioIndex = usuariosGravados.findIndex(usuario => usuario.senha === senha);
  if(usuarioIndex === -1){ // a senha antiga está incorreta
    Swal.fire({
      icon: 'warning',
      title: 'Senha antiga incorreta!',
      showConfirmButton: false,
      timer: 1500
    });
  }else{ // a senha antiga está correta e agora vou testar a nova senha
    if(novasenha !== confirmar){ // senha incorreta
      Swal.fire({
        icon: 'warning',
        title: 'Senha incorreta!',
        showConfirmButton: false,
        timer: 1500
      });
    }else{ // senha antiga e nova senha estão corretas
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });
      Toast.fire({
        icon: 'success',
        title: `Senha alterada com Sucesso!`
      });
      setInterval(function(){
        window.location.href = "dashboard.html"; 
      }),3000;
    }
  }
}

function ListarCatContas(){
  let Contas = JSON.parse(localStorage.getItem('contas'))
  let linhacad = "";
  Contas.forEach(element => {
    let row = document.getElementById("contalancamento");
      linhacad += "<option value="+element.nome+">"+element.nome+"</option>"
      row.innerHTML = linhacad;
  });
}

ListarCatContas();

function sair(){

  window.location.href = "index.html";

}

function totalreceitas(){

  let lancamentos = JSON.parse(window.localStorage.getItem("lancamentos"));
  
  if(lancamentos){
   document.getElementById("totalreceitas").innerHTML = "R$ " + contas.length;
  }else{
   document.getElementById("totalusuarios").innerHTML = "R$ 0,00";
  }

}

function totaldespesas(){

  let contas = JSON.parse(window.localStorage.getItem("contas"));
  if(contas){
   document.getElementById("totaldespesas").innerHTML = "R$ " + contas.length;
  }else{
   document.getElementById("totalusuarios").innerHTML = "R$ 0,00";
  }

}

function totalsaldo(){

  let contas = JSON.parse(window.localStorage.getItem("contas"));
  if(contas){
   document.getElementById("totalsaldo").innerHTML = "R$ " + contas.length;
  }else{
   document.getElementById("totalusuarios").innerHTML = "R$ 0,00";
  }

}

  totalreceitas();
  totaldespesas();
  totalsaldo();

