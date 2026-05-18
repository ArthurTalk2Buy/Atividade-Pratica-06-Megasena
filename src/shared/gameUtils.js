const MIN = 1;
const MAX = 60;
const SORTEADOS = 6;

export function gerarNumerosAleatorios(quantidade) {
  const numeros = new Set();
  while (numeros.size < quantidade) {
    numeros.add(Math.floor(Math.random() * (MAX - MIN + 1)) + MIN);
  }
  return Array.from(numeros).sort((a, b) => a - b);
}

export function gerarSorteio() {
  return gerarNumerosAleatorios(SORTEADOS);
}

export function gerarBilhete() {
  const parte = () => String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  return `${parte()}-${parte()}-${parte()}`;
}

export function contarAcertos(escolhidos, sorteados) {
  return escolhidos.filter((n) => sorteados.includes(n)).length;
}

export function formatarDezena(numero) {
  return String(numero).padStart(2, '0');
}
