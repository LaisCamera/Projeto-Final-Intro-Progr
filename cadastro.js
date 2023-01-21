
const listaCadastros = buscarDadosDoLocalStorage('cadastros') 
console.log(listaCadastros)

const formularioHTML = document.getElementById('box-cadastro');

formularioHTML.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const nome = document.getElementById('nome').value
    const senha = document.getElementById('senha').value
    const confirmaSenha = document.getElementById('confirmaSenha').value

    if (senha !== confirmaSenha){
        alert('As senhas digitadas devem ser iguais')
        return
    }
    
    let contatoVerificado = validarContato(nome)
    if (contatoVerificado) {
        alert('Usuário já cadastrado')
        return
    }

   

    const novoCadastro = {
        nome: nome,
        senha: senha,
        tarefa: [],
    }


    listaCadastros.push(novoCadastro)
    guardarNoLocalStorage('cadastros', listaCadastros)

    formularioHTML.reset()

    alert('Usuário cadastrado com sucesso')
    window.location.href="./index.html"
})

function guardarNoLocalStorage(chave, valor) {
    const valorJSON = JSON.stringify(valor)

    localStorage.setItem(chave, valorJSON)

}

function buscarDadosDoLocalStorage(chave) {

    const dadoJSON = localStorage.getItem(chave)

    if(dadoJSON) {
        const listaDados = JSON.parse(dadoJSON)
        return listaDados
    } else {
        return []
    }

}

function validarContato (_nome) {
    for(const nome in listaCadastros) {
     if (listaCadastros[nome].nome === _nome){
        return true 
     }
    }
 }

 
