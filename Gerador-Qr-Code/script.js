const wrapper = document.querySelector(".wrapper");
const form = wrapper.querySelector(".form");
const qrInput = wrapper.querySelector("#qr-texto");
const sizeSelect = wrapper.querySelector("#qr-tamanho");
const generateBtn = wrapper.querySelector(".form button");
const errorMsg = wrapper.querySelector(".erro");
const qrImg = wrapper.querySelector(".qr-code img");
const downloadLink = wrapper.querySelector(".baixar");

const TEXTO_BOTAO = "Gerar QR Code";
let urlBaixar = null;

function setLoading(loading) {
    generateBtn.disabled = loading;
    generateBtn.innerText = loading ? "Gerando QR Code..." : TEXTO_BOTAO;
}

function showError(msg) {
    errorMsg.textContent = msg;
}

// Um único listener de load/erro (antes, cada clique adicionava mais um)
qrImg.addEventListener("load", async () => {
    setLoading(false);
    wrapper.classList.add("active");

    // Baixa a imagem como arquivo para o botão "Baixar PNG" funcionar
    try {
        const resp = await fetch(qrImg.src);
        const blob = await resp.blob();
        if (urlBaixar) URL.revokeObjectURL(urlBaixar);
        urlBaixar = URL.createObjectURL(blob);
        downloadLink.href = urlBaixar;
    } catch {
        downloadLink.href = qrImg.src;
    }
});

qrImg.addEventListener("error", () => {
    if (!qrImg.getAttribute("src")) return;
    setLoading(false);
    showError("Não foi possível gerar o QR Code. Verifique sua internet e tente de novo.");
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const qrValue = qrInput.value.trim();
    showError("");

    if (!qrValue) {
        showError("Digite um link ou texto primeiro.");
        qrInput.focus();
        return;
    }

    const size = sizeSelect.value;
    setLoading(true);
    // encodeURIComponent evita que &, #, ? e acentos quebrem o QR Code
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=10&data=${encodeURIComponent(qrValue)}`;
});

qrInput.addEventListener("input", () => {
    showError("");
    if (!qrInput.value.trim()) {
        wrapper.classList.remove("active");
    }
});
