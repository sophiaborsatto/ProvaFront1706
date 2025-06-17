const botao = document.getElementById('btnCadastrar');
const devolucao = document.getElementById('data').value;
// cadastrar
    botao.addEventListener('click',
        function () {
            let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []; //localStorage é uma memória do computador
            const usuario = {
                nome : document.getElementById("nome").value.trim(),
                livro : document.getElementById("livro").value.trim(),
                tipo : document.getElementById("tipo").value.trim(),
                data : document.getElementById("data").value.trim()
            }

            const indexEditando = document.getElementById('indexEditar').value;
            if(indexEditando !== ""){
                usuarios[indexEditando] = usuario;
                document.getElementById('indexEditar').value = "";
            }else{
                usuarios.push(usuario);
            }
            
           // const devolucao = document.getElementById("data").value;
            if (tipo === "Adulto") {
                devolucao = devolucao + 7;
              } else if (tipo === "Adolescente") {
                devolucao = devolucao + 5;
              } else if (tipo === "Infantil") {
                devolucao = devolucao + 3;
              }
            

            let listaUsuarios = JSON.stringify(usuarios);
            localStorage.setItem("usuarios", listaUsuarios);
            document.getElementById('nome').value = '';
            document.getElementById('livro').value = ''; 
            document.getElementById('tipo').value = '';
            document.getElementById('data').value = '';
            //devolucao = '';
            listar();
        }
    );

//listar
    function listar(){
        const listaUsuarioCad = JSON.parse(localStorage.getItem("usuarios")) || [];
        console.log(listaUsuarioCad);
        const tabelaListaUsuarios = document.getElementById('listaUsuarios');
        tabelaListaUsuarios.innerHTML = "";

    //forEach percorrendo o vetor e apresentando Login e Senha 
        listaUsuarioCad.forEach((usuario, index) => { //função for que percorre o vetor (para cada)
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${usuario.nome}</td>
                <td>${usuario.livro}</td>
                <td>${usuario.tipo}</td>
                <td>${usuario.data}</td>
                <td>${usuario.devolucao}</td>
                <td>
                    <button onclick="editarUsuario(${index})">Editar</button>
                    <button onclick="excluirUsuario(${index})">Remover</button>
                </td>
            `;
            tabelaListaUsuarios.appendChild(linha);
        });
    }

//remover
    function excluirUsuario(index){
        const listaUsuariosCadastrados = JSON.parse(localStorage.getItem("usuarios"))||[];

        if (confirm("Você realmente deseja excluir?")){
            listaUsuariosCadastrados.splice(index, 1);
            listaJson = JSON.stringify(listaUsuariosCadastrados);
            localStorage.setItem("usuarios", listaJson);
            listar();
        }
    }

    function editarUsuario(index){
        const listaUsuariosCadastrados = JSON.parse(localStorage.getItem("usuarios"))||[];
        const usuario = listaUsuariosCadastrados[index];
        document.getElementById('nome').value = usuario.nome;
        document.getElementById('livro').value = usuario.livro;
        document.getElementById('tipo').value = usuario.tipo;
        document.getElementById('data').value = usuario.data;
        //devolucao = usuario.devolucao;
        document.getElementById('indexEditar').value = index;
    }

listar();