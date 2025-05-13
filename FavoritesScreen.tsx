// FavoritesScreen.tsx
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export default function FavoritesScreen({ favorites, removeFromFavorites, navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require('./gplanpng.png')} style={styles.logo} />
        <Text style={styles.header}>My Favorite Destinations</Text>
      </View>

      <View style={styles.contentWrapper}>
        <View style={[styles.sectionHeader, { marginTop: 20 }]}> {/* spacing after header */}
          <Ionicons name="heart" size={20} color="#FFA500" />
          <Text style={styles.sectionTitle}>Favorites</Text>
        </View>
        {favorites.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>No favorites added yet.</Text>
        ) : (
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.imageCard}>
                <Image source={item.image} style={styles.destinationImage} />
                <View style={styles.imageOverlay}>
                  <Text style={styles.destinationTitle}>{item.title}</Text>
                  <TouchableOpacity onPress={() => removeFromFavorites(item.id)}>
                    <Ionicons name="trash" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#FFA500',
    paddingTop: 40,
    paddingBottom: 22,
    paddingHorizontal: 20,
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 7,
    top: 10,
  },
  header: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#fff',
    top: -20,
  },
  contentWrapper: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 6,
    color: '#FFA500',
  },
  imageCard: {
    marginRight: 20,
    position: 'relative',
  },
  destinationImage: {
    width: width * 0.65,
    height: (width * 0.65) * 0.75,
    borderRadius: 15,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  destinationTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
