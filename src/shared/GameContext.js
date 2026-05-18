import React, { createContext, useContext, useMemo, useState } from 'react';

import { gerarBilhete, gerarNumerosAleatorios, gerarSorteio } from './gameUtils';

const GameContext = createContext(null);

const estadoInicial = {
  quantidade: 6,
  surpresinha: false,
  teimosinha: false,
  sorteiosTeimosinha: 3,
  numerosEscolhidos: [],
  numerosSorteados: [],
  resultadosTeimosinha: [],
  numeroBilhete: '',
};

export function GameProvider({ children }) {
  const [estado, setEstado] = useState(estadoInicial);

  const definirQuantidade = (quantidade) => {
    setEstado((atual) => ({
      ...atual,
      quantidade,
      numerosEscolhidos: atual.numerosEscolhidos.filter((_, i) => i < quantidade),
    }));
  };

  const alternarNumero = (numero) => {
    setEstado((atual) => {
      if (atual.surpresinha) return atual;

      const jaSelecionado = atual.numerosEscolhidos.includes(numero);
      if (jaSelecionado) {
        return {
          ...atual,
          numerosEscolhidos: atual.numerosEscolhidos.filter((n) => n !== numero),
        };
      }

      if (atual.numerosEscolhidos.length >= atual.quantidade) return atual;

      return {
        ...atual,
        numerosEscolhidos: [...atual.numerosEscolhidos, numero].sort((a, b) => a - b),
      };
    });
  };

  const definirSurpresinha = (ativo) => {
    setEstado((atual) => ({
      ...atual,
      surpresinha: ativo,
      teimosinha: ativo ? false : atual.teimosinha,
      numerosEscolhidos: ativo ? [] : atual.numerosEscolhidos,
    }));
  };

  const definirTeimosinha = (ativo) => {
    setEstado((atual) => ({
      ...atual,
      teimosinha: ativo,
      surpresinha: ativo ? false : atual.surpresinha,
    }));
  };

  const definirSorteiosTeimosinha = (sorteios) => {
    setEstado((atual) => ({ ...atual, sorteiosTeimosinha: sorteios }));
  };

  const prepararAposta = () => {
    const escolhidos = estado.surpresinha
      ? gerarNumerosAleatorios(estado.quantidade)
      : [...estado.numerosEscolhidos];

    const bilhete = gerarBilhete();

    if (estado.teimosinha) {
      const resultados = Array.from({ length: estado.sorteiosTeimosinha }, () => ({
        sorteados: gerarSorteio(),
      }));

      setEstado((atual) => ({
        ...atual,
        numerosEscolhidos: escolhidos,
        numerosSorteados: resultados[0].sorteados,
        resultadosTeimosinha: resultados,
        numeroBilhete: bilhete,
      }));
      return;
    }

    setEstado((atual) => ({
      ...atual,
      numerosEscolhidos: escolhidos,
      numerosSorteados: gerarSorteio(),
      resultadosTeimosinha: [],
      numeroBilhete: bilhete,
    }));
  };

  const reiniciarJogo = () => {
    setEstado({ ...estadoInicial });
  };

  const valor = useMemo(
    () => ({
      ...estado,
      definirQuantidade,
      alternarNumero,
      definirSurpresinha,
      definirTeimosinha,
      definirSorteiosTeimosinha,
      prepararAposta,
      reiniciarJogo,
    }),
    [estado],
  );

  return <GameContext.Provider value={valor}>{children}</GameContext.Provider>;
}

export function useGame() {
  const contexto = useContext(GameContext);
  if (!contexto) {
    throw new Error('useGame deve ser usado dentro de GameProvider');
  }
  return contexto;
}
