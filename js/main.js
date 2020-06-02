function totalProdutos(){
  let produtos = JSON.parse(window.localStorage.getItem("produtos"));
  if(produtos){
   document.getElementById("totalprodutos").innerHTML = produtos.length;
  }else{
   document.getElementById("totalprodutos").innerHTML = 0;
  }
}
function totalUsuarios(){
  let usuarios = JSON.parse(window.localStorage.getItem("usuarios"));
  if(usuarios){
   document.getElementById("totalusuarios").innerHTML = usuarios.length;
  }else{
   document.getElementById("totalusuarios").innerHTML = 0;
  }
}

totalProdutos();
totalUsuarios();