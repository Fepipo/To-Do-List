let lista_de_tarefas = []


if (localStorage.length > 0) {
    upload_tarefas()
}


function add_tarefa(texto_da_tarefa, only_add) {

    if (only_add === false) {
        const tarefa_elemento = document.querySelector("input[name=input1]")

        if (lista_de_tarefas.includes(texto_da_tarefa)) {
            window.alert(`A tarefa "${texto_da_tarefa}" já foi adicionada na lista de tarefas.`)

            tarefa_elemento.value = ""

            return
        }
    }

    const ul_com_tarefas = document.querySelector("#grupo-lista")
    
    const tarefa = document.createElement("li")

    tarefa.innerHTML = texto_da_tarefa

    tarefa.className = "list-group-item"

    tarefa.id = texto_da_tarefa

    tarefa.onclick = function() {
        lista_de_tarefas.splice(lista_de_tarefas.indexOf(texto_da_tarefa), 1)

        localStorage.setItem("tarefas", JSON.stringify(lista_de_tarefas))

        this.remove()
    }
    
    lista_de_tarefas.push(texto_da_tarefa)

    if (only_add === false) {
        localStorage.setItem("tarefas", JSON.stringify(lista_de_tarefas))
    }

    ul_com_tarefas.append(tarefa)
}


function upload_tarefas() {
    const lista_localstorage = JSON.parse(localStorage.getItem("tarefas"))

    for (let i =  0;i < lista_localstorage.length; i++) {
        add_tarefa(lista_localstorage[i], true)
    }
}


const form = document.querySelector("form")

form.addEventListener('submit', function(event) {
    const formdata = new FormData(form)
    event.preventDefault()
    
    const input_valor = this.querySelector("input[name=input1]").value
    
    document.querySelector("input[name=input1]").value = ""
    
    if (input_valor.trim() === "") {
        return
    }

    add_tarefa(input_valor, false)
})