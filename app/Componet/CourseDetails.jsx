import { View, Text, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Link } from 'expo-router';
import Toast from 'react-native-toast-message';
import { useEffect } from 'react';

const CourseDetails = () => {
  const { id, name, description, image, topics, type ,url} = useLocalSearchParams();

  const { name2 } = useLocalSearchParams();
  const { coursecompleted } = useLocalSearchParams();
 

  console.log('Topics:', topics);
  const parsedTopics = topics ? JSON.parse(topics) : [];
  console.log('Type:', type);
  console.log('ID:', id);
  console.log("url" ,url);
  console.log("name2 :" ,name);
  console.log("coursecompleted :" ,coursecompleted);

  useEffect(() => {
    if (coursecompleted) {
      showToast();
    }
    
  }, [coursecompleted,type]);


  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Course Completed!',
      text2: 'Congratulations, you have finished the course.',
    });
  };

  return (

     
    <FlatList
      data={parsedTopics}
      keyExtractor={(item) => item.id.toString()}
      
      ListHeaderComponent={
        <View>
          <Text
            style={{
              marginTop: 10,
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 5,
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            {name}
          </Text>
          <Toast/>
          <Text
            style={{
              marginBottom: 5,
              marginLeft: 15,
              fontSize: 15,
              color: 'grey',
            }}
          >
            by your PAL
          </Text>
          <Link
          href={{
            pathname: '/Componet/Videoplayer',
            params: { id: id, name: name, type: type,url:url,description:description,vidoname :name },
          }}
          asChild
        >
          <TouchableOpacity>
          <Image
            source={{ uri: image }}
            style={{
              width: Dimensions.get('screen').width * 0.96,
              height: 200,
              borderRadius: 10,
              marginLeft: 10,
              marginTop: 10,
              resizeMode: 'cover',
            }}
          />
          </TouchableOpacity>
          </Link>
          <Text
            style={{
              marginTop: 15,
              fontSize: 16,
              fontWeight: 'bold',
              marginBottom: 5,
              marginLeft: 10,
            }}
          >
            About this Course
          </Text>
          <Text
            numberOfLines={4}
            style={{
              marginBottom: 5,
              marginLeft: 15,
              fontSize: 15,
              color: 'grey',
            }}
          >
            {description}
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 16,
              fontWeight: 'bold',
              marginBottom: 5,
              marginLeft: 10,
            }}
          >
            Topics
          </Text>
        </View>
      }
      renderItem={({ item, index }) => {
        const linkPath = type === 'video' 
          ? '/Componet/Videoplayer' 
          : '/Componet/CourseChapter';
      
        return (
          <Link
          href={{
            pathname: linkPath,
            params: { id: item.id, name: item.name, type: type,url:url,description:description,vidoname :name ,name3:name},
          }}
          asChild
        >
          <TouchableOpacity>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                margin: 10,
                backgroundColor: Colors.white,
                padding: 20,
                borderRadius: 10,
                elevation: 2,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  marginRight: 10,
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'grey',
                }}
              >
                {index + 1}
              </Text>
              <Text
                style={{
                  marginRight: 10,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
              >
                {item.name}
              </Text>
              <FontAwesome
                name="play-circle"
                size={24}
                color="crimson"
                style={{ marginLeft: 'auto' }}
              />
            </View>
          </TouchableOpacity>
        </Link>
        );
      }}
      
    />
  );
};

export default CourseDetails;
