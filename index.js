
 let nome = document.querySelector('#nome')
 let senha = document.querySelector('#senha')
 let lista = JSON.parse(localStorage.getItem('cadastros'))

function entrar() {

    let usuario = {
        nome:'',
        senha:'',
        tarefa: []
    }

   let usuarioValido;

    lista.forEach((_usuario) => {
        if(nome.value == _usuario.nome && senha.value == _usuario.senha){
          usuario = {
            nome: _usuario.nome,
            senha:_usuario.senha,
            tarefa:_usuario.tarefa
          } 
          usuarioValido = true 
        }
    })

    if(usuarioValido){
        localStorage.setItem ('usuario', JSON.stringify(usuario))
        localStorage.setItem ('token', 78374)
        window.location.href = "./mensagens.html"
    }else{
        alert ('Usuário ou senha inválidos')
    }

}

