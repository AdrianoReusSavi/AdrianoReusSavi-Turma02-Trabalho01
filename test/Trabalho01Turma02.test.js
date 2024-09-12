const Biblioteca = require("../src/Trabalho01Turma02");

describe("Teste da classe Biblioteca", () => {
    let biblioteca;
    
    beforeEach(() => {
        biblioteca = new Biblioteca();
    })

    test("Buscar livro por id entre livros inseridos", () => {
        let livroTerror = {id : 1, titulo: 'livro de terror', genero: 'terror', autor: 'membro um'};
        let livroSuspense = {id : 1, titulo: 'livro de suspense', genero: 'suspense', autor: 'membro dois'};

        biblioteca.adicionarLivro(livroTerror);
        biblioteca.adicionarLivro(livroSuspense);

        let livroBuscado = biblioteca.buscarLivroPorId(1);

        expect(livroBuscado).toBe(livroTerror);

        expect(biblioteca.contarLivros()).toBe(2);
    });

    test("Buscar e remover livros inseridos por título", () => {
        let livroTerror = {id : 1, titulo: 'livro de terror', genero: 'terror', autor: 'membro um'};

        biblioteca.adicionarLivro(livroTerror);

        let livroExcluir = biblioteca.buscarLivroPorTitulo('livro de terror');

        biblioteca.removerLivro(livroExcluir.id);

        expect(biblioteca.listarLivros()).not.toContain(livroExcluir);
    });

    test("Buscar membro por id entre membros inseridos", () => {
        let membroUm = {id : 1, nome: 'membro um'};
        let membroDois = {id : 2, nome: 'membro dois'};

        biblioteca.adicionarMembro(membroUm);
        biblioteca.adicionarMembro(membroDois);

        let membroBuscar = biblioteca.buscarMembroPorId(1);

        expect(membroBuscar).toBe(membroUm);
        expect(biblioteca.contarMembros()).toBe(2);
    });

    test("Remover membros inseridos por id", () => {
        let membroUm = {id : 1, nome: 'membro um'};

        biblioteca.adicionarMembro(membroUm);

        let membroExcluir = biblioteca.buscarMembroPorId(1);

        biblioteca.removerMembro(membroExcluir.id);

        expect(biblioteca.listarMembros()).not.toContain(membroExcluir);
    });

    test("Emprestar livros para membro", () => {
        let livro = {id : 1, titulo: 'teste um'};

        biblioteca.adicionarLivro(livro);

        biblioteca.adicionarMembro({id : 1, nome: 'membro um'});
        biblioteca.adicionarMembro({id : 2, nome: 'membro dois'});

        let livroEmprestadoMembroUm = biblioteca.emprestarLivro(1, 1);
        let livroEmprestadoMembroDois = biblioteca.emprestarLivro(1, 2);

        expect(livroEmprestadoMembroUm).toBeTruthy();
        expect(livroEmprestadoMembroDois).toBeFalsy();
        expect(biblioteca.listarLivrosEmprestados()).toContain(livro);
        expect(biblioteca.listarLivrosDisponiveis()).not.toContain(livro);
    });

    test("Devolver livros emprestados", () => {
        let livroTerror = {id : 1, titulo: 'livro de terror', genero: 'terror', autor: 'membro um'};
        let livroSuspense = {id : 1, titulo: 'livro de suspense', genero: 'suspense', autor: 'membro dois'};

        biblioteca.adicionarLivro(livroTerror);
        biblioteca.adicionarLivro(livroSuspense);

        biblioteca.adicionarMembro({id : 1, nome: 'membro um'});

        biblioteca.emprestarLivro(1, 1);

        expect(biblioteca.devolverLivro(1)).toBeTruthy();
        expect(biblioteca.devolverLivro(2)).toBeFalsy();
    });

    test("Atualizando informações de livros", () => {
        let livroTerror = {id : 1, titulo: 'livro de terror', genero: 'terror', autor: 'membro um'};

        biblioteca.adicionarLivro(livroTerror);

        biblioteca.atualizarInformacaoLivro(1, {ano: 2019});

        let livroAtualizado = biblioteca.buscarLivroPorId(1);

        expect(biblioteca.listarLivrosPorAno(2019)).toContain(livroAtualizado);
    });

    test("Filtrando livros por gênero", () => {
        let livroTerror = {id : 1, titulo: 'livro de terror', genero: 'terror', autor: 'membro um'};
        let livroSuspense = {id : 1, titulo: 'livro de suspense', genero: 'suspense', autor: 'membro dois'};

        biblioteca.adicionarLivro(livroTerror);
        biblioteca.adicionarLivro(livroSuspense);

        expect(biblioteca.listarLivrosPorGenero('terror')).toContain(livroTerror);
    });

    test("Filtrando livros por autor", () => {
        let livroTerror = {id : 1, titulo: 'livro de terror', genero: 'terror', autor: 'membro um'};
        let livroSuspense = {id : 1, titulo: 'livro de suspense', genero: 'suspense', autor: 'membro dois'};

        biblioteca.adicionarLivro(livroTerror);
        biblioteca.adicionarLivro(livroSuspense);

        expect(biblioteca.listarLivrosPorAutor('membro dois')).not.toContain(livroTerror);
    });
})