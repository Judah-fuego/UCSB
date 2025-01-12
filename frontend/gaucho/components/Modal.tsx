import React from 'react';
import { Modal, View, Text, StyleSheet, Button } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function CustomModal({ visible, onClose, waitTime, menuItems }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.waitTimeText}>Current Wait Time: {waitTime} minutes</Text>
        <Text style={styles.sectionTitle}>Menu Items</Text>
        {menuItems.length > 0 ? (
          menuItems.map(item => (
            <Text key={item.id} style={styles.menuItem}>
              {item.item_name} - {item.price}
            </Text>
          ))
        ) : (
          <Text style={styles.menuItem}>No menu items available.</Text>
        )}
        <Button title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
  },
  waitTimeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#fff',
  },
  menuItem: {
    fontSize: 16,
    color: '#fff',
  },
});