import {useEffect, useState} from 'react';
import {FlatList, View, Text, Image, ScrollView} from 'react-native';
import {Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
function ShowList() {
  const [data, setData] = useState([]);
  const filePath = 'https://dummyjson.com/products/';
  useEffect(() => {
    // Alert.alert (filePath);
    fetch(filePath)
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
  });
  const renderItem = ({item}) => {
    return (
      <View style={{flex: 2, flexDirection: 'row', flexWrap: 'wrap'}}>
        <Image
          source={{uri: item.thumbnail}}
          style={{width: 100, height: 100}}
        />
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View>
            <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Price: {item.price}</Text>
            <Text style={{color: 'green'}}>
              Discount: {item.discountPercentage}% off
            </Text>
            <Text>Rating: {item.rating}</Text>
            <Text>Stock: {item.stock}</Text>
            <Text>Brand: {item.brand}</Text>
          </View>
          <View
            style={{
              flex: 3,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Button title="DETAIL" />
            <Button title="ADD" />
            <Button title="DELETE" />
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView>
      <FlatList data={data} renderItem={renderItem} />
    </SafeAreaView>
  );
}
export default ShowList;
