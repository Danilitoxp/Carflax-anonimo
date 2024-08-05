document.getElementById('sugestaoForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const tipo = document.getElementById('tipo').value;
    const sugestao = document.getElementById('sugestao').value;
    const mensagem = document.getElementById('mensagem');
    const loading = document.getElementById('loading');

    // Lista de palavras ofensivas
    const palavrasOfensivas = ['lixo', 'Horrivel', 'merda', 'Idiota', 'Otario']; // Adicione palavras ofensivas reais aqui

    function contemPalavrasOfensivas(texto) {
        return palavrasOfensivas.some(palavra => texto.toLowerCase().includes(palavra));
    }

    if (contemPalavrasOfensivas(sugestao)) {
        mensagem.textContent = 'Sua mensagem contém palavras inapropriadas. Por favor, revise.';
        mensagem.classList.add('mensagem-erro');
        return;
    }

    loading.style.display = 'block';
    mensagem.style.opacity = '0';
    mensagem.classList.remove('mensagem-sucesso', 'mensagem-erro');

    try {
        await enviarSugestao(tipo, sugestao);
        mensagem.textContent = 'Mensagem enviada com sucesso!';
        mensagem.classList.add('mensagem-sucesso');
        document.getElementById('sugestaoForm').reset();
    } catch (error) {
        mensagem.textContent = 'Erro ao enviar mensagem. Tente novamente.';
        mensagem.classList.add('mensagem-erro');
    } finally {
        loading.style.display = 'none';
        setTimeout(() => {
            mensagem.style.opacity = '1';
            mensagem.style.transform = 'scale(1)';
        }, 100);
    }
});

async function enviarSugestao(tipo, sugestao) {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzOvNJ-Cna54KaPYFliHLwempNqnMTi45SO5bR8yGh7sCeYvrLbsvZjSBR1ArH0o2M32w/exec';
    const response = await fetch(scriptURL, {
        method: 'POST',
        body: new URLSearchParams({ tipo, sugestao })
    });

    if (!response.ok) {
        throw new Error('Erro ao enviar mensagem');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const container = document.querySelector('.container');

    // Verifica a preferência do tema
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        container.classList.add('dark-theme');
    } else {
        body.classList.add('light-theme');
        container.classList.add('light-theme');
    }

    // Alterna entre temas ao clicar no ícone
    toggle.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            container.classList.remove('light-theme');
            container.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            container.classList.remove('dark-theme');
            container.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        }
    });
});
