import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Modal,
  Portal,
  Provider,
  Button,
  Dialog,
  RadioButton,
} from 'react-native-paper';

const { width } = Dimensions.get('window');

// Expanded destinations array
const DESTINATIONS = [
  {
    id: '1',
    title: 'El Nido, Palawan',
    location: 'Palawan, Philippines',
    image: require('./elnido.jpg'),
    about: 'El Nido boasts turquoise waters, dramatic limestone cliffs, and hidden lagoons perfect for island-hopping. Its rich marine biodiversity and pristine beaches make it a haven for eco-tourists and divers.',
    hours: '7:00 AM - 6:00 PM',
  },
  {
    id: '2',
    title: 'Chocolate Hills',
    location: 'Bohol, Philippines',
    image: require('./chocolatehills.jpg'),
    about: 'These natural wonders are over 1,200 symmetrical hills that turn brown in the summer. Their unique geological formation continues to amaze geologists and tourists alike.',
    hours: '8:00 AM - 5:00 PM',
  },
  {
    id: '3',
    title: 'Vigan City',
    location: 'Ilocos Sur, Philippines',
    image: require('./vigan.jpg'),
    about: 'Vigan is known for its preserved Spanish colonial architecture and cobblestone streets. Walking through its historic core feels like stepping back in time.',
    hours: '9:00 AM - 9:00 PM',
  },
  {
    id: '4',
    title: 'Mayon Volcano',
    location: 'Albay, Philippines',
    image: require('./mayon.jpg'),
    about: 'Mayon is famous for its near-perfect cone shape and breathtaking views. It is a popular destination for hiking and cultural exploration in the Bicol region.',
    hours: '6:00 AM - 6:00 PM',
  },
  {
    id: '5',
    title: 'Taal Volcano',
    location: 'Batangas, Philippines',
    image: require('./taal.jpg'),
    about: 'Taal is one of the world’s smallest active volcanoes, set within a picturesque lake. Its accessible crater and scenic surroundings attract both adventure seekers and photographers.',
    hours: '8:00 AM - 5:00 PM',
  },
  {
    id: '6',
    title: 'Banaue Rice Terraces',
    location: 'Banaue, Philippines',
    image: require('./banaue.jpg'),
    about: 'The Banaue Rice Terraces, carved into the mountains of Ifugao, are a UNESCO World Heritage Site and are known for their historical and cultural significance.',
    hours: '8:00 AM - 5:00 PM',
  },
  {
    id: '7',
    title: 'Puerto Princesa Underground River',
    location: 'Palawan, Philippines',
    image: require('./undergroundriver.jpg'),
    about: 'A UNESCO World Heritage Site, this river runs through a spectacular cave system, offering a unique underground experience.',
    hours: '7:00 AM - 6:00 PM',
  },
  {
    id: '8',
    title: 'Panglao Island',
    location: 'Bohol, Philippines',
    image: require('./panglao.jpg'),
    about: 'Known for its pristine white-sand beaches and crystal-clear waters, Panglao Island is a popular spot for diving and water activities.',
    hours: '7:00 AM - 7:00 PM',
  },
  {
    id: '9',
    title: 'Coron Island',
    location: 'Palawan, Philippines',
    image: require('./coron.jpg'),
    about: 'Coron is famous for its dramatic rock formations, clear lagoons, and shipwreck diving sites.',
    hours: '8:00 AM - 6:00 PM',
  },
  {
    id: '10',
    title: 'Taal Volcano Lake',
    location: 'Batangas, Philippines',
    image: require('./taallake.jpg'),
    about: 'The Taal Volcano Lake is known for its scenic beauty and unique location within a volcanic crater.',
    hours: '9:00 AM - 5:00 PM',
  },
  {
    id: '11',
    title: 'Rizal Park',
    location: 'Manila, Philippines',
    image: require('./rizalpark.jpg'),
    about: 'Rizal Park, also known as Luneta, is a historical urban park in Manila that features monuments and lush gardens.',
    hours: '6:00 AM - 10:00 PM',
  },
  {
    id: '12',
    title: 'Batanes',
    location: 'Batanes, Philippines',
    image: require('./batanes.jpg'),
    about: 'Batanes offers picturesque rolling hills, traditional Ivatan houses, and serene landscapes.',
    hours: '8:00 AM - 5:00 PM',
  },
  {
    id: '13',
    title: 'Siargao Island',
    location: 'Surigao del Norte, Philippines',
    image: require('./siargao.jpg'),
    about: 'Known as the surfing capital of the Philippines, Siargao Island is famous for its pristine beaches and laid-back vibe.',
    hours: '7:00 AM - 7:00 PM',
  },
  {
    id: '14',
    title: 'Hundred Islands',
    location: 'Alaminos, Pangasinan, Philippines',
    image: require('./hundredislands.jpg'),
    about: 'A group of 124 islands and islets, the Hundred Islands National Park is a popular destination for water activities like island hopping and snorkeling.',
    hours: '7:00 AM - 6:00 PM',
  },
  {
    id: '15',
    title: 'Subic Bay',
    location: 'Zambales, Philippines',
    image: require('./subicbay.jpg'),
    about: 'Subic Bay is a former U.S. naval base turned eco-tourism hub offering water sports, animal parks, and resorts.',
    hours: '8:00 AM - 10:00 PM',
  },
  {
    id: '16',
    title: 'Tagaytay',
    location: 'Cavite, Philippines',
    image: require('./tagaytay.jpg'),
    about: 'Tagaytay offers a cool climate and stunning views of Taal Volcano, making it a popular getaway for families and tourists.',
    hours: '7:00 AM - 7:00 PM',
  },
  {
    id: '17',
    title: 'Sagada',
    location: 'Mountain Province, Philippines',
    image: require('./sagada.jpg'),
    about: 'Sagada is known for its hanging coffins, caves, and beautiful mountain landscapes, making it a great spot for adventure seekers.',
    hours: '6:00 AM - 6:00 PM',
  },
  {
    id: '18',
    title: 'Bohol Bee Farm',
    location: 'Bohol, Philippines',
    image: require('./boholbeefarm.jpg'),
    about: 'Bohol Bee Farm is an eco-tourism farm offering fresh organic food, natural honey products, and serene beachfront views.',
    hours: '8:00 AM - 5:00 PM',
  },
  {
    id: '19',
    title: 'Lake Sebu',
    location: 'South Cotabato, Philippines',
    image: require('./lakesebu.jpg'),
    about: 'Lake Sebu is known for its scenic beauty, cool climate, and the T’boli culture. Visitors can enjoy boating, fishing, and cultural tours.',
    hours: '7:00 AM - 6:00 PM',
  },
];

