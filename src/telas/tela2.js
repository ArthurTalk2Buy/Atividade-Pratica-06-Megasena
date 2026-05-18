import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { AppShell, NumeroBola, PrimaryButton, ScreenTitle, styles as sharedStyles } from '../shared/appShared';
import { useGame } from '../shared/GameContext';
import { CORES } from '../shared/theme';

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

  const confirmar = () => {
    prepararAposta();
    navigation.navigate('Sorteio');
  };

  return (
    <AppShell>
      <ScrollView contentContainerStyle={sharedStyles.content} style={sharedStyles.flex}>
        <ScreenTitle
          subtitle={`Selecione as ${quantidade} dezenas`}
          title="Gamesena"
        />

        <View style={localStyles.opcoesCard}>
          <Text style={localStyles.rotulo}>Quantos números no jogo?</Text>
          <View style={localStyles.quantidadeLinha}>
            <TouchableOpacity
              onPress={() => definirQuantidade(Math.max(6, quantidade - 1))}
              style={localStyles.quantidadeBotao}
            >
              <Text style={localStyles.quantidadeBotaoTexto}>−</Text>
            </TouchableOpacity>
            <Text style={localStyles.quantidadeValor}>{quantidade}</Text>
            <TouchableOpacity
              onPress={() => definirQuantidade(Math.min(20, quantidade + 1))}
              style={localStyles.quantidadeBotao}
            >
              <Text style={localStyles.quantidadeBotaoTexto}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={localStyles.switchLinha}>
            <Text style={localStyles.switchTexto}>Surpresinha</Text>
            <Switch
              trackColor={{ false: '#ccc', true: CORES.verdeMega }}
              thumbColor={CORES.branco}
              value={surpresinha}
              onValueChange={definirSurpresinha}
            />
          </View>

          <View style={localStyles.switchLinha}>
            <Text style={localStyles.switchTexto}>Teimosinha</Text>
            <Switch
              trackColor={{ false: '#ccc', true: CORES.verdeMega }}
              thumbColor={CORES.branco}
              value={teimosinha}
              onValueChange={definirTeimosinha}
            />
          </View>

          {teimosinha ? (
            <View style={localStyles.teimosinhaLinha}>
              <Text style={localStyles.rotulo}>Sorteios consecutivos</Text>
              <View style={localStyles.quantidadeLinha}>
                <TouchableOpacity
                  onPress={() => definirSorteiosTeimosinha(Math.max(2, sorteiosTeimosinha - 1))}
                  style={localStyles.quantidadeBotao}
                >
                  <Text style={localStyles.quantidadeBotaoTexto}>−</Text>
                </TouchableOpacity>
                <Text style={localStyles.quantidadeValor}>{sorteiosTeimosinha}</Text>
                <TouchableOpacity
                  onPress={() => definirSorteiosTeimosinha(Math.min(12, sorteiosTeimosinha + 1))}
                  style={localStyles.quantidadeBotao}
                >
                  <Text style={localStyles.quantidadeBotaoTexto}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </View>

        {!surpresinha ? (
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
        ) : (
          <Text style={localStyles.surpresinhaAviso}>
            Com Surpresinha ativa, as dezenas serão sorteadas automaticamente ao confirmar.
          </Text>
        )}

        <View style={localStyles.preview}>
          {numerosEscolhidos.length === 0 && surpresinha ? (
            <Text style={localStyles.previewVazio}>Aguardando confirmação…</Text>
          ) : (
            numerosEscolhidos.map((numero) => (
              <NumeroBola key={numero} numero={numero} pequeno selecionado />
            ))
          )}
        </View>

        <Text style={localStyles.contador}>
          {surpresinha
            ? `${quantidade} números serão gerados`
            : `${numerosEscolhidos.length} de ${quantidade} selecionados`}
        </Text>

        <PrimaryButton disabled={!apostaValida} onPress={confirmar}>
          Confirmar Aposta
        </PrimaryButton>
      </ScrollView>
    </AppShell>
  );
}

const localStyles = StyleSheet.create({
  opcoesCard: {
    backgroundColor: CORES.branco,
    borderRadius: 16,
    gap: 12,
    padding: 14,
  },
  rotulo: {
    color: CORES.verdeEscuro,
    fontSize: 14,
    fontWeight: '700',
  },
  quantidadeLinha: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
  },
  quantidadeBotao: {
    alignItems: 'center',
    backgroundColor: CORES.azulBotao,
    borderRadius: 8,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  quantidadeBotaoTexto: {
    color: CORES.branco,
    fontSize: 20,
    fontWeight: '800',
  },
  quantidadeValor: {
    color: CORES.textoEscuro,
    fontSize: 22,
    fontWeight: '900',
    minWidth: 32,
    textAlign: 'center',
  },
  switchLinha: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  switchTexto: {
    color: CORES.textoEscuro,
    fontSize: 15,
    fontWeight: '700',
  },
  teimosinhaLinha: {
    gap: 8,
    marginTop: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    justifyContent: 'center',
  },
  surpresinhaAviso: {
    color: CORES.textoMedio,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'center',
  },
  preview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    justifyContent: 'center',
    minHeight: 36,
  },
  previewVazio: {
    color: CORES.textoMedio,
    fontSize: 13,
    fontStyle: 'italic',
  },
  contador: {
    color: CORES.verdeEscuro,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
});
