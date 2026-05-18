import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import {
  AppShell,
  Card,
  CardTitulo,
  FeatureItem,
  PrimaryButton,
  ScreenTitle,
  styles as sharedStyles,
} from '../shared/appShared';
import { CORES } from '../shared/theme';

export default function Tela1({ navigation }) {
  return (
    <AppShell>
      <ScrollView
        contentContainerStyle={sharedStyles.content}
        showsVerticalScrollIndicator={false}
        style={sharedStyles.flex}
      >
        <ScreenTitle badge="Loteria" subtitle="Escolha, aposte e boa sorte!" title="Megasena" />

        <LinearGradient
          colors={[CORES.verdeEscuro, CORES.verdeMega]}
          end={{ x: 1, y: 1 }}
          start={{ x: 0, y: 0 }}
          style={localStyles.hero}
        >
          <Text style={localStyles.heroEmoji}>🎱</Text>
          <Text style={localStyles.heroTitulo}>6 a 20 dezenas</Text>
          <Text style={localStyles.heroSub}>
            Números de 01 a 60 · sorteio de 6 dezenas vencedoras
          </Text>
        </LinearGradient>

        <Card>
          <CardTitulo>Orientações do jogo</CardTitulo>
          <Text style={sharedStyles.paragrafo}>
            Monte seu jogo no volante digital, confirme a aposta e acompanhe o sorteio em tempo real.
          </Text>

          <FeatureItem
            descricao="Escolha manualmente entre 6 e 20 números no volante."
            icone="🎯"
            titulo="Apostas flexíveis"
          />
          <FeatureItem
            descricao="O sistema sorteia as dezenas da sua aposta automaticamente."
            icone="✨"
            titulo="Surpresinha"
          />
          <FeatureItem
            descricao="Repita a mesma aposta em vários sorteios seguidos."
            icone="🔁"
            titulo="Teimosinha"
          />
        </Card>

        <PrimaryButton onPress={() => navigation.navigate('Aposta')}>
          Começar aposta →
        </PrimaryButton>
      </ScrollView>
    </AppShell>
  );
}

const localStyles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    borderRadius: 24,
    padding: 28,
  },
  heroEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  heroTitulo: {
    color: CORES.branco,
    fontSize: 22,
    fontWeight: '900',
  },
  heroSub: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    marginTop: 6,
    textAlign: 'center',
  },
});
