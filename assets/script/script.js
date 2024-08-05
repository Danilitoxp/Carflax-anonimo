document.getElementById('sugestaoForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const tipo = document.getElementById('tipo').value;
    const sugestao = document.getElementById('sugestao').value;
    const mensagem = document.getElementById('mensagem');
    const loading = document.getElementById('loading');

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