// Featured destinations (6 additional places)
const FEATURED_DESTINATIONS = [
  {
    id: '20',
    title: 'Banaue Rice Terraces',
    location: 'Banaue, Philippines',
    image: require('./banaue.jpg'),
    about: 'The Banaue Rice Terraces, carved into the mountains of Ifugao, are a UNESCO World Heritage Site and are known for their historical and cultural significance.',
    hours: '8:00 AM - 5:00 PM',
  },
  {
    id: '21',
    title: 'Puerto Princesa Underground River',
    location: 'Palawan, Philippines',
    image: require('./undergroundriver.jpg'),
    about: 'A UNESCO World Heritage Site, this river runs through a spectacular cave system, offering a unique underground experience.',
    hours: '7:00 AM - 6:00 PM',
  },
  {
    id: '22',
    title: 'Panglao Island',
    location: 'Bohol, Philippines',
    image: require('./panglao.jpg'),
    about: 'Known for its pristine white-sand beaches and crystal-clear waters, Panglao Island is a popular spot for diving and water activities.',
    hours: '7:00 AM - 7:00 PM',
  },
  {
    id: '23',
    title: 'Coron Island',
    location: 'Palawan, Philippines',
    image: require('./coron.jpg'),
    about: 'Coron is famous for its dramatic rock formations, clear lagoons, and shipwreck diving sites.',
    hours: '8:00 AM - 6:00 PM',
  },
  {
    id: '24',
    title: 'Taal Volcano Lake',
    location: 'Batangas, Philippines',
    image: require('./taallake.jpg'),
    about: 'The Taal Volcano Lake is known for its scenic beauty and unique location within a volcanic crater.',
    hours: '9:00 AM - 5:00 PM',
  },
  {
    id: '25',
    title: 'Rizal Park',
    location: 'Manila, Philippines',
    image: require('./rizalpark.jpg'),
    about: 'Rizal Park, also known as Luneta, is a historical urban park in Manila that features monuments and lush gardens.',
    hours: '6:00 AM - 10:00 PM',
  },
];

