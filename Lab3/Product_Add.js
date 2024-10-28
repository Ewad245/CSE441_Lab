import {Button, Text, TextInput} from 'react-native';
import {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [price, setPrice] = useState('');
const [discountPercentage, setDiscountPercentage] = useState('');
const [rating, setRating] = useState('');
const [stock, setStock] = useState('');
const [brand, setBrand] = useState('');
const [category, setCategory] = useState('');
const [images, setImages] = useState('');
function displayAddScreen() {
  return (
    <SafeAreaView>
      <Text style={{fontWeight: 'bold', color: 'blue'}}>Add a product</Text>
      <Text style={{fontWeight: 'bold'}}>Title</Text>
      <TextInput
        placeholder="Enter title"
        onChangeText={text => setTitle({text})}></TextInput>
      <Text style={{fontWeight: 'bold'}}>Description</Text>
      <TextInput
        placeholder="Enter description"
        onChangeText={text => setDescription({text})}></TextInput>
      <Text style={{fontWeight: 'bold'}}>Price</Text>
      <TextInput
        placeholder="Enter price"
        onChangeText={text => setPrice({text})}></TextInput>
      <Text style={{fontWeight: 'bold'}}>Discount Percentage</Text>
      <TextInput
        placeholder="Enter Discount Percentage"
        onChangeText={text => setDiscountPercentage({text})}></TextInput>
      <Text style={{fontWeight: 'bold'}}>Rating</Text>
      <TextInput
        placeholder="Enter rating"
        onChangeText={text => setRating({text})}></TextInput>
      <button title="Submit" onClick={handleSubmit()}></button>
    </SafeAreaView>
  );
}
handleSubmit = () => {
  fetch('https://dummyjson.com/products/add', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
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
