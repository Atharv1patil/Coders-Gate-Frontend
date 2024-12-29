import { View, Text, FlatList, Dimensions, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Redirect, useLocalSearchParams } from 'expo-router';
import Api from '../Api';
import { FontAwesome5 } from '@expo/vector-icons';
import { Link } from 'expo-router';
import Progress from './Progress';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import * as Clipboard from 'expo-clipboard';


const CourseChapter = () => {
  const { id, name, type,name3,vidoname} = useLocalSearchParams();
  const [content, setContent] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const chapterRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const { width, height } = Dimensions.get('window');
  const router = useRouter();
  console.log("name",name3);
  console.log("videoname",vidoname);

  useEffect(() => {
    
    getCourseContent();
  }, []);

  const getCourseContent = async () => {
    try {
      const response = (await Api.coursecontent(type, id)).data;
      const resp = response.data.map((item) => ({
        id: item.id,
        name: item.name,
        type: item.Type,
        description: item.Description.trim(),
        topics: item.Topic.filter((topic) => topic.Topic_name.trim() === name)
          .map((topic) => ({
            id: topic.id,
            name: topic.Topic_name.trim(),
            content: topic.content.map((lesson) => ({
              id: lesson.id,
              title: lesson.title.trim(),
              info: lesson.info_course.trim(),
              Example:lesson.Example,
            }))
          }))
      }));
  
      // Flatten the topics and lessons into one array
      const flatListData = resp.flatMap((course) => {
        return course.topics.flatMap((topic) => {
          return topic.content.map((lesson) => ({
            courseId: course.id,
            courseName: course.name,
            topicId: topic.id,
            topicName: topic.name,
            lessonId: lesson.id,
            lessonTitle: lesson.title,
            lessonInfo: lesson.info,
            lessonExample: lesson.Example
          }));
        });
      });
  
      console.log('FlatList Data:', flatListData); // Log the final flattened data
  
      setContent(flatListData);
    } catch (error) {
      console.error('Error fetching course content:', error);
    }
  };
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Congratulations! 🎉🥳🎊🎁',
      text2: 'You are one step ahead from achieving your goal. ',
      text1Style: {
        fontSize: 16,  // Adjust font size for the title
      },
      text2Style: {
        fontSize: 12,  // Adjust font size for the message
      },
      autoHide: true,
      position: 'top',
      
      
    });
  };
  
 

  const copycode = () => {
    
    Toast.show({
      type: 'info',
      text1: 'Code Copied!',
      text1Style: {
        fontSize: 16,  // Adjust font size for the title
      },
      autoHide: true,
      position: 'top',
      visibilityTime: 1000
     
    })
  };
  
  

  const renderItem = ({ item, index }) => (
    
    <View
      style={{
        padding: 15,
        marginBottom: 10,
        width: width * 0.9,
        margin: 15,
      }}
    >
      
      <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{item.lessonTitle}</Text>
      <Text style={{ fontSize: 15, marginTop: 10 }}>{item.lessonInfo}</Text>
      <View style={{ margin: 10, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity
          onPress={() => {
           Clipboard.setString(item.lessonExample);
          //  copycode();
           ToastAndroid.show('Code Copied!', ToastAndroid.SHORT);
        }}
        style={{ display: 'flex', flexDirection: 'column-reverse', marginLeft: 'auto' , borderRadius: 10, padding: 10, alignItems: 'center', justifyContent: 'center' }}
        >
      <FontAwesome5 name="clipboard-list" size={24} color="black"  />
      </TouchableOpacity>

      <Text
        style={{
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 10,
          padding: 20,
          width: width * 0.85,
          backgroundColor: 'black',
          color: 'white',
          fontSize: 15,
          marginBottom: 10,
          textAlign: 'left',
        }}
      >
        {item.lessonExample}
      </Text>
      
      

      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>
      <Progress progress={progress} />
      
      <FlatList
        data={content}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        style={{
          marginTop: 10,
          marginBottom: 10,
          marginLeft: 0,
          marginRight: 10,
          padding: 1,
          borderRadius: 7,
        }}
        ref={chapterRef}
        keyExtractor={(item) => item.lessonId.toString()}
        onScroll={(event) => {
          const offsetX = event.nativeEvent.contentOffset.x;
          const currentIndex = Math.round(offsetX / width); // Calculate index
          setCurrentIndex(currentIndex);
          setProgress((currentIndex + 1) / content.length);
           // Update the index
        }}
        scrollEventThrottle={200}
        renderItem={renderItem}
      /> 
      <Toast style={{ zIndex: 9999 }}/>
       
     
     {content.length === 0 ? (
      <View style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', height: height * 0.8 }}>
      <Text style={{ textAlign: 'center', fontSize: 24,fontWeight: 'bold'  }}>No content available</Text>
      </View>
    ) : (
      <View>
      {/* Link to Compiler */}
      <View style={{ marginBottom: height * 0.1 }}>
        <Link href={{ pathname: 'Componet/Compliler',params: {videoname:vidoname}}} asChild>
          <TouchableOpacity
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              paddingVertical: 15,
              paddingHorizontal: 12,
              margin: 15,
              backgroundColor: '#007BFF',
              borderWidth: 0,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 3,
              elevation: 5,
              width: width * 0.9,
             
            }}
            activeOpacity={0.8}
          >
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                color: 'white',
                textAlign: 'center',
              }}
            >
              Go to Compiler
            </Text>
            <FontAwesome5 name="play-circle" size={24} color="crimson" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </Link>
      </View>

      {/* Next Button */}
      <View style={{ marginBottom: height * 0.05 }}>
        <TouchableOpacity
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              marginHorizontal: width * 0.05,
              backgroundColor: '#007BFF',  // Default color
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 3,
              elevation: 5,
              position: 'absolute',
              bottom: height * 0.20,
              width: width * 0.9,
            },
            isProcessing && {
              backgroundColor: '#A0A0A0',  // Change color when disabled
              shadowOpacity: 0,             // Remove shadow when disabled
              elevation: 0,                // Remove elevation when disabled
            }
          ]}
          disabled={isProcessing}
          onPress={() => {
            try{
            // Check if the next index is within bounds
            
            if (chapterRef.current && currentIndex + 1 < content.length) {
             
              chapterRef.current.scrollToIndex({ index: currentIndex + 1, animated: true });
            } else if(currentIndex+1>=content.length){
                
              showToast();
              if (isProcessing) return; // If already processing, do nothing

               setIsProcessing(true); 

              setTimeout(() => {
                router.back(
                  {
                    params: {
                      coursecompleted: true,
                      name2: name,
                    },
                  },
                );
                setIsProcessing(false); 
              } ,2000);

            }
          } catch (error) {
            console.log('Error navigating to next chapter:', error);
          }
        }
        }
        >
          <Text
            style={{
              fontSize: 20,
              color: 'white',
              textAlign: 'center',
              paddingVertical: height * 0.015,
              fontWeight: 'bold',
            }}
          >
            {isProcessing ? 'Processing...' : 'Next'}
          </Text>
          <FontAwesome5 name="arrow-right" size={24} color="white" style={{ marginLeft: 10 }} />
        </TouchableOpacity>
        
      </View>
      </View>
      
    )}
    </ScrollView>
    
  );
};

export default CourseChapter;
