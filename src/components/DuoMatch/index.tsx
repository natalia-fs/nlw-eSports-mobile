import React, { useState } from 'react';
import { View, Text, Modal, ModalProps, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

import * as Clipboard from 'expo-clipboard';

import { MaterialIcons } from '@expo/vector-icons';
import { CheckCircle } from 'phosphor-react-native';

import { styles } from './styles';
import { THEME } from '../../theme';
import { Heading } from '../Heading';

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [isCopying, setIsCopying] = useState(false);

  async function handleCopyDiscorToClipboard(){
    setIsCopying(true);
    await Clipboard.setStringAsync(discord);

    Alert.alert('Discord copiado!', 'Nome de usuário copiado para sua área de transferência, agora é só colar no Discord');
    setIsCopying(false);
  }

  return (
    <Modal
      transparent
      statusBarTranslucent
      {...rest}
      animationType="fade"
    >
      <View style={styles.container}>
        <View style={styles.content}>

          <TouchableOpacity
            style={styles.closeIcon}
            onPress={onClose}
          >
            <MaterialIcons
              name='close'
              size={24}
              color={THEME.COLORS.CAPTION_300}
            />
          </TouchableOpacity>

          <CheckCircle
            size={64}
            color={THEME.COLORS.SUCCESS}
            weight="bold"
          />

          <Heading
            title="Let's play!"
            subtitle='Agora é só começar a jogar!'
            style={{alignItems: 'center', marginTop: 24}}
          />

          <Text style={styles.label}>Adicione no Discord</Text>
          
          <TouchableOpacity
            style={styles.discordButton}
            onPress={handleCopyDiscorToClipboard}
            disabled={isCopying}
          >
            <Text style={styles.discord}>
              { isCopying ? <ActivityIndicator color={THEME.COLORS.PRIMARY}/> : discord}
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}