listaTarefa = document.querySelector('#lista-tarefas');
botaoIncluirTarefa = document.querySelector('#incluir-nova-tarefa');

inputNome = document.querySelector('#nova-tarefa-nome');
inputCategoria = document.querySelector('#nova-tarefa-categoria');
inputFiltroCategoria = document.querySelector('#filtro-de-categoria');
class Categoria {
    static LAZER = 'lazer';
    static COMPRAS = 'compras';
    static ESTUDOS = 'estudos';
    static classe(categoria) {
        return `categoria-${categoria}`
    }
}

class Tarefa {

    constructor(nome, categoria, realizada = false) {
        this.nome = nome;
        this.categoria = categoria;
        this.realizada = realizada;
    }

    adicionaNaPagina(containerEl) {

        const li = document.createElement('li');

        li.innerHTML = this.nome;

        li.classList.add(
            'item-tarefa',
            this.realizada ? 'marcado' : null,
            Categoria.classe(this.categoria)
        );

        containerEl.appendChild(li);

        li.addEventListener('click', () => {
            li.classList.toggle('marcado');
            this.realizada = this.realizada;
        });

    }
}

tarefas = [];

tarefas.push(new Tarefa('Comprar leite', Categoria.COMPRAS));
tarefas.push(new Tarefa('Escutar chimbinha', Categoria.LAZER, true));

listaTarefa.innerHTML = '';

tarefas.forEach(tarefa => {
    tarefa.adicionaNaPagina(listaTarefa);
});

function adicionaNovaTarefa() {
    novaTarefa = new Tarefa(inputNome.value, inputCategoria.value);
    novaTarefa.adicionaNaPagina(listaTarefa);
    tarefas.push(novaTarefa);
    inputNome.value = null;
    inputNome.focus();
}

botaoIncluirTarefa.addEventListener('click', () => {
    adicionaNovaTarefa();
});

inputFiltroCategoria.addEventListener('change', () => {
    listaTarefa.childNodes.forEach(tarefa => {
        const remove = !inputFiltroCategoria.value || tarefa.classList.contains(Categoria.classe(inputFiltroCategoria.value));
        if (remove) {
            tarefa.classList.remove('retido-no-filtro');
        } else {
            tarefa.classList.add('retido-no-filtro');
        }
    });
});

inputNome.addEventListener('keyup', keyEvent => {
    if (keyEvent.key === 'Enter') {
        adicionaNovaTarefa()
    }
});