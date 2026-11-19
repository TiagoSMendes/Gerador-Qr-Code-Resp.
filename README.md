# Gerador de QR Code

Gera QR Codes a partir de links ou textos e permite baixar a imagem em PNG. Responsivo, feito com HTML, CSS e JavaScript puro.

## Como usar

1. Abra `Gerador-Qr-Code/index.html` no navegador.
2. Digite um link ou texto e escolha o tamanho.
3. Clique em **Gerar QR Code** (ou aperte Enter) e depois em **Baixar PNG**.

## Detalhes técnicos

- As imagens são geradas pela API pública [goqr.me / qrserver.com](https://goqr.me/api/).
- O texto é codificado com `encodeURIComponent`, então links com `&`, `#`, `?` e acentos funcionam.
- Mensagens de erro quando o campo está vazio ou a API não responde.
- Acessível: rótulos para leitor de tela e foco visível.
