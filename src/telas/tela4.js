import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppShell, NumeroBola, PrimaryButton, ScreenTitle, styles as sharedStyles } from '../shared/appShared';
import { useGame } from '../shared/GameContext';
import { contarAcertos, formatarDezena } from '../shared/gameUtils';
import { CORES } from '../shared/theme';

function mensagemPremio(acertos) {
  if (acertos === 6) return 'Parabéns! Você acertou as 6 dezenas — sena!';
  if (acertos === 5) return 'Quina! Você acertou 5 dezenas.';
  if (acertos === 4) return 'Quadra! Você acertou 4 dezenas.';
  return 'Não foi desta vez. Tente novamente!';
}

export default function Tela4({ navigation }) {
  const {
    numerosEscolhidos,
    numerosSorteados,
    numeroBilhete,
    teimosinha,
    resultadosTeimosinha,
    reiniciarJogo,
  } = useGame();

  const acertos = contarAcertos(numerosEscolhidos, numerosSorteados);

  const novoJogo = () => {
    reiniciarJogo();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Aposta' }],
    });
  };

  const voltarInicio = () => {
    reiniciarJogo();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Orientacoes' }],
    });
  };

  return (
    <AppShell>
      <ScrollView contentContainerStyle={sharedStyles.content} style={sharedStyles.flex}>
        <ScreenTitle subtitle="Confira o resultado final" title="Resultado" />

        <View style={sharedStyles.card}>
          <Text style={sharedStyles.cardTitulo}>Bilhete</Text>
          <Text style={localStyles.bilhete}>{numeroBilhete}</Text>
        </View>

        <View style={sharedStyles.card}>
          <Text style={sharedStyles.cardTitulo}>Aposta x Sorteio</Text>
          <Text style={localStyles.rotulo}>Seus números</Text>
          <View style={localStyles.linhaNumeros}>
            {numerosEscolhidos.map((numero) => (
              <NumeroBola key={`aposta-${numero}`} numero={numero} pequeno selecionado />
            ))}
          </View>
          <Text style={localStyles.rotulo}>Números sorteados</Text>
          <View style={localStyles.linhaNumeros}>
            {numerosSorteados.map((numero) => (
              <NumeroBola
                key={`sorteio-${numero}`}
                numero={numero}
                pequeno
                selecionado={numerosEscolhidos.includes(numero)}
              />
            ))}
          </View>
        </View>

        <View style={localStyles.resultadoDestaque}>
          <Text style={localStyles.acertosNumero}>{acertos}</Text>
          <Text style={localStyles.acertosLegenda}>acertos no 1º sorteio</Text>
          <Text style={localStyles.mensagem}>{mensagemPremio(acertos)}</Text>
        </View>

        {teimosinha && resultadosTeimosinha.length > 0 ? (
          <View style={sharedStyles.card}>
            <Text style={sharedStyles.cardTitulo}>Resumo da Teimosinha</Text>
            {resultadosTeimosinha.map((item, indice) => {
              const hits = contarAcertos(numerosEscolhidos, item.sorteados);
              return (
                <View key={`resumo-${indice}`} style={localStyles.teimosinhaItem}>
                  <Text style={localStyles.teimosinhaTitulo}>
                    Sorteio {indice + 1}: {hits} acerto(s)
                  </Text>
                  <Text style={localStyles.teimosinhaNumeros}>
                    {item.sorteados.map(formatarDezena).join('  ')}
                  </Text>
                </View>
              );
            })}
          </View>
        ) : null}

        <PrimaryButton onPress={novoJogo}>Fazer novo jogo</PrimaryButton>
        <PrimaryButton onPress={voltarInicio}>Voltar para tela 1</PrimaryButton>
      </ScrollView>
    </AppShell>
  );
}

const localStyles = StyleSheet.create({
  bilhete: {
    color: CORES.azulBotao,
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
  },
  rotulo: {
    color: CORES.textoMedio,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
    marginTop: 8,
  },
  linhaNumeros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    justifyContent: 'center',
  },
  resultadoDestaque: {
    alignItems: 'center',
    backgroundColor: CORES.branco,
    borderRadius: 20,
    padding: 22,
  },
  acertosNumero: {
    color: CORES.verdeMega,
    fontSize: 48,
    fontWeight: '900',
  },
  acertosLegenda: {
    color: CORES.textoMedio,
    fontSize: 14,
    fontWeight: '600',
  },
  mensagem: {
    color: CORES.verdeEscuro,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 12,
    textAlign: 'center',
  },
  teimosinhaItem: {
    borderTopColor: '#e2e8f0',
    borderTopWidth: 1,
    marginTop: 10,
    paddingTop: 10,
  },
  teimosinhaTitulo: {
    color: CORES.verdeEscuro,
    fontSize: 14,
    fontWeight: '800',
  },
  teimosinhaNumeros: {
    color: CORES.textoEscuro,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
});
