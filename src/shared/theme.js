export const CORES = {
  fundo: '#00FFFF',
  fundoClaro: '#e0fffe',
  verdeEscuro: '#003d20',
  verdeMega: '#209869',
  verdeClaro: '#34d399',
  azulBotao: '#0057a8',
  azulClaro: '#3b82f6',
  azulSelecionado: '#0057a8',
  roxo: '#7c3aed',
  branco: '#FFFFFF',
  brancoSuave: 'rgba(255,255,255,0.92)',
  cinzaBorda: '#e2e8f0',
  cinzaFundo: '#f8fafc',
  textoEscuro: '#0f172a',
  textoMedio: '#64748b',
  destaque: '#fbbf24',
  sombra: '#0f172a',
  erro: '#ef4444',
};

export const SOMBRAS = {
  card: {
    shadowColor: CORES.sombra,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
  },
  botao: {
    shadowColor: CORES.azulBotao,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  bola: {
    shadowColor: CORES.azulBotao,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
};

export const RAIO = {
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  pill: 999,
};
