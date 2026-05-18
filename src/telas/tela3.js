import React, { useEffect } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import {
  AppShell,
  Card,
  CardTitulo,
  NumeroBola,
  PrimaryButton,
  ScreenTitle,
  TicketBox,
  styles as sharedStyles,
} from '../shared/appShared';
import { useGame } from '../shared/GameContext';
import { contarAcertos, formatarDezena } from '../shared/gameUtils';
import { CORES, RAIO } from '../shared/theme';

export default function Tela3({ navigation }) {
  const {
    numerosEscolhidos,
    numerosSorteados,
    numeroBilhete,
    teimosinha,
    resultadosTeimosinha,
  } = useGame();

  useEffect(() => {
    const timer = setTimeout(() => navigation.replace('Resultado'), 3500);
    return () => clearTimeout(timer);
  }, [navigation]);

  const acertos = contarAcertos(numerosEscolhidos, numerosSorteados);

  return (
    <AppShell>
      <ScrollView
        contentContainerStyle={sharedStyles.content}
        showsVerticalScrollIndicator={false}
        style={sharedStyles.flex}
      >
        <ScreenTitle badge="Ao vivo" subtitle="Sorteio em andamento…" title="Megasena" />

        <View style={localStyles.loadingRow}>
          <ActivityIndicator color={CORES.verdeMega} size="small" />
          <Text style={localStyles.loadingTexto}>Gerando resultado…</Text>
        </View>

        <TicketBox numero={numeroBilhete} />

        <Card>
          <CardTitulo>Sua aposta</CardTitulo>
          <View style={localStyles.linhaNumeros}>
            {numerosEscolhidos.map((numero) => (
              <NumeroBola key={numero} numero={numero} pequeno selecionado />
            ))}
          </View>
        </Card>

        <Card>
          <CardTitulo>Dezenas sorteadas</CardTitulo>
          <View style={localStyles.linhaNumeros}>
            {numerosSorteados.map((numero) => (
              <NumeroBola
                key={numero}
                acerto={numerosEscolhidos.includes(numero)}
                numero={numero}
                pequeno
                selecionado={numerosEscolhidos.includes(numero)}
              />
            ))}
          </View>

          <LinearGradient
            colors={['rgba(32,152,105,0.15)', 'rgba(52,211,153,0.08)']}
            style={localStyles.acertosBox}
          >
            <Text style={localStyles.acertosNumero}>{acertos}</Text>
            <Text style={localStyles.acertosTexto}>
              {acertos === 1 ? 'acerto neste sorteio' : 'acertos neste sorteio'}
            </Text>
          </LinearGradient>
        </Card>

        {teimosinha && resultadosTeimosinha.length > 1 ? (
          <Card>
            <CardTitulo>Teimosinha — próximos sorteios</CardTitulo>
            {resultadosTeimosinha.slice(1).map((item, indice) => {
              const hits = contarAcertos(numerosEscolhidos, item.sorteados);
              return (
                <View key={`sorteio-${indice + 2}`} style={localStyles.teimosinhaItem}>
                  <View style={localStyles.teimosinhaHeader}>
                    <Text style={localStyles.teimosinhaTitulo}>Sorteio {indice + 2}</Text>
                    <View style={localStyles.teimosinhaBadge}>
                      <Text style={localStyles.teimosinhaBadgeTexto}>{hits} ✓</Text>
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

        <PrimaryButton onPress={() => navigation.replace('Resultado')}>
          Ver resultado completo →
        </PrimaryButton>
      </ScrollView>
    </AppShell>
  );
}

const localStyles = StyleSheet.create({
  loadingRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  loadingTexto: {
    color: CORES.verdeEscuro,
    fontSize: 14,
    fontWeight: '700',
  },
  linhaNumeros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    justifyContent: 'center',
  },
  acertosBox: {
    alignItems: 'center',
    borderRadius: RAIO.md,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    marginTop: 16,
    padding: 16,
  },
  acertosNumero: {
    color: CORES.verdeMega,
    fontSize: 36,
    fontWeight: '900',
  },
  acertosTexto: {
    color: CORES.verdeEscuro,
    fontSize: 15,
    fontWeight: '700',
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
  teimosinhaBadge: {
    backgroundColor: CORES.verdeMega,
    borderRadius: RAIO.pill,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  teimosinhaBadgeTexto: {
    color: CORES.branco,
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
