import { View, Text , Image, Dimensions} from 'react-native'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Api from '../Api'
import { FlatList } from 'react-native'

const Slider = () => {
    const [sliders, setsliders] = useState([]);

    useEffect(() => {
        const getslider = async () => {
          const result = (await Api.getSlider()).data;
          console.log("Result : ",result);

          const resp = result.data.map((item) => {
            const { id, Image: image } = item; // Destructure to access Image
            return {
                id,
        imageName: image.name, // Access image name
        url: image.url
            };
          });
  
          console.log('Resp I: ', resp);
          setsliders(resp);
        };
        getslider();
      }, [])
      
  return (
    <View style={{marginTop: 20}}>
     <FlatList 
        data={sliders}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View>
           <Image source={{ uri: item.url }} style={{ width:Dimensions.get('screen').width*0.96, height: 200,  borderRadius: 10,  marginRight: 10, marginLeft: 8}} />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

export default Slider