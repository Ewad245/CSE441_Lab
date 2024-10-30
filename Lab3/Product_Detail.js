import {SafeAreaView} from 'react-native-safe-area-context';
import {Avatar, Card, Text, Button} from 'react-native-paper';
import {useEffect, useState} from 'react';
function ShowDetailProduct() {
  const [data, setData] = useState([]);
  const filePath = 'https://dummyjson.com/products/2';
  useEffect(() => {
    // Alert.alert(filePath);
    fetch(filePath)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(d => {
        setData(d);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  });
  return (
    <SafeAreaView>
      <Card>
        <Card.Content>
          <Text variant="titleMedium">Product Detail</Text>
        </Card.Content>
        <Card.Cover source={{uri: data.thumbnail}} />
        <Card.Content>
          <Text variant="titleLarge">Title: {data.title}</Text>
          <Text variant="bodyMedium">Description: {data.description}</Text>
          <Text variant="bodyMedium">Price: {data.price}</Text>
          <Text variant="bodyMedium">Discount: {data.discount}</Text>
          <Text variant="bodyMedium">Rating: {data.rating} stars</Text>
          <Text variant="bodyMedium">Stock: {data.stock}</Text>
          <Text variant="bodyMedium">Brand: {data.brand}</Text>
          <Text variant="bodyMedium">Category: {data.category}</Text>
        </Card.Content>
        <Card.Actions>
          <Button>Delete</Button>
          <Button>Cancel</Button>
        </Card.Actions>
      </Card>
    </SafeAreaView>
  );
}
export default ShowDetailProduct;
