let descricao = document.querySelector("#descricao")
let detalhamento = document.querySelector("#detalhamento")
let btnPrincipal = document.querySelector("#btnPrincipal")
let ul = document.querySelector("ul")
let usuario = JSON.parse(localStorage.getItem('usuario'))
let cadastros = JSON.parse(localStorage.getItem("cadastros"))
let token = document.querySelector("token")


function validaToken () {
    if(token !== '78374'){
        window.location.href="./index"
    }
}


function salvarInformacoes(){
    if(descricao.value == "" || detalhamento.value == ""){
        return alert ('Preencha todos os campos')
    } else {
        usuario.tarefa.push({
            descricao: descricao.value,
            detalhamento: detalhamento.value,
        })

    atualizarLocalStorage()
    descricao.value = ""
    detalhamento.value = ""
    }
}

function atualizarLocalStorage() {
    salvarCadastros()
    localStorage.setItem('usuario', JSON.stringify(usuario))
    pegarTarefas()
}

function pegarTarefas() {
    ul.innerHTML = ""
    usuario.tarefa.forEach((tarefa, i) => {
        mostrarNoHTML(tarefa.descricao, tarefa.detalhamento, i)    
    });
}

function mostrarNoHTML(descricao, detalhamento, i) {
    let li = document.createElement("li")
    li.innerHTML = `
    <b>${i +1}</b>   |      ${descricao}:    ${detalhamento}
    <button id="btnApagar" onclick='deletarTarefa (${i})'>Apagar</button> 
    <button id="btnEditar" onclick='editarTarefa (${i})'>Editar</button> 
    `
    ul.appendChild(li);
}

function deletarTarefa(i) {
    let confirm = window.confirm ("deseja realmente apagar este recado?")
    if (confirm) {
        usuario.tarefa.splice(i,1)
        atualizarLocalStorage()
    }
}

function editarTarefa(i) {
    descricao.value = usuario.tarefa[i].descricao
    detalhamento.value = usuario.tarefa[i].detalhamento
    btnPrincipal.setAttribute('onclick', `salvarEdicao(${i})`)
    btnPrincipal.innerHTML = 'Salvar Edição'
}

function salvarEdicao(i) {
    usuario.tarefa[i].descricao = descricao.value;
    usuario.tarefa[i].detalhamento = detalhamento.value;
    btnPrincipal.setAttribute("onclick", "salvarInformacoes()")
    btnPrincipal.innerHTML = "Adicionar Recado"
    atualizarLocalStorage()
    descricao.value = ""
    detalhamento.value = ""
}
setTimeout(() => {
    pegarTarefas()
})

function salvarCadastros () {
    cadastros.forEach((nome) =>  {
        if (nome.nome == usuario.nome) {
            usuario.tarefa = nome.tarefa
        }})
    localStorage.setItem('cadastros', JSON.stringify(cadastros))
}

function sair() {
 
        localStorage.removeItem('usuario')
        window.location.href='./index.html'
}

