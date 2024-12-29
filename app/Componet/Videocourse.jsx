import { View, Text, FlatList, Image, TouchableOpacity  } from 'react-native'
import React, { useEffect } from 'react'
import Api from '../Api'
import { useState } from 'react'
import { Link } from 'expo-router'
const Videocourse = () => {

 const [video, setvideo] = useState([]);

    useEffect(() => {
        getVideocourse();
    }, [])

    const getVideocourse = async () => {
       const result = (await Api.getVideocourse()).data;
       console.log("Result video : ",result);

       const resp = result.data.map((item) => {
           return {
            id: item.id,
            title: item.title,
            description: item.Description[0]?.children[0]?.text || null,
            url: item.videoUrl,
            image: item.image[0]?.url || null,
            videotopic: item.videotopic.map(topic => ({
              id: topic.id,
              name: topic.name
          }))
           }
       });
       console.log ('Resp V: ', resp);
       setvideo(resp);
    }


  return (
    <View style={{marginTop: 15}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 5, marginLeft: 10}}>Video Course</Text>

    <FlatList
        data={video}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
           
          <Link href={{pathname: './CourseDetails',
            params: {id: item.id, name: item.title, description: item.description, image: item.image, url: item.url, topics: JSON.stringify(item.videotopic),type: 'video'},
          }} asChild>
          <TouchableOpacity>
          <View style={{marginLeft: 10}}>
            <Image source={{ uri: item.image }} style={{ width: 220, height: 120,  borderRadius: 10, marginRight: 10}}  />
            {/* <Text >{item.title}</Text>
            <Text >{item.description}</Text> */}
          </View>
          </TouchableOpacity>
          </Link>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}

export default Videocourse