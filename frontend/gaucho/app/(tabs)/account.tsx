import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Button } from 'react-native';

export default function AccountScreen() {
  const [userInfo, setUserInfo] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [preferences, setPreferences] = useState({
    wants_v: 0,
    wants_vgn: 0,
    wants_w_nuts: 0,
  });

  const userId = 1; // Replace with the actual user ID

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/user_info?id=${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserInfo(data);
        setPreferences({
          wants_v: data.wants_v,
          wants_vgn: data.wants_vgn,
          wants_w_nuts: data.wants_w_nuts,
        });
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleUpdatePreferences = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/update_preferences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userId, ...preferences }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedData = await response.json();
      setUserInfo(updatedData);
      setModalVisible(false);
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };

  const togglePreference = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: prev[key] === 1 ? 0 : 1,
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hi {userInfo.username}</Text>
        <Text style={styles.subHeaderText}>{userInfo.email}</Text>
      </View>

      <ScrollView style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => setModalVisible(true)}>
          <Text style={styles.menuText}>Preferences</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Help & Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Update Preferences</Text>
          <View style={styles.preferenceContainer}>
            <Text>Wants Vegetarian:</Text>
            <TouchableOpacity
              style={[styles.button, preferences.wants_v === 1 && styles.activeButton]}
              onPress={() => togglePreference('wants_v')}
            >
              <Text style={styles.buttonText}>{preferences.wants_v === 1 ? 'Yes' : 'No'}</Text>
            </TouchableOpacity>
            <Text>Wants Vegan:</Text>
            <TouchableOpacity
              style={[styles.button, preferences.wants_vgn === 1 && styles.activeButton]}
              onPress={() => togglePreference('wants_vgn')}
            >
              <Text style={styles.buttonText}>{preferences.wants_vgn === 1 ? 'Yes' : 'No'}</Text>
            </TouchableOpacity>
            <Text>Wants No Nuts:</Text>
            <TouchableOpacity
              style={[styles.button, preferences.wants_w_nuts === 1 && styles.activeButton]}
              onPress={() => togglePreference('wants_w_nuts')}
            >
              <Text style={styles.buttonText}>{preferences.wants_w_nuts === 1 ? 'Yes' : 'No'}</Text>
            </TouchableOpacity>
          </View>
          <Button title="Submit" onPress={handleUpdatePreferences} />
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#003366',
    padding: 20,
    alignItems: 'flex-start',
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#fff',
  },
  menuContainer: {
    marginTop: 20,
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuText: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  preferenceContainer: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent background
  },
  activeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // More opaque when active
  },
  buttonText: {
    color: '#fff',
  },
});