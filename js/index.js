const usuarios = [];

function salvarUsuario(){
  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;
  
  let id = usuarios.length;

  const usuario = {id: Date.now(),status: "ativo", nome, endereco, telefone, email};
  usuarios.push(usuario);
  Swal.fire({
    
    icon: 'success',
    title: 'Usuário cadastrado com sucesso!',
    showConfirmButton: false,
    timer: 1500
  });
  limpar();
  listarUsuarios();
 

}
function cadUsuario(){
  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const cidade = document.getElementById("cidade").value;
 

  const usuario = {id: Date.now(), status: "ativo", nome, endereco, telefone, email,senha, cidade};
  //usuarios.push(usuario);//
  // criar o objeto na localstorage
  // esta vazio na memoria
  //window.localStorage.setItem('usuarios',JSON.stringify([])); // criar
  // primeiro acesso verificar se existe a chave na memoria
  let usuarioGravado = JSON.parse(window.localStorage.getItem("usuarios"));
  if(usuarioGravado == null){ // primeiro acesso chave ainda não foi criada
    window.localStorage.setItem('usuarios',JSON.stringify([])); // criar
    usuarioGravado = JSON.parse(window.localStorage.getItem("usuarios"));// atualizar a minha variavel
    // validar se o email ja´ existe
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
  /*usuarioGravado.push(usuario);
  window.localStorage.setItem('usuarios',JSON.stringify(usuarioGravado));// gravo na memoria o array novo
  */
  
  
  
  /*Swal.fire({
    
    icon: 'success',
    title: 'Usuário cadastrado com sucesso!',
    showConfirmButton: false,
    timer: 1500
  });
  limpar();
  window.location.href = "index.html";*/
 
 

}


function apagarUsuario(id){
  Swal.fire({
    title: 'Confirmar a exclusão do Usuário?',
    
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
  //console.log(usuariosGravados);
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
          })
          
          Toast.fire({
            icon: 'success',
            title: `Bem vindo, ${usuariosGravados[usuarioIndex].nome} !`
          })
        }
  }
  
}

function limpar(){
  /* limpar de forma basica manual
document.getElementById("nome").value = "";
document.getElementById("endereco").value = "";
document.getElementById("telefone").value = "";
document.getElementById("email").value = "";
document.getElementById("cidade").value = ""; */

/* limpar de forma automatica */
let inputs = document.getElementsByTagName("input");
for(let i = 0; i < inputs.length; i++){
   inputs[i].value = "";
}
  
}

function editarUsuario(id){
  for(let i = 0; i < usuarios.length; i++){
      if(usuarios[i].id == id){

        document.getElementById("id").value = usuarios[i].id;
        document.getElementById("status").value = usuarios[i].status;
        document.getElementById("nome").value = usuarios[i].nome;
        document.getElementById("endereco").value = usuarios[i].endereco;
        document.getElementById("telefone").value = usuarios[i].telefone;
        document.getElementById("email").value = usuarios[i].email;
        document.getElementById("cidade").value = usuarios[i].cidade;
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
  const cidade = document.getElementById("cidade").value;

  // como fazer para atualiza a posicao do array
  usuarios[id] = {id,status,nome,endereco,telefone,email,cidade};
  Swal.fire({
    
    icon: 'success',
    title: 'Usuário atualizado com sucesso!',
    showConfirmButton: false,
    timer: 1500
  });
  limpar();
  listarUsuarios();

}


function listarUsuarios(){
  let linha = "";
  usuarios.forEach(usuario => {
    row = document.getElementById("tbody");
     linha += "<tr>"+
              "<td id='tdid'>"+usuario.id +"</td>"+
              "<td id='tdid'>"+usuario.status +"</td>"+
              "<td id='tdnome'>"+usuario.nome +"</td>"+
              "<td id='tdendereco'>"+usuario.endereco+"</td>"+
              "<td id='tdtelefone'>"+usuario.telefone+"</td>"+
              "<td id='tdemail'>"+usuario.email+"</td>"+
              "<td id='tdcidade'>"+usuario.cidade+"</td>"+
              "<td id='tdacoes'><button class='btn btn-outline-success' onclick='editarUsuario("+usuario.id+")'><i class='fa fa-edit'></i></button>"+
              "<button class='btn btn-outline-danger'onclick='apagarUsuario("+usuario.id+")'><i class='fa fa-trash'></i></button></td>"
            +"</tr>";
    row.innerHTML = linha;        
  });
 }
