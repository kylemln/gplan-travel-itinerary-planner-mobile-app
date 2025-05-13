import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import HomeScreen from './HomeScreen';
import FavoritesScreen from './FavoritesScreen';
import CreateTripScreen from './CreateTripScreen';
import NotificationsScreen from './NotificationsScreen';
import ProfileScreen from './ProfileScreen';
import { User } from './types';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  MainTabs: { user: User };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

export default function App() {
  const [registeredUser, setRegisteredUser] = useState<null | {
    username: string;
    password: string;
    user: User;
  }>(null);

  const [favorites, setFavorites] = useState<any[]>([]);
  const [trips, setTrips] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);

  const addToFavorites = (destination: any) => {
    if (!favorites.find((item) => item.id === destination.id)) {
      setFavorites([...favorites, destination]);
    }
  };

  const removeFromFavorites = (id: string) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  const addTrip = (trip: any) => {
    const newTrip = {
      ...trip,
      id: Date.now().toString(),
      days: trip.days.map((day: any) => ({
        ...day,
        destinations: [],
      })),
    };
    setTrips((prev) => [...prev, newTrip]);
  };

  const addToTripPlan = (tripId: string, dayLabel: string, destination: any) => {
    const updatedTrips = trips.map((trip) => {
      if (trip.id === tripId) {
        const updatedDays = trip.days.map((day: any) => {
          if (day.label === dayLabel) {
            const enrichedDestination = {
              id: destination.id,
              title: destination.title,
              location: destination.location,
              image: destination.image,
              time: '',
            };
            return {
              ...day,
              destinations: [...day.destinations, enrichedDestination],
            };
          }
          return day;
        });
        return { ...trip, days: updatedDays };
      }
      return trip;
    });

    setTrips(updatedTrips);
  };

  const MainTabs = ({ route }) => {
    const user = route.params.user;

    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = 'ellipse';
            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Favorites') iconName = 'heart';
            else if (route.name === 'CreateTrip') iconName = 'add-circle';
            else if (route.name === 'Notifications') iconName = 'notifications';
            else if (route.name === 'Profile') iconName = 'person';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#fbe3bd',
          tabBarStyle: {
            backgroundColor: '#FFA500',
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home">
          {(props) => (
            <HomeScreen
              {...props}
              user={user}
              addToFavorites={addToFavorites}
              favorites={favorites}
              removeFromFavorites={removeFromFavorites}
              trips={trips}
              addToTripPlan={addToTripPlan}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="Favorites">
          {(props) => (
            <FavoritesScreen
              {...props}
              favorites={favorites}
              removeFromFavorites={removeFromFavorites}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="CreateTrip">
          {(props) => <CreateTripScreen {...props} addTrip={addTrip} />}
        </Tab.Screen>

        <Tab.Screen name="Notifications">
          {(props) => (
            <NotificationsScreen
              {...props}
              notifications={notifications}
              setNotifications={setNotifications}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="Profile">
          {(props) => (
            <ProfileScreen
              {...props}
              user={user}
              trips={trips}
              setTrips={setTrips}
              notifications={notifications}
              setNotifications={setNotifications}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" options={{ title: 'Login' }}>
          {(props) => (
            <LoginScreen
              {...props}
              onLogin={(user) => props.navigation.navigate('MainTabs', { user })}
              onGuest={() =>
                props.navigation.navigate('MainTabs', {
                  user: {
                    firstName: 'Guest',
                    lastName: '',
                    email: 'guest@example.com',
                    username: 'guest',
                  },
                })
              }
              onSignup={() => props.navigation.navigate('Register')}
              registeredUser={registeredUser}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Register" options={{ title: 'Register' }}>
          {(props) => (
            <RegisterScreen
              {...props}
              onRegister={(credentials) => {
                setRegisteredUser(credentials);
                props.navigation.navigate('Login');
              }}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

