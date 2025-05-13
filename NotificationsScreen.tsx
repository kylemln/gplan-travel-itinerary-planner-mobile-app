import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { Card, IconButton } from 'react-native-paper';

export default function NotificationsScreen({ notifications, setNotifications }) {
  const handleDelete = (index) => {
    const updated = [...notifications];
    updated.splice(index, 1);
    setNotifications(updated);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require('./gplanpng.png')} style={styles.logo} />
        <Text style={styles.header}>Notifications</Text>
      </View>

      {notifications.length === 0 ? (
        <Text style={styles.noNotif}>No notifications at the moment.</Text>
      ) : (
        notifications.map((notif, index) => (
          <Card key={index} style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Text style={styles.notifText}>{notif}</Text>
              <IconButton
                icon="close"
                size={20}
                onPress={() => handleDelete(index)}
                style={styles.closeButton}
              />
            </Card.Content>
          </Card>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fffaf0',
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#FFA500',
    paddingTop: 60,
    paddingBottom: 35,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: -25,
    top: -10,
  },
  header: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#fff',
  },
  noNotif: {
    marginTop: 30,
    textAlign: 'center',
    color: '#555',
    fontSize: 16,
  },
  card: {
    margin: 10,
    backgroundColor: '#fffef5',
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notifText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginRight: 10,
  },
  closeButton: {
    alignSelf: 'flex-start',
  },
});
