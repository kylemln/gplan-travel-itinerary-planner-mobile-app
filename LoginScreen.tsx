import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { User } from './App';

export default function LoginScreen({
  onLogin,
  onGuest,
  onSignup,
  registeredUser,
}: {
  onLogin: (user: User) => void;
  onGuest: () => void;
  onSignup: () => void;
  registeredUser: {
    username: string;
    password: string;
    user: User;
  } | null;
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Image source={require('./gplan_logo.png')} style={styles.logo} />

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          placeholder="Username"
          placeholderTextColor="#888"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.buttonWrapper}>
          <Button
            title="Login"
            color="#FFA500"
            onPress={() => {
              if (
                registeredUser &&
                username === registeredUser.username &&
                password === registeredUser.password
              ) {
                onLogin(registeredUser.user);
              } else {
                alert('Invalid credentials');
              }
            }}
          />
        </View>

        <TouchableOpacity onPress={onGuest} style={styles.guestBtn}>
          <Text style={styles.guestText}>Continue as Guest</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onSignup}>
          <Text style={styles.signupText}>
            Don't have an account? <Text style={styles.link}>Sign up now!</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 5,
  },
  contentContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f5f5f5',
    color: '#000',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 15,
    fontSize: 16,
    width: '100%',
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 5,
  },
  guestBtn: {
    marginTop: 10,
    alignItems: 'center',
  },
  guestText: {
    color: '#FFA500',
    marginTop: 10,
    fontWeight: '600',
  },
  signupText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
  },
  link: {
    color: '#FFA500',
    fontWeight: 'bold',
  },
});
