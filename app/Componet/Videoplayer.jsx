import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const Videoplayer = () => {
  const { name, id, url, description, vidoname } = useLocalSearchParams();

  console.log("All data:", id, url, description, vidoname, name);

  // Extract the video ID from the YouTube URL
  const extractVideoId = (youtubeUrl) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*v=([^&\s]+)/;
    const match = youtubeUrl.match(regex);
    return match ? match[1] : null; // Return video ID or null if not found
  };

  const videoId = extractVideoId(url);
  console.log("Extracted Video ID:", videoId);

  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <ScrollView>
    <View style={styles.container}>
      <LinearGradient
        colors={['#4e54c8', '#8f94fb']}
        style={styles.gradientBackground}
      >
        {/* Title Section */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>{vidoname || "Video Title"}</Title>
            <Paragraph style={styles.description}>
              {description || "No description available for this video."}
            </Paragraph>
          </Card.Content>
        </Card>

        {/* Video Player */}
        <View style={styles.videoContainer}>
          {videoId ? (
            <YoutubePlayer
              height={220}
              width={width - 40}
              play={playing}
              videoId={videoId}
              onChangeState={onStateChange}
            />
          ) : (
            <Paragraph style={styles.errorText}>Invalid YouTube URL</Paragraph>
          )}
        </View>

        {/* Play/Pause Button */}
        <Button
          mode="contained"
          onPress={togglePlaying}
          style={styles.playButton}
          labelStyle={styles.buttonLabel}
          icon={playing ? 'pause' : 'play'}
        >
          {playing ? "Pause" : "Play"}
        </Button>
      </LinearGradient>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    padding: 20,
  },
  card: {
    marginBottom: 20,
    borderRadius: 15,
    elevation: 5,
    backgroundColor: '#ffffffcc',
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'justify',
    lineHeight: 22,
  },
  videoContainer: {
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    backgroundColor: '#000',
  },
  playButton: {
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: '#6c63ff',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  errorText: {
    textAlign: 'center',
    color: '#ff0000',
    fontSize: 16,
    marginVertical: 10,
  },
});

export default Videoplayer;
