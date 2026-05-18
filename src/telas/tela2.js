import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import {
  AppShell,
  Card,
  NumeroBola,
  OptionRow,
  PrimaryButton,
  ProgressBar,
  ScreenTitle,
  Stepper,
  styles as sharedStyles,
} from '../shared/appShared';
import { useGame } from '../shared/GameContext';
import { CORES, RAIO } from '../shared/theme';

const DEZENAS = Array.from({ length: 60 }, (_, i) => i + 1);

export default function Tela2({ navigation }) {
  const {
    quantidade,
    surpresinha,
    teimosinha,
    sorteiosTeimosinha,
    numerosEscolhidos,
    definirQuantidade,
    alternarNumero,
    definirSurpresinha,
    definirTeimosinha,
    definirSorteiosTeimosinha,
    prepararAposta,
  } = useGame();

  const apostaValida = surpresinha || numerosEscolhidos.length === quantidade;
  const selecionados = surpresinha ? 0 : numerosEscolhidos.length;

  const confirmar = () => {
    prepararAposta();
    navigation.navigate('Sorteio');
  };

  return (
    <AppShell>
      <ScrollView
        contentContainerStyle={sharedStyles.content}
        showsVerticalScrollIndicator={false}
        style={sharedStyles.flex}
      >
        <ScreenTitle
          badge="Volante"
          subtitle={`Selecione as ${quantidade} dezenas`}
          title="Gamesena"
        />

        <Card>
          <Stepper
            label="Quantos números no jogo?"
            max={20}
            min={6}
            valor={quantidade}
            onMenos={() => definirQuantidade(Math.max(6, quantidade - 1))}
            onMais={() => definirQuantidade(Math.min(20, quantidade + 1))}
          />

          <View style={localStyles.divisor} />

          <OptionRow
            ativo={surpresinha}
            descricao="Dezenas escolhidas pelo sistema"
            icone="✨"
            label="Surpresinha"
            onToggle={definirSurpresinha}
          />
          <View style={localStyles.gap} />
          <OptionRow
            ativo={teimosinha}
            descricao="Mesma aposta em sorteios seguidos"
            icone="🔁"
            label="Teimosinha"
            onToggle={definirTeimosinha}
          />

          {teimosinha ? (
            <View style={localStyles.teimosinhaBox}>
              <Stepper
                label="Sorteios consecutivos"
                valor={sorteiosTeimosinha}
                onMenos={() => definirSorteiosTeimosinha(Math.max(2, sorteiosTeimosinha - 1))}
                onMais={() => definirSorteiosTeimosinha(Math.min(12, sorteiosTeimosinha + 1))}
              />
            </View>
          ) : null}
        </Card>

        {!surpresinha ? (
          <Card style={localStyles.gridCard}>
            <ProgressBar atual={selecionados} total={quantidade} />
            <View style={localStyles.grid}>
              {DEZENAS.map((numero) => (
                <NumeroBola
                  key={numero}
                  numero={numero}
                  selecionado={numerosEscolhidos.includes(numero)}
                  onPress={() => alternarNumero(numero)}
                />
              ))}
            </View>
          </Card>
        ) : (
          <View style={localStyles.surpresinhaBanner}>
            <Text style={localStyles.surpresinhaEmoji}>✨</Text>
            <Text style={localStyles.surpresinhaTexto}>
              Surpresinha ativa — {quantidade} números serão gerados ao confirmar
            </Text>
          </View>
        )}

        <View style={localStyles.preview}>
          <Text style={localStyles.previewTitulo}>Sua seleção</Text>
          <View style={localStyles.previewBolas}>
            {numerosEscolhidos.length === 0 ? (
              <Text style={localStyles.previewVazio}>
                {surpresinha ? 'Aguardando confirmação…' : 'Toque nos números acima'}
              </Text>
            ) : (
              numerosEscolhidos.map((numero) => (
                <NumeroBola key={numero} numero={numero} pequeno selecionado />
              ))
            )}
          </View>
        </View>

        <PrimaryButton disabled={!apostaValida} onPress={confirmar}>
          Confirmar Aposta
        </PrimaryButton>
      </ScrollView>
    </AppShell>
  );
}

const localStyles = StyleSheet.create({
  divisor: {
    backgroundColor: CORES.cinzaBorda,
    height: 1,
    marginVertical: 16,
  },
  gap: { height: 10 },
  teimosinhaBox: {
    borderTopColor: CORES.cinzaBorda,
    borderTopWidth: 1,
    marginTop: 16,
    paddingTop: 16,
  },
  gridCard: { paddingTop: 16 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    justifyContent: 'center',
    marginTop: 14,
  },
  surpresinhaBanner: {
    alignItems: 'center',
    backgroundColor: 'rgba(124, 58, 237, 0.12)',
    borderColor: CORES.roxo,
    borderRadius: RAIO.lg,
    borderWidth: 1.5,
    flexDirection: 'row',
    gap: 12,
    padding: 16,
  },
  surpresinhaEmoji: { fontSize: 28 },
  surpresinhaTexto: {
    color: CORES.verdeEscuro,
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  preview: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: RAIO.lg,
    padding: 16,
  },
  previewTitulo: {
    color: CORES.verdeEscuro,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  previewBolas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    justifyContent: 'center',
    minHeight: 34,
  },
  previewVazio: {
    color: CORES.textoMedio,
    fontSize: 13,
    fontStyle: 'italic',
  },
});