export default function HomeScreen({ navigation, addToFavorites, trips, addToTripPlan }) {
  const [search, setSearch] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [tripDialogVisible, setTripDialogVisible] = useState(false);
  const [selectedTripIndex, setSelectedTripIndex] = useState(null);
  const [selectedDay, setSelectedDay] = useState('');

  const filteredDestinations = DESTINATIONS.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const openModal = (destination) => {
    setSelectedDestination(destination);
    setModalVisible(true);
  };

  const handleAddToTrip = () => {
    setTripDialogVisible(true);
  };

  const confirmAddToTrip = () => {
    if (
      selectedTripIndex !== null &&
      selectedDay &&
      trips[selectedTripIndex] &&
      selectedDestination
    ) {
      const tripId = trips[selectedTripIndex].id;
      const enrichedDestination = {
        ...selectedDestination,
        time: '',
        image: selectedDestination.image,
      };
      addToTripPlan(tripId, selectedDay, enrichedDestination);
    }
    setTripDialogVisible(false);
    setModalVisible(false);
    setSelectedTripIndex(null);
    setSelectedDay('');
  };

  return (
    <Provider>
      <View style={{ flex: 1, backgroundColor: '#FFA500', paddingTop: 20 }}>
        <ScrollView style={styles.container}>
          <View style={styles.headerContainer}>
            <Image source={require('./gplanpng.png')} style={styles.logo} />
            <Text style={styles.header}>Explore the Beautiful Places</Text>
          </View>

          <View style={styles.searchBarContainer}>
            <View style={styles.searchWrapper}>
              <Ionicons name="search" size={20} color="#FFA500" style={styles.icon} />
              <TextInput
                placeholder="Search places"
                placeholderTextColor="#888"
                value={search}
                onChangeText={setSearch}
                style={styles.searchBar}
              />
            </View>
          </View>

          {/* ↓↓↓ CLOSE GAP BETWEEN SEARCH BAR & PLACES TITLE ↓↓↓ */}
          <View style={[styles.contentWrapper, { paddingTop: 20 }]}>
            <Text style={styles.sectionTitle}>Places</Text>
            <FlatList
              data={filteredDestinations.slice(0, 19)}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => openModal(item)} style={styles.imageCard}>
                  <Image source={item.image} style={styles.destinationImage} />
                  <View style={styles.imageOverlay}>
                    <Text style={styles.destinationTitle}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* ↓↓↓ CLOSE GAP BETWEEN PLACES & FEATURED PLACES ↓↓↓ */}
          <View style={[styles.contentWrapper, { paddingTop: 20 }]}>
            <Text style={styles.sectionTitle}>Featured Places</Text>
            <FlatList
              data={FEATURED_DESTINATIONS.slice(0, 7)}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => openModal(item)} style={styles.imageCard}>
                  <Image source={item.image} style={styles.destinationImage} />
                  <View style={styles.imageOverlay}>
                    <Text style={styles.destinationTitle}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </ScrollView>

        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
            contentContainerStyle={styles.modalContainer}
          >
            {selectedDestination && (
              <View style={styles.modalContent}>
                <Image source={selectedDestination.image} style={styles.modalImage} />
                <Text style={styles.modalTitle}>{selectedDestination.title}</Text>
                <Text>{selectedDestination.location}</Text>
                <Text style={styles.modalText}>{selectedDestination.about}</Text>
                <Text>Open: {selectedDestination.hours}</Text>

                <Button mode="contained" onPress={handleAddToTrip} style={styles.orangeButton}>
                  Add to Trip
                </Button>

                <Button
                  mode="contained"
                  style={[styles.orangeButton, { backgroundColor: '#f37909' }]}
                  onPress={() => {
                    addToFavorites(selectedDestination);
                    setModalVisible(false);
                  }}
                >
                  Add to Favorites
                </Button>

                <Button onPress={() => setModalVisible(false)} style={{ marginTop: 10 }}>
                  Cancel
                </Button>
              </View>
            )}
          </Modal>

          <Dialog visible={tripDialogVisible} onDismiss={() => setTripDialogVisible(false)}>
            <Dialog.Title style={{ color: '#FFA500' }}>Choose Trip & Day</Dialog.Title>
            <Dialog.Content>
              <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Select a Trip</Text>
              <RadioButton.Group
                onValueChange={(value) => setSelectedTripIndex(parseInt(value))}
                value={selectedTripIndex !== null ? String(selectedTripIndex) : ''}
              >
                {trips.map((trip, index) => (
                  <RadioButton.Item
                    key={trip.id}
                    label={`${trip.tripName} (${trip.startDate} to ${trip.endDate})`}
                    value={String(index)}
                  />
                ))}
              </RadioButton.Group>

              {selectedTripIndex !== null && trips[selectedTripIndex] && (
                <>
                  <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Select Day</Text>
                  <RadioButton.Group
                    onValueChange={(value) => setSelectedDay(value)}
                    value={selectedDay}
                  >
                    {trips[selectedTripIndex].days.map((dayObj) => (
                      <RadioButton.Item
                        key={dayObj.label}
                        label={dayObj.label}
                        value={dayObj.label}
                      />
                    ))}
                  </RadioButton.Group>
                </>
              )}
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={confirmAddToTrip}>Confirm</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', flex: 1 },
  headerContainer: {
    backgroundColor: '#FFA500',
    paddingTop: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 10,
    top: -30,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    top: -60,
  },
  searchBarContainer: {
    paddingHorizontal: 20,
    marginTop: -30,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#FFA500',
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    elevation: 4,
  },
  icon: { marginRight: 8 },
  searchBar: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  contentWrapper: {
    paddingHorizontal: 20,
    paddingTop: 40, // You can adjust this value to change spacing between sections
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFA500',
    marginBottom: 10,
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
  },
  destinationTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  modalContent: {
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFA500',
    marginBottom: 5,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
  orangeButton: {
    backgroundColor: '#FFA500',
    borderRadius: 6,
    marginTop: 12,
    width: '100%',
  },
});