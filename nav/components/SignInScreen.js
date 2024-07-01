import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function SignInScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePhoneNumberChange = (text) => {
    const numericRegex = /^[0-9\s]*$/;
    if (numericRegex.test(text)) {
      const cleaned = text.replace(/\s+/g, '');
      if (cleaned.length === 0 || cleaned.startsWith('0')) {
        const formatted = cleaned.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
        setPhoneNumber(formatted.trim());
        setErrorMessage('');
      } else {
        setErrorMessage('Số điện thoại phải bắt đầu bằng số 0');
      }
    } else {
      setErrorMessage('Vui lòng chỉ nhập các số từ 0 đến 9');
    }
  };

  const handleContinue = () => {
    const cleaned = phoneNumber.replace(/\s+/g, '');
    const phoneRegex = /^0[0-9]{9}$/;
    if (phoneRegex.test(cleaned)) {
      navigation.navigate('Home');
    } else {
      Alert.alert('Lỗi', 'Vui lòng nhập số điện thoại có đúng 10 chữ số từ 0 đến 9 và bắt đầu bằng số 0');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.boldText}>Nhập số điện thoại:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
          maxLength={12} // Includes spaces
          placeholder="Nhập số điện thoại"
          placeholderTextColor="#888"
        />
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Tiếp tục" onPress={handleContinue} color="#1E90FF" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
  },
  boldText: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginTop: -10, 
  },
  buttonContainer: {
    padding: 30,
    paddingBottom: 40,
  },
});
