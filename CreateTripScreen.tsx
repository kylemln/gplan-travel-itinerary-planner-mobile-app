import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function CreateTripScreen({ navigation, addTrip }) {
  const [tripName, setTripName] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numDays, setNumDays] = useState('');

  const handleCreateTrip = () => {
    if (!tripName || !location || !startDate || !endDate || !numDays) {
      alert('Please fill out all fields');
      return;
    }

    const parsedDays = parseInt(numDays, 10);
    if (isNaN(parsedDays) || parsedDays <= 0) {
      alert('Number of days must be a valid number');
      return;
    }

    const days = Array.from({ length: parsedDays }, (_, i) => ({
      label: `Day ${i + 1}`,
      destinations: [],
    }));

    const newTrip = {
      id: Date.now().toString(),
      tripName,
      location,
      startDate,
      endDate,
      days,
    };

    addTrip(newTrip);

    // Navigate safely within tabs
    navigation.navigate('Profile');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Plan your trip now!</Text>

        <TextInput
          placeholder="Trip Name (e.g., Cebu Trip 2025)"
          style={styles.input}
          value={tripName}
          onChangeText={setTripName}
          placeholderTextColor="#999"
        />

        <TextInput
          placeholder="Location"
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholderTextColor="#999"
        />

        <TextInput
          placeholder="Start Date (mm/dd/yy)"
          style={styles.input}
          value={startDate}
          onChangeText={setStartDate}
          placeholderTextColor="#999"
        />

        <TextInput
          placeholder="End Date (mm/dd/yy)"
          style={styles.input}
          value={endDate}
          onChangeText={setEndDate}
          placeholderTextColor="#999"
        />

        <TextInput
          placeholder="Number of Days"
          style={styles.input}
          value={numDays}
          onChangeText={setNumDays}
          keyboardType="numeric"
          placeholderTextColor="#999"
        />

        <View style={styles.submitButton}>
          <Button title="Create Trip" color="#f37909" onPress={handleCreateTrip} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fffaf0',
    padding: 25,
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFA500',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFA500',
    marginBottom: 20,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    color: '#333',
  },
  submitButton: {
    marginTop: 30,
    borderRadius: 5,
    overflow: 'hidden',
  },
});
