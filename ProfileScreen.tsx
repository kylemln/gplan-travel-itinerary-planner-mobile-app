import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Image, TextInput, KeyboardAvoidingView, Platform
} from 'react-native';
import { IconButton, Button } from 'react-native-paper';

export default function ProfileScreen({
  user, trips, setTrips, navigation, notifications, setNotifications
}) {
  const [expandedStates, setExpandedStates] = useState(trips.map(() => true));
  const [editingTime, setEditingTime] = useState({});
  const [pendingTimeEdits, setPendingTimeEdits] = useState({});
  const [searchText, setSearchText] = useState('');
  const scrollRef = useRef();

  const toggleTrip = (index) => {
    const updated = [...expandedStates];
    updated[index] = !updated[index];
    setExpandedStates(updated);
  };

  const notify = (message) => {
    setNotifications(prev => [...prev, message]);
  };

  const handleSaveTime = (tripIndex, dayIndex, destIndex) => {
    const editKey = `${tripIndex}-${dayIndex}-${destIndex}`;
    const newTime = pendingTimeEdits[editKey];
    const updatedTrips = [...trips];
    const dest = updatedTrips[tripIndex].days[dayIndex].destinations[destIndex];

    if (newTime !== dest.time) {
      notify(`Your visit time to ${dest.title} from ${updatedTrips[tripIndex].days[dayIndex].label} of ${updatedTrips[tripIndex].tripName} was changed.`);
      dest.time = newTime;
      setTrips(updatedTrips);
    }

    setEditingTime(prev => ({ ...prev, [editKey]: false }));
    setPendingTimeEdits(prev => {
      const updated = { ...prev };
      delete updated[editKey];
      return updated;
    });
  };

  const handleEditTime = (tripIndex, dayIndex, destIndex) => {
    const editKey = `${tripIndex}-${dayIndex}-${destIndex}`;
    const currentTime = trips[tripIndex].days[dayIndex].destinations[destIndex].time || '';
    setEditingTime(prev => ({ ...prev, [editKey]: true }));
    setPendingTimeEdits(prev => ({ ...prev, [editKey]: currentTime }));
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleDeleteDestination = (tripIndex, dayIndex, destIndex) => {
    const updatedTrips = [...trips];
    const dest = updatedTrips[tripIndex].days[dayIndex].destinations[destIndex];
    notify(`Your destination ${dest.title} was removed from ${updatedTrips[tripIndex].days[dayIndex].label} of ${updatedTrips[tripIndex].tripName}.`);
    updatedTrips[tripIndex].days[dayIndex].destinations.splice(destIndex, 1);
    setTrips(updatedTrips);
  };

  const handleDeleteTrip = (tripIndex) => {
    const updatedTrips = trips.filter((_, i) => i !== tripIndex);
    const updatedExpanded = expandedStates.filter((_, i) => i !== tripIndex);
    setTrips(updatedTrips);
    setExpandedStates(updatedExpanded);
  };

  const moveDestination = (tripIndex, dayIndex, fromIndex, direction) => {
    const destinations = [...trips[tripIndex].days[dayIndex].destinations];
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
    if (toIndex < 0 || toIndex >= destinations.length) return;
    [destinations[fromIndex], destinations[toIndex]] = [destinations[toIndex], destinations[fromIndex]];
    const updatedTrips = [...trips];
    updatedTrips[tripIndex].days[dayIndex].destinations = destinations;
    setTrips(updatedTrips);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const filteredTrips = trips.filter(t => t.tripName.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView ref={scrollRef} contentContainerStyle={{ paddingBottom: 50 }}>
        <View style={styles.headerContainer}>
          <View style={styles.headerRow}>
            <Image source={require('./gplanpng.png')} style={styles.logo} />
            <View>
              <Text style={styles.header}>Welcome, {user.firstName}</Text>
              <Text style={styles.subHeader}>{user.email} | @{user.username}</Text>
              <Button
                mode="contained"
                style={styles.logoutButton}
                labelStyle={{ color: '#fff', fontSize: 12 }}
                onPress={() => navigation.navigate('Login')}
              >Logout</Button>
            </View>
          </View>
        </View>

        <TextInput
          placeholder="Search trips..."
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
          placeholderTextColor="#999"
        />

        <Text style={styles.sectionTitle}>My Trips</Text>

        {filteredTrips.map((trip, tripIndex) => {
          const isExpanded = expandedStates[tripIndex];
          return (
            <View key={trip.id || tripIndex} style={styles.tripBox}>
              <View style={styles.tripHeader}>
                <View>
                  <Text style={styles.tripTitle}>{trip.tripName}</Text>
                  <Text style={styles.tripDates}>{trip.startDate} - {trip.endDate}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <IconButton icon={isExpanded ? 'chevron-up' : 'chevron-down'} onPress={() => toggleTrip(tripIndex)} />
                  <IconButton icon="delete" onPress={() => handleDeleteTrip(tripIndex)} />
                </View>
              </View>

              {isExpanded && (
                <View style={styles.tripContent}>
                  {trip.days.map((day, dayIndex) => (
                    <View key={day.label} style={styles.dayBlock}>
                      <Text style={styles.dayTitle}>{day.label}</Text>
                      {day.destinations.map((dest, destIndex) => {
                        const editKey = `${tripIndex}-${dayIndex}-${destIndex}`;
                        const isEditing = editingTime[editKey] || false;
                        const tempTime = pendingTimeEdits[editKey] ?? dest.time;

                        return (
                          <View key={destIndex} style={styles.destCard}>
                            <Image source={dest.image} style={styles.destImage} />
                            <View style={styles.sideButtons}>
                              <IconButton icon="arrow-up" size={18} onPress={() => moveDestination(tripIndex, dayIndex, destIndex, 'up')} />
                              <IconButton icon="arrow-down" size={18} onPress={() => moveDestination(tripIndex, dayIndex, destIndex, 'down')} />
                            </View>
                            <View style={styles.destDetails}>
                              <Text style={styles.destTitle}>{dest.title}</Text>
                              <Text style={styles.destSubtitle}>{dest.location}</Text>
                              <View style={styles.timeRow}>
                                {isEditing ? (
                                  <>
                                    <TextInput
                                      value={tempTime}
                                      placeholder="e.g. 8:00 AM - 4:00 PM"
                                      placeholderTextColor="#888"
                                      onChangeText={(text) => {
                                        setPendingTimeEdits(prev => ({ ...prev, [editKey]: text }));
                                      }}
                                      style={[styles.timeInput, { color: '#000' }]}
                                    />
                                    <IconButton icon="check" size={18} onPress={() => handleSaveTime(tripIndex, dayIndex, destIndex)} />
                                  </>
                                ) : (
                                  <>
                                    <Text style={styles.timeText}>{dest.time || 'No time set'}</Text>
                                    <IconButton icon="pencil" size={18} onPress={() => handleEditTime(tripIndex, dayIndex, destIndex)} />
                                  </>
                                )}
                              </View>
                            </View>
                            <View style={styles.iconWrapper}>
                              <IconButton icon="close" size={18} onPress={() => handleDeleteDestination(tripIndex, dayIndex, destIndex)} style={styles.deleteDestIcon} />
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fffaf0', flex: 1 },
  headerContainer: { backgroundColor: '#FFA500', paddingTop: 60, paddingBottom: 55, paddingHorizontal: 20 },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 110, height: 110, resizeMode: 'contain', marginLeft: 8, marginRight: 14 },
  header: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  subHeader: { fontSize: 14, color: '#fff', marginBottom: 4 },
  logoutButton: { backgroundColor: '#f44336', paddingHorizontal: 10, alignSelf: 'flex-start', marginTop: 5 },
  searchInput: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: -25,
    padding: 10,
    borderColor: '#FFA500',
    borderWidth: 2,
    borderRadius: 10,
    elevation: 5
  },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginTop: 20, color: '#FFA500' },
  tripBox: { backgroundColor: '#fffef5', margin: 10, borderRadius: 8, elevation: 2 },
  tripHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12 },
  tripTitle: { fontSize: 16, fontWeight: 'bold' },
  tripDates: { fontSize: 12, color: '#555' },
  tripContent: { padding: 10 },
  dayBlock: { marginBottom: 10 },
  dayTitle: { fontWeight: 'bold', fontSize: 16, color: '#f37909', marginBottom: 5 },
  destCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff9ec',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5
  },
  destImage: { width: 100, height: 80, borderRadius: 6 },
  sideButtons: { marginLeft: 8, justifyContent: 'center' },
  destDetails: { flex: 1, marginLeft: 10 },
  destTitle: { fontWeight: 'bold', fontSize: 14, marginTop: 20 },
  destSubtitle: { fontSize: 12, color: '#555' },
  timeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  timeInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#FFA500',
    fontSize: 13,
    paddingVertical: 2,
    marginRight: 5,
    color: '#000'
  },
  timeText: { flex: 1, fontSize: 13, color: '#333', marginRight: 5 },
  iconWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: -46,
    marginTop: 5,
  },
  deleteDestIcon: {
    marginTop: -50,
    marginRight: -15,
  }
});
