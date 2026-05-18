import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CORES, RAIO, SOMBRAS } from './theme';

export function AppShell({ children }) {
  return (
    <LinearGradient colors={['#00FFFF', '#7df9ff', '#b8fff9']} style={styles.fundo}>
      <StatusBar style="dark" />
      <View pointerEvents="none" style={styles.decor}>
        <View style={[styles.orb, styles.orbTop]} />
        <View style={[styles.orb, styles.orbBottom]} />
        <View style={[styles.orb, styles.orbMid]} />
      </View>
      <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
    </LinearGradient>
  );
}

export function ScreenTitle({ title, subtitle, badge }) {
  return (
    <View style={styles.tituloBloco}>
      {badge ? (
        <View style={styles.badge}>
          <Text style={styles.badgeTexto}>{badge}</Text>
        </View>
      ) : null}
      <Text style={styles.titulo}>{title}</Text>
      {subtitle ? <Text style={styles.subtitulo}>{subtitle}</Text> : null}
    </View>
  );
}

export function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function CardTitulo({ children }) {
  return <Text style={styles.cardTitulo}>{children}</Text>;
}

export function FeatureItem({ icone, titulo, descricao }) {
  return (
    <View style={styles.featureItem}>
      <View style={styles.featureIcone}>
        <Text style={styles.featureEmoji}>{icone}</Text>
      </View>
      <View style={styles.featureTexto}>
        <Text style={styles.featureTitulo}>{titulo}</Text>
        <Text style={styles.featureDescricao}>{descricao}</Text>
      </View>
    </View>
  );
}

export function PrimaryButton({ children, onPress, disabled }) {
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      disabled={disabled}
      onPress={onPress}
      style={[SOMBRAS.botao, disabled && styles.botaoDesabilitado]}
    >
      <LinearGradient
        colors={disabled ? ['#94a3b8', '#cbd5e1'] : [CORES.azulBotao, CORES.azulClaro]}
        end={{ x: 1, y: 1 }}
        start={{ x: 0, y: 0 }}
        style={styles.botao}
      >
        <Text style={styles.botaoTexto}>{children}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export function SecondaryButton({ children, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.88} onPress={onPress} style={styles.botaoSecundario}>
      <Text style={styles.botaoSecundarioTexto}>{children}</Text>
    </TouchableOpacity>
  );
}

export function ProgressBar({ atual, total }) {
  const pct = total > 0 ? Math.min(100, (atual / total) * 100) : 0;
  return (
    <View style={styles.progressoWrap}>
      <View style={styles.progressoFundo}>
        <LinearGradient
          colors={[CORES.verdeMega, CORES.verdeClaro]}
          end={{ x: 1, y: 0 }}
          start={{ x: 0, y: 0 }}
          style={[styles.progressoPreenchido, { width: `${pct}%` }]}
        />
      </View>
      <Text style={styles.progressoTexto}>
        {atual} / {total}
      </Text>
    </View>
  );
}

export function OptionRow({ label, descricao, ativo, onToggle, icone }) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onToggle(!ativo)}
      style={[styles.optionRow, ativo && styles.optionRowAtivo]}
    >
      <View style={[styles.optionIcone, ativo && styles.optionIconeAtivo]}>
        <Text style={styles.optionEmoji}>{icone}</Text>
      </View>
      <View style={styles.optionTexto}>
        <Text style={styles.optionLabel}>{label}</Text>
        {descricao ? <Text style={styles.optionDesc}>{descricao}</Text> : null}
      </View>
      <View style={[styles.optionCheck, ativo && styles.optionCheckAtivo]}>
        {ativo ? <Text style={styles.optionCheckMark}>✓</Text> : null}
      </View>
    </TouchableOpacity>
  );
}

