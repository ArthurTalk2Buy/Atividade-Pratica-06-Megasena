import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppShell, PrimaryButton, ScreenTitle, styles as sharedStyles } from '../shared/appShared';
import { CORES } from '../shared/theme';

export default function Tela1({ navigation }) {
  return (
    <AppShell>
      <ScrollView contentContainerStyle={sharedStyles.content} style={sharedStyles.flex}>
        <ScreenTitle subtitle="Atividade Prática 06" title="Megasena" />

        <View style={sharedStyles.card}>
          <Text style={sharedStyles.cardTitulo}>Orientações do jogo</Text>
          <Text style={sharedStyles.paragrafo}>
            A Mega-Sena é um jogo de loteria em que você escolhe números de 01 a 60 e aguarda o sorteio
            oficial de seis dezenas.
          </Text>
          <Text style={localStyles.destaque}>Apostas</Text>
          <Text style={sharedStyles.itemLista}>
            • Escolha entre 6 e 20 números para compor o seu jogo.
          </Text>
          <Text style={sharedStyles.itemLista}>
            • Surpresinha: o sistema seleciona automaticamente as dezenas da aposta.
          </Text>
          <Text style={sharedStyles.itemLista}>
            • Teimosinha: repete a mesma aposta em vários sorteios consecutivos.
          </Text>
          <Text style={sharedStyles.paragrafo}>
            Na próxima tela você define quantos números deseja jogar, marca Surpresinha ou Teimosinha e
            confirma a aposta no volante virtual.
          </Text>
        </View>

        <PrimaryButton onPress={() => navigation.navigate('Aposta')}>
          Ir para aposta
        </PrimaryButton>
      </ScrollView>
    </AppShell>
  );
}

const localStyles = StyleSheet.create({
  destaque: {
    color: CORES.verdeMega,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
    marginTop: 4,
  },
});
