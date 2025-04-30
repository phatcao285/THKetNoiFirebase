import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';

function DetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail Screen</Text>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardText}>
            This is the detail screen content.
          </Text>
        </Card.Content>
      </Card>
      <Button 
        mode="contained" 
        onPress={() => navigation.goBack()}
        style={styles.button}
        color="#673AB7"
      >
        Go Back
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  card: {
    width: '90%',
    marginBottom: 20,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    borderRadius: 20,
    paddingHorizontal: 10,
  },
});

export default DetailsScreen;