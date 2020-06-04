const usuarios = []; // array para receber os objetos do tipo usuario

function salvarUsuario(){

  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  // let id = usuarios.length;
  const usuario = {id: Date.now(), status: "ativo", nome, endereco, telefone, email, senha};
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

 function alterarUsuario(){

  const id = document.getElementById("id").value;
  const status = document.getElementById("status").value;
  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;
  let usuarioIndex = usuarios.findIndex(usuario => usuario.id = id);  
  usuarios[usuarioIndex] = {id, status, nome, endereco, telefone, email};

  Swal.fire({
    
    icon: 'success',
    title: 'Usuário alterado com sucesso!',
    showConfirmButton: false,
    timer: 1500
  });
  listarUsuarios();
  limpar();

 }

 /*function totalUsuarios(){

  let usuarios = JSON.parse(window.localStorage.getItem("usuarios"));
  if(usuarios){
   document.getElementById("totalusuarios").innerHTML = usuarios.length;
  }else{
   document.getElementById("totalusuarios").innerHTML = 0;
  }

}

listarUsuarios();
totalUsuarios();*/
