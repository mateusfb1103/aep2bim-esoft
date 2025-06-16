document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('form-problema');
    const inputTitulo = document.getElementById('titulo');
    const inputDescricao = document.getElementById('descricao');
    const listaProblemasDiv = document.getElementById('lista-problemas');

    let problemas = [];

    function renderizarProblemas() {
        listaProblemasDiv.innerHTML = '';

        if (problemas.length === 0) {
            listaProblemasDiv.innerHTML = '<p>Nenhum problema cadastrado ainda.</p>';
        } else {
            problemas.forEach((problema, index) => {
                const card = document.createElement('div');
                card.className = 'problema-card';

                card.innerHTML = `
                    <div class="card-header">
                        <h3>${problema.titulo}</h3>
                        <button class="btn-remover" data-index="${index}">Remover</button>
                    </div>
                    <p>${problema.descricao}</p>
                `;

                listaProblemasDiv.appendChild(card);
            });
        }
    }

    function removerProblema(index) {
        problemas.splice(index, 1);
        renderizarProblemas();
    }

    listaProblemasDiv.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-remover')) {
            const indexParaRemover = parseInt(event.target.dataset.index, 10);
            removerProblema(indexParaRemover);
        }
    });
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const titulo = inputTitulo.value.trim();
        const descricao = inputDescricao.value.trim();

        if (titulo && descricao) {
            const novoProblema = {
                titulo: titulo,
                descricao: descricao
            };

            problemas.push(novoProblema);
            form.reset();
            renderizarProblemas();
        }
    });

    renderizarProblemas();
});