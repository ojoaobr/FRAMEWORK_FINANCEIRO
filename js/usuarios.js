const usuarios = []; // array para receber os objetos do tipo usuario




function salvarUsuario(){
  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;
  const cidade = document.getElementById("cidade").value;
  const senha = document.getElementById("senha").value;
  // let id = usuarios.length;
  const usuario = {id: Date.now(),
     nome, endereco, telefone, email, cidade,senha};
     usuarios.push(usuario); 
  // gravar no localstorage
  window.localStorage.setItem("usuarios",JSON.stringify(usuarios));   
  
 
  
  Swal.fire({
    
    icon: 'success',
    title: 'Usuário cadastrado com sucesso!!!',
    showConfirmButton: false,
    timer: 1500
  });
  listarUsuarios();
  limparInputs();
  

 }
function cadUsuario(){
  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;
  const cidade = document.getElementById("cidade").value;
  const senha = document.getElementById("senha").value;
  let id = usuarios.length;
  const usuario = {id: id++,
     nome, endereco, telefone, email, cidade,senha};
     //usuarios.push(usuario); 
  // gravar no localstorage
  //window.localStorage.setItem("usuarios",JSON.stringify([]));
  let usuariosGravados = JSON.parse(window.localStorage.getItem("usuarios"));
  
  if(usuariosGravados == null){
   
    window.localStorage.setItem("usuarios",JSON.stringify([])); // criar
    usuariosGravados = JSON.parse(window.localStorage.getItem("usuarios")); // recuperar novamente
    usuariosGravados.push(usuario); // inserir o novo registro
    window.localStorage.setItem("usuarios",JSON.stringify(usuariosGravados)); // gravar na memoria novamente
  }else{
   
    usuariosGravados.push(usuario);
    window.localStorage.setItem("usuarios",JSON.stringify(usuariosGravados));   

  }
   
  
 
  
  Swal.fire({
    
    icon: 'success',
    title: 'Usuário cadastrado com sucesso!!!',
    showConfirmButton: false,
    timer: 2500
  });
  
  limparInputs();
  window.location.href="index.html";
  

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
      const usuarioIndex = usuarios.findIndex(usuario => usuario.id == id);
      usuarios.splice(usuarioIndex,1);
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
        'Usuário excluído com sucesso',
        '',
        'success'
      )
    }
  });
      
 }

 function editarUsuario(id){
   for(let i =0; i< usuarios.length; i++){
     if(usuarios[i].id == id){
     document.getElementById("id").value =  usuarios[i].id;
     document.getElementById("nome").value =  usuarios[i].nome;
      document.getElementById("endereco").value = usuarios[i].endereco;
       document.getElementById("telefone").value =  usuarios[i].telefone;
      document.getElementById("email").value =  usuarios[i].email;
     document.getElementById("cidade").value =  usuarios[i].cidade;
     
     }
   }
   
 }
 function alterarUsuario(){
  const id = document.getElementById("id").value;
  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;
  const cidade = document.getElementById("cidade").value;
  let usuarioIndex = usuarios.findIndex(usuario => usuario.id = id);  
  usuarios[usuarioIndex] = {id,nome, endereco, telefone, email, cidade};

  Swal.fire({
    
    icon: 'success',
    title: 'Usuário alterado com sucesso!!!',
    showConfirmButton: false,
    timer: 1500
  });
  listarUsuarios();
  limparInputs();
 }

 function listarUsuarios(){
  let linha = "";
  let usuariosGravado = JSON.parse(window.localStorage.getItem("usuarios"));
  if(usuariosGravado){
  usuariosGravado.forEach(usuario => {
    row = document.getElementById("tbody");
    if(row){
     linha += "<tr>"+
              "<td id='tdid'>"+usuario.id +"</td>"+
              "<td id='tdnome'>"+usuario.nome +"</td>"+
              "<td id='tdendereco'>"+usuario.endereco+"</td>"+
              "<td id='tdtelefone'>"+usuario.telefone+"</td>"+
              "<td id='tdemail'>"+usuario.email+"</td>"+
              "<td id='tdcidade'>"+usuario.cidade+"</td>"+
              "<td id='tdacoes'><button class='btn btn-outline-success' onclick='editarUsuario("+usuario.id+")'><i class='fa fa-edit'></i></button>"+
              "<button class='btn btn-outline-danger'onclick='apagarUsuario("+usuario.id+")'><i class='fa fa-trash'></i></button></td>"
            +"</tr>";
    row.innerHTML = linha;        
    }
  
  
  });
}
 }

 function limparInputs(){
   let inputs = document.getElementsByTagName("input");
   
  for(let i=0; i < inputs.length; i++){
     inputs[i].value = "";
    
   }
 }

 function logar(){
   // recuperando a lista de usuarios
   
   const email = document.getElementById("email").value;
   const senha = document.getElementById("senha").value;
   let usuariosGravados = JSON.parse(window.localStorage.getItem("usuarios"));
  
   let usuarioIndex = usuariosGravados.findIndex(usuario => usuario.email === email);
   if(usuarioIndex === -1){
    Swal.fire({
    
      icon: 'warning',
      title: 'Email informado está incorreto',
      showConfirmButton: false,
      timer: 1500
    });
   }else{
     if(usuariosGravados[usuarioIndex].senha !== senha){
      Swal.fire({
    
        icon: 'warning',
        title: 'Senha informada está incorreta',
        showConfirmButton: false,
        timer: 1500
      }); 
      document.getElementById("senha").value = '';
     }else{
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
        title: `Bem vindo ${usuariosGravados[usuarioIndex].nome}`
      });
      setInterval(function(){
        window.location.href = "dashboard.html"; 
      }),3000;
        
      }
      
      
     }
   }

 listarUsuarios();




  
 /*const Toast = Swal.mixin({
  toast: true,
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
    listarUsuarios();
  }
})

Toast.fire({
  icon: 'success',
  title: 'Usuário Cadastrado com Sucesso!!!'
});*/