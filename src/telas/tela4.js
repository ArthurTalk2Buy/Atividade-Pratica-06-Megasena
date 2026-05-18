import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import {
  AppShell,
  Card,
  CardTitulo,
  NumeroBola,
  PrimaryButton,
  ScreenTitle,
  SecondaryButton,
  TicketBox,
  styles as sharedStyles,
} from '../shared/appShared';
import { useGame } from '../shared/GameContext';
import { contarAcertos, formatarDezena } from '../shared/gameUtils';
import { CORES, RAIO } from '../shared/theme';

function mensagemPremio(acertos) {
  if (acertos === 6) return { emoji: '🏆', texto: 'SENA! Você acertou as 6 dezenas!' };
  if (acertos === 5) return { emoji: '🎉', texto: 'QUINA! 5 dezenas corretas.' };
  if (acertos === 4) return { emoji: '⭐', texto: 'QUADRA! 4 dezenas corretas.' };
  return { emoji: '🍀', texto: 'Não foi desta vez. Tente de novo!' };
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
  const premio = mensagemPremio(acertos);

  const novoJogo = () => {
    reiniciarJogo();
    navigation.reset({ index: 0, routes: [{ name: 'Aposta' }] });
  };

  const voltarInicio = () => {
    reiniciarJogo();
    navigation.reset({ index: 0, routes: [{ name: 'Orientacoes' }] });
  };

  return (
    <AppShell>
      <ScrollView
        contentContainerStyle={sharedStyles.content}
        showsVerticalScrollIndicator={false}
        style={sharedStyles.flex}
      >
        <ScreenTitle badge="Final" subtitle="Confira como foi o seu jogo" title="Resultado" />

        <LinearGradient
          colors={[CORES.verdeEscuro, CORES.verdeMega, CORES.verdeClaro]}
          end={{ x: 1, y: 1 }}
          start={{ x: 0, y: 0 }}
          style={localStyles.resultadoHero}
        >
          <Text style={localStyles.resultadoEmoji}>{premio.emoji}</Text>
          <Text style={localStyles.resultadoAcertos}>{acertos}</Text>
          <Text style={localStyles.resultadoLegenda}>acertos no 1º sorteio</Text>
          <Text style={localStyles.resultadoMensagem}>{premio.texto}</Text>
        </LinearGradient>

        <TicketBox numero={numeroBilhete} />

        <Card>
          <CardTitulo>Aposta × Sorteio</CardTitulo>
          <Text style={localStyles.secaoLabel}>Seus números</Text>
          <View style={localStyles.linhaNumeros}>
            {numerosEscolhidos.map((numero) => (
              <NumeroBola key={`aposta-${numero}`} numero={numero} pequeno selecionado />
            ))}
          </View>
          <Text style={localStyles.secaoLabel}>Sorteados</Text>
          <View style={localStyles.linhaNumeros}>
            {numerosSorteados.map((numero) => (
              <NumeroBola
                key={`sorteio-${numero}`}
                acerto={numerosEscolhidos.includes(numero)}
                numero={numero}
                pequeno
                selecionado={numerosEscolhidos.includes(numero)}
              />
            ))}
          </View>
        </Card>

        {teimosinha && resultadosTeimosinha.length > 0 ? (
          <Card>
            <CardTitulo>Resumo da Teimosinha</CardTitulo>
            {resultadosTeimosinha.map((item, indice) => {
              const hits = contarAcertos(numerosEscolhidos, item.sorteados);
              return (
                <View key={`resumo-${indice}`} style={localStyles.teimosinhaItem}>
                  <View style={localStyles.teimosinhaHeader}>
                    <Text style={localStyles.teimosinhaTitulo}>Sorteio {indice + 1}</Text>
                    <View style={[localStyles.hitsBadge, hits >= 4 && localStyles.hitsBadgeDestaque]}>
                      <Text style={localStyles.hitsBadgeTexto}>{hits} acertos</Text>
                    </View>
                  </View>
                  <Text style={localStyles.teimosinhaNumeros}>
                    {item.sorteados.map(formatarDezena).join('   ')}
                  </Text>
                </View>
              );
            })}
          </Card>
        ) : null}

        <PrimaryButton onPress={novoJogo}>Fazer novo jogo</PrimaryButton>
        <SecondaryButton onPress={voltarInicio}>Voltar para tela 1</SecondaryButton>
      </ScrollView>
    </AppShell>
  );
}

const localStyles = StyleSheet.create({
  resultadoHero: {
    alignItems: 'center',
    borderRadius: RAIO.xl,
    padding: 28,
  },
  resultadoEmoji: { fontSize: 40, marginBottom: 4 },
  resultadoAcertos: {
    color: CORES.branco,
    fontSize: 56,
    fontWeight: '900',
    lineHeight: 60,
  },
  resultadoLegenda: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '600',
  },
  resultadoMensagem: {
    color: CORES.branco,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 10,
    textAlign: 'center',
  },
  secaoLabel: {
    color: CORES.textoMedio,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 8,
    marginTop: 4,
    textTransform: 'uppercase',
  },
  linhaNumeros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    justifyContent: 'center',
    marginBottom: 8,
  },
  teimosinhaItem: {
    borderTopColor: CORES.cinzaBorda,
    borderTopWidth: 1,
    marginTop: 12,
    paddingTop: 12,
  },
  teimosinhaHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  teimosinhaTitulo: {
    color: CORES.verdeEscuro,
    fontSize: 14,
    fontWeight: '800',
  },
  hitsBadge: {
    backgroundColor: CORES.cinzaFundo,
    borderRadius: RAIO.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  hitsBadgeDestaque: {
    backgroundColor: CORES.destaque,
  },
  hitsBadgeTexto: {
    color: CORES.verdeEscuro,
    fontSize: 12,
    fontWeight: '800',
  },
  teimosinhaNumeros: {
    color: CORES.textoMedio,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
    marginTop: 6,
  },
});
