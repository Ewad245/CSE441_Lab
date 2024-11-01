import {Button, TextInput, Alert, View, FlatList, Image} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Avatar, Card, Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {useEffect, useState} from 'react';
function ProductSearch() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  let filePath = 'https://dummyjson.com/products';
  const searchProduct = async () => {
    if (value != '')
      filePath = `https://dummyjson.com/products/search?q=${value}`;
    await fetch(filePath)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(d => {
        setData(d.products);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };
  const renderItem = ({item}) => {
    return (
      <View style={styles.CardBorderontainer}>
        <Card>
          <Card.Content>
            <Text variant="titleMedium">Product Detail</Text>
          </Card.Content>
          <Card.Cover
            source={{uri: item.thumbnail}}
            style={{borderRadius: 8}}
          />
          <Card.Content>
            <Text variant="titleLarge">Title: {item.title}</Text>
            <Text variant="bodySmall">Description: {item.description}</Text>
            <Text variant="bodySmall">Price: {item.price}</Text>
            <Text variant="bodySmall">Discount: {item.discount}</Text>
            <Text variant="bodySmall">Rating: {item.rating}</Text>
            <Text variant="bodySmall">Stock: {item.stock}</Text>
            <Text variant="bodySmall">Brand: {item.brand}</Text>
            <Text variant="bodySmall">Category: {item.category}</Text>
          </Card.Content>
        </Card>
      </View>
    );
  };
  return (
    <View>
      <View>
        <Text>Search Products</Text>
        <TextInput
          placeholder="Enter your name product"
          onChangeText={text => setValue(text)}></TextInput>
        <Button title="SEARCH" onPress={searchProduct} />
      </View>
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
}
const styles = StyleSheet.create({
  CardBorderontainer: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
    padding: 10,
  },
});
export default ProductSearch;
