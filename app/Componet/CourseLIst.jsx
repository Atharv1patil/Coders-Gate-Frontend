import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Api from '../Api';
import { Link } from 'expo-router';

const CourseList = ({ type }) => {
  const [course, setCourse] = useState([]);
  const [content, setContent] = useState([]);

  useEffect(() => {
    getCourseList();
    
  }, []);

  const getCourseList = async () => {
    try {
      const result = (await Api.getcourselist(type)).data;
      const resp = result.data.map((item) => ({
        id: item.id,
        name: item.name,
        type: item.Type,
        image: item.Image[0]?.url || null, // Get the URL of the first image in the Image array
        description: item.Description.trim(),
        url: item.videoUrl,
        topics: item.Topic.map((topic) => ({
          id: topic.id,
          name: topic.Topic_name.trim(),
        })),
      }));
      console.log('Resp:', resp);
      setCourse(resp);
    } catch (error) {
      console.error('Error fetching course list:', error);
    }
  };

  

  return (
    <View style={{ marginTop: 15 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5, marginLeft: 10 }}>
        {type} Courses
      </Text>
      {/* Content preview for debugging */}
     

      <FlatList
        data={course}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: './CourseDetails',
              params: {
                id: item.id,
                name: item.name,
                description: item.description,
                image: item.image,
                topics: JSON.stringify(item.topics),
                type: type,
                url: item.url
              },
            }}
            asChild
          >
            <TouchableOpacity
              style={{
                marginLeft: 10,
                marginTop: 10,
                backgroundColor: '#fff',
                padding: 10,
                borderRadius: 10,
                marginRight: 10,
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: 220, height: 120, borderRadius: 10 }}
              />
              <Text style={{ fontSize: 15, fontWeight: 'bold', textTransform: 'capitalize' }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          </Link>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default CourseList;
