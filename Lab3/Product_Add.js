import { Button, Text, TextInput, Alert, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
function Product_Add() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [rating, setRating] = useState('');
  const [stock, setStock] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState('');
  handleSubmit = () => {
    fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title,
        description: description,
        price: price,
        discountPercentage: discountPercentage,
        rating: rating,
        stock: stock,
        brand: brand,
        category: category,

        images: images,
      }),
    })
      .then(res => res.json())
      .then(console.log);
    Alert.alert('Add sucessfull');
  };
  return (
    <View>
      <View style={{ marginBottom: '1em' }}>
        <Text style={{ fontWeight: 'bold', color: 'blue' }}>Add a product</Text>
        <Text style={{ fontWeight: 'bold' }}>Title</Text>
        <TextInput
          placeholder="Enter title"
          onChangeText={text => setTitle(text)}></TextInput>
        <Text style={{ fontWeight: 'bold' }}>Description</Text>
        <TextInput
          placeholder="Enter description"
          onChangeText={text => setDescription(text)}></TextInput>
        <Text style={{ fontWeight: 'bold' }}>Price</Text>
        <TextInput
          placeholder="Enter price"
          onChangeText={text => setPrice(text)}></TextInput>
        <Text style={{ fontWeight: 'bold' }}>Discount Percentage</Text>
        <TextInput
          placeholder="Enter Discount Percentage"
          onChangeText={text => setDiscountPercentage(text)}></TextInput>
        <Text style={{ fontWeight: 'bold' }}>Rating</Text>
        <TextInput
          placeholder="Enter rating"
          onChangeText={text => setRating(text)}></TextInput>
        <Text style={{ fontWeight: 'bold' }}>Stock</Text>
        <TextInput
          placeholder="Enter Enter stock"
          onChangeText={text => setStock(text)}></TextInput>
        <Text style={{ fontWeight: 'bold' }}>Brand</Text>
        <TextInput
          placeholder="Enter brand"
          onChangeText={text => setBrand(text)}></TextInput>
        <Text style={{ fontWeight: 'bold' }}>Category</Text>
        <TextInput
          placeholder="Enter category"
          onChangeText={text => setCategory(text)}></TextInput>
        <Text style={{ fontWeight: 'bold' }}>Images</Text>
        <TextInput
          placeholder="Enter images URL(s)"
          onChangeText={text => setImages(text)}></TextInput>
      </View>
      <Button title="Submit" onPress={handleSubmit}></Button>
    </View>
  );
}
export default Product_Add;