export function Stepper({ valor, min, max, onMenos, onMais, label }) {
  return (
    <View style={styles.stepper}>
      {label ? <Text style={styles.stepperLabel}>{label}</Text> : null}
      <View style={styles.stepperLinha}>
        <TouchableOpacity activeOpacity={0.85} onPress={onMenos} style={styles.stepperBtn}>
          <Text style={styles.stepperBtnTexto}>−</Text>
        </TouchableOpacity>
        <View style={styles.stepperValorWrap}>
          <Text style={styles.stepperValor}>{valor}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.85} onPress={onMais} style={styles.stepperBtn}>
          <Text style={styles.stepperBtnTexto}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function NumeroBola({ numero, selecionado, pequeno, acerto, onPress }) {
  const tamanho = pequeno ? 34 : 38;

  const conteudo = selecionado || acerto ? (
    <LinearGradient
      colors={acerto ? [CORES.verdeMega, CORES.verdeClaro] : [CORES.azulBotao, CORES.azulClaro]}
      style={[
        styles.bola,
        { height: tamanho, width: tamanho },
        SOMBRAS.bola,
      ]}
    >
      <Text style={[styles.bolaTexto, styles.bolaTextoSelecionado, pequeno && styles.bolaTextoPequeno]}>
        {String(numero).padStart(2, '0')}
      </Text>
    </LinearGradient>
  ) : (
    <View style={[styles.bola, styles.bolaNormal, { height: tamanho, width: tamanho }]}>
      <Text style={[styles.bolaTexto, pequeno && styles.bolaTextoPequeno]}>
        {String(numero).padStart(2, '0')}
      </Text>
    </View>
  );

  if (!onPress) return conteudo;

  return (
    <TouchableOpacity activeOpacity={0.75} onPress={onPress}>
      {conteudo}
    </TouchableOpacity>
  );
}

export function TicketBox({ numero }) {
  return (
    <LinearGradient
      colors={[CORES.verdeEscuro, '#0a5c38']}
      end={{ x: 1, y: 1 }}
      start={{ x: 0, y: 0 }}
      style={styles.ticket}
    >
      <Text style={styles.ticketLabel}>BILHETE</Text>
      <Text style={styles.ticketNumero}>{numero}</Text>
      <View style={styles.ticketLinha} />
      <Text style={styles.ticketRodape}>Mega-Sena · volante digital</Text>
    </LinearGradient>
  );
}

export const styles = StyleSheet.create({
  fundo: { flex: 1 },
  decor: { ...StyleSheet.absoluteFillObject, overflow: 'hidden' },
  orb: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  orbTop: { width: 200, height: 200, top: -60, right: -50 },
  orbBottom: { width: 260, height: 260, bottom: -80, left: -90 },
  orbMid: { width: 120, height: 120, top: '40%', left: -40, opacity: 0.5 },
  safeArea: { flex: 1 },
  flex: { flex: 1 },
  content: {
    flexGrow: 1,
    gap: 18,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 36,
  },
  tituloBloco: { alignItems: 'center', marginBottom: 6 },
  badge: {
    backgroundColor: CORES.verdeMega,
    borderRadius: RAIO.pill,
    marginBottom: 10,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  badgeTexto: {
    color: CORES.branco,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  titulo: {
    color: CORES.verdeEscuro,
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -0.5,
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
    backgroundColor: CORES.brancoSuave,
    borderColor: 'rgba(255,255,255,0.8)',
    borderRadius: RAIO.lg,
    borderWidth: 1,
    padding: 20,
    ...SOMBRAS.card,
  },
  cardTitulo: {
    color: CORES.verdeEscuro,
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 14,
  },
  paragrafo: {
    color: CORES.textoMedio,
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 6,
  },
  featureItem: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 14,
    marginBottom: 14,
  },
  featureIcone: {
    alignItems: 'center',
    backgroundColor: CORES.cinzaFundo,
    borderRadius: RAIO.md,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  featureEmoji: { fontSize: 22 },
  featureTexto: { flex: 1 },
  featureTitulo: {
    color: CORES.textoEscuro,
    fontSize: 15,
    fontWeight: '800',
  },
  featureDescricao: {
    color: CORES.textoMedio,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 2,
  },
  botao: {
    alignItems: 'center',
    borderRadius: RAIO.md,
    paddingHorizontal: 20,
    paddingVertical: 17,
  },
  botaoDesabilitado: { opacity: 0.7 },
  botaoTexto: {
    color: CORES.branco,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  botaoSecundario: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderColor: CORES.verdeMega,
    borderRadius: RAIO.md,
    borderWidth: 2,
    paddingVertical: 15,
  },
  botaoSecundarioTexto: {
    color: CORES.verdeEscuro,
    fontSize: 15,
    fontWeight: '800',
  },
  progressoWrap: { gap: 6 },
  progressoFundo: {
    backgroundColor: CORES.cinzaBorda,
    borderRadius: RAIO.pill,
    height: 8,
    overflow: 'hidden',
  },
  progressoPreenchido: { borderRadius: RAIO.pill, height: '100%' },
  progressoTexto: {
    color: CORES.verdeEscuro,
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'right',
  },
  optionRow: {
    alignItems: 'center',
    backgroundColor: CORES.cinzaFundo,
    borderRadius: RAIO.md,
    flexDirection: 'row',
    gap: 12,
    padding: 12,
  },
  optionRowAtivo: {
    backgroundColor: 'rgba(32, 152, 105, 0.12)',
    borderColor: CORES.verdeMega,
    borderWidth: 1.5,
  },
  optionIcone: {
    alignItems: 'center',
    backgroundColor: CORES.branco,
    borderRadius: RAIO.sm,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  optionIconeAtivo: { backgroundColor: CORES.verdeMega },
  optionEmoji: { fontSize: 18 },
  optionTexto: { flex: 1 },
  optionLabel: {
    color: CORES.textoEscuro,
    fontSize: 15,
    fontWeight: '800',
  },
  optionDesc: {
    color: CORES.textoMedio,
    fontSize: 12,
    marginTop: 2,
  },
  optionCheck: {
    alignItems: 'center',
    borderColor: CORES.cinzaBorda,
    borderRadius: 12,
    borderWidth: 2,
    height: 24,
    justifyContent: 'center',
    width: 24,
  },
  optionCheckAtivo: {
    backgroundColor: CORES.verdeMega,
    borderColor: CORES.verdeMega,
  },
  optionCheckMark: {
    color: CORES.branco,
    fontSize: 13,
    fontWeight: '900',
  },
  stepper: { alignItems: 'center', gap: 8 },
  stepperLabel: {
    color: CORES.verdeEscuro,
    fontSize: 13,
    fontWeight: '700',
  },
  stepperLinha: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  stepperBtn: {
    alignItems: 'center',
    backgroundColor: CORES.verdeEscuro,
    borderRadius: RAIO.sm,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  stepperBtnTexto: {
    color: CORES.branco,
    fontSize: 22,
    fontWeight: '300',
    lineHeight: 24,
  },
  stepperValorWrap: {
    alignItems: 'center',
    backgroundColor: CORES.branco,
    borderRadius: RAIO.md,
    minWidth: 64,
    paddingHorizontal: 20,
    paddingVertical: 10,
    ...SOMBRAS.card,
  },
  stepperValor: {
    color: CORES.verdeEscuro,
    fontSize: 28,
    fontWeight: '900',
  },
  bola: {
    alignItems: 'center',
    borderRadius: RAIO.pill,
    justifyContent: 'center',
  },
  bolaNormal: {
    backgroundColor: CORES.branco,
    borderColor: CORES.cinzaBorda,
    borderWidth: 1,
  },
  bolaTexto: {
    color: CORES.textoEscuro,
    fontSize: 12,
    fontWeight: '800',
  },
  bolaTextoPequeno: { fontSize: 10 },
  bolaTextoSelecionado: { color: CORES.branco },
  ticket: {
    alignItems: 'center',
    borderRadius: RAIO.lg,
    padding: 22,
    ...SOMBRAS.card,
  },
  ticketLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
  },
  ticketNumero: {
    color: CORES.branco,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 2,
    marginTop: 6,
  },
  ticketLinha: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    height: 1,
    marginVertical: 14,
    width: '80%',
  },
  ticketRodape: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 11,
    fontWeight: '600',
  },
});
