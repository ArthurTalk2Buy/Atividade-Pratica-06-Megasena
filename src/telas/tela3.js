import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppShell, NumeroBola, PrimaryButton, ScreenTitle, styles as sharedStyles } from '../shared/appShared';
import { useGame } from '../shared/GameContext';
import { contarAcertos, formatarDezena } from '../shared/gameUtils';
import { CORES } from '../shared/theme';

export default function Tela3({ navigation }) {
  const {
    numerosEscolhidos,
    numerosSorteados,
    numeroBilhete,
    teimosinha,
    resultadosTeimosinha,
  } = useGame();

  useEffect(() => {
    const timer = setTimeout(() => navigation.replace('Resultado'), 2800);
    return () => clearTimeout(timer);
  }, [navigation]);

  const acertos = contarAcertos(numerosEscolhidos, numerosSorteados);

  return (
    <AppShell>
      <ScrollView contentContainerStyle={sharedStyles.content} style={sharedStyles.flex}>
        <ScreenTitle subtitle="Sorteio em andamento" title="Megasena" />

        <View style={sharedStyles.card}>
          <Text style={sharedStyles.cardTitulo}>Número do bilhete</Text>
          <Text style={localStyles.bilhete}>{numeroBilhete}</Text>
        </View>

        <View style={sharedStyles.card}>
          <Text style={sharedStyles.cardTitulo}>Sua aposta</Text>
          <View style={localStyles.linhaNumeros}>
            {numerosEscolhidos.map((numero) => (
              <NumeroBola key={numero} numero={numero} pequeno selecionado />
            ))}
          </View>
        </View>

        <View style={sharedStyles.card}>
          <Text style={sharedStyles.cardTitulo}>Resultado do sorteio (6 dezenas)</Text>
          <View style={localStyles.linhaNumeros}>
            {numerosSorteados.map((numero) => (
              <NumeroBola
                key={numero}
                numero={numero}
                pequeno
                selecionado={numerosEscolhidos.includes(numero)}
              />
            ))}
          </View>
          <Text style={localStyles.acertos}>
            Você acertou {acertos} {acertos === 1 ? 'dezena' : 'dezenas'} neste sorteio.
          </Text>
        </View>

        {teimosinha && resultadosTeimosinha.length > 1 ? (
          <View style={sharedStyles.card}>
            <Text style={sharedStyles.cardTitulo}>Teimosinha — demais sorteios</Text>
            {resultadosTeimosinha.slice(1).map((item, indice) => {
              const hits = contarAcertos(numerosEscolhidos, item.sorteados);
              return (
                <View key={`sorteio-${indice + 2}`} style={localStyles.teimosinhaItem}>
                  <Text style={localStyles.teimosinhaTitulo}>Sorteio {indice + 2}</Text>
                  <Text style={localStyles.teimosinhaNumeros}>
                    {item.sorteados.map(formatarDezena).join('  ')}
                  </Text>
                  <Text style={localStyles.teimosinhaAcertos}>{hits} acerto(s)</Text>
                </View>
              );
            })}
          </View>
        ) : null}

        <PrimaryButton onPress={() => navigation.replace('Resultado')}>
          Ver resultado completo
        </PrimaryButton>
      </ScrollView>
    </AppShell>
  );
}

const localStyles = StyleSheet.create({
  bilhete: {
    color: CORES.azulBotao,
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 1,
    textAlign: 'center',
  },
  linhaNumeros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    justifyContent: 'center',
  },
  acertos: {
    color: CORES.verdeMega,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 14,
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
    fontSize: 15,
    fontWeight: '700',
    marginTop: 4,
  },
  teimosinhaAcertos: {
    color: CORES.textoMedio,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
});
