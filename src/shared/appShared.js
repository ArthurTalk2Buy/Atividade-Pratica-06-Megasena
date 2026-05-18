import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CORES } from './theme';

export function AppShell({ children }) {
  return (
    <View style={styles.fundo}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
    </View>
  );
}

export function PrimaryButton({ children, onPress, disabled }) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={disabled}
      onPress={onPress}
      style={[styles.botao, disabled && styles.botaoDesabilitado]}
    >
      <Text style={styles.botaoTexto}>{children}</Text>
    </TouchableOpacity>
  );
}

export function ScreenTitle({ title, subtitle }) {
  return (
    <View style={styles.tituloBloco}>
      <Text style={styles.titulo}>{title}</Text>
      {subtitle ? <Text style={styles.subtitulo}>{subtitle}</Text> : null}
    </View>
  );
}

export function NumeroBola({ numero, selecionado, pequeno, onPress }) {
  const conteudo = (
    <View style={[styles.bola, selecionado && styles.bolaSelecionada, pequeno && styles.bolaPequena]}>
      <Text style={[styles.bolaTexto, selecionado && styles.bolaTextoSelecionado, pequeno && styles.bolaTextoPequeno]}>
        {String(numero).padStart(2, '0')}
      </Text>
    </View>
  );

  if (!onPress) return conteudo;

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      {conteudo}
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  fundo: {
    backgroundColor: CORES.fundo,
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  content: {
    flex: 1,
    gap: 16,
    padding: 20,
    paddingBottom: 28,
  },
  tituloBloco: {
    alignItems: 'center',
    marginBottom: 4,
  },
  titulo: {
    color: CORES.verdeEscuro,
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitulo: {
    color: CORES.textoMedio,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
    marginTop: 6,
    textAlign: 'center',
  },
  card: {
    backgroundColor: CORES.branco,
    borderRadius: 20,
    elevation: 4,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
  cardTitulo: {
    color: CORES.verdeEscuro,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
  },
  paragrafo: {
    color: CORES.textoMedio,
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 8,
  },
  itemLista: {
    color: CORES.textoEscuro,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 24,
  },
  botao: {
    alignItems: 'center',
    backgroundColor: CORES.azulBotao,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  botaoDesabilitado: {
    opacity: 0.45,
  },
  botaoTexto: {
    color: CORES.branco,
    fontSize: 16,
    fontWeight: '800',
  },
  bola: {
    alignItems: 'center',
    backgroundColor: CORES.branco,
    borderColor: CORES.cinzaBorda,
    borderRadius: 999,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  bolaPequena: {
    height: 32,
    width: 32,
  },
  bolaSelecionada: {
    backgroundColor: CORES.azulSelecionado,
    borderColor: CORES.azulSelecionado,
  },
  bolaTexto: {
    color: CORES.textoEscuro,
    fontSize: 13,
    fontWeight: '700',
  },
  bolaTextoPequeno: {
    fontSize: 11,
  },
  bolaTextoSelecionado: {
    color: CORES.branco,
  },
});
