
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';

export default function Community() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'Sarah',
      avatar: '🏃‍♀️',
      content: 'Just completed a 5K run! Personal best time 💪',
      likes: 12,
      comments: 3,
      timestamp: '2h ago'
    },
    {
      id: 2,
      user: 'Mike',
      avatar: '🏋️‍♂️',
      content: 'Hit a new deadlift PR today: 300lbs! 🎯',
      likes: 24,
      comments: 5,
      timestamp: '4h ago'
    }
  ]);
  const [newPost, setNewPost] = useState('');

  const addPost = () => {
    if (newPost.trim()) {
      setPosts([{
        id: Date.now(),
        user: 'You',
        avatar: '😊',
        content: newPost,
        likes: 0,
        comments: 0,
        timestamp: 'Just now'
      }, ...posts]);
      setNewPost('');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#4ECDC4', '#556270']}
        style={styles.header}
      >
        <Text style={styles.headerText}>Community Feed</Text>
      </LinearGradient>

      <View style={styles.postInput}>
        <TextInput
          style={styles.input}
          placeholder="Share your fitness journey..."
          value={newPost}
          onChangeText={setNewPost}
          multiline
        />
        <TouchableOpacity style={styles.shareButton} onPress={addPost}>
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
      </View>

      {posts.map(post => (
        <Animated.View 
          key={post.id} 
          entering={FadeInUp} 
          style={styles.post}
        >
          <View style={styles.postHeader}>
            <Text style={styles.avatar}>{post.avatar}</Text>
            <Text style={styles.username}>{post.user}</Text>
            <Text style={styles.timestamp}>{post.timestamp}</Text>
          </View>
          <Text style={styles.content}>{post.content}</Text>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialIcons name="favorite-border" size={24} color="#666" />
              <Text style={styles.actionText}>{post.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialIcons name="chat-bubble-outline" size={24} color="#666" />
              <Text style={styles.actionText}>{post.comments}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  postInput: {
    padding: 15,
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 15,
  },
  input: {
    minHeight: 80,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 10,
  },
  shareButton: {
    backgroundColor: '#4ECDC4',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  shareButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  post: {
    backgroundColor: 'white',
    margin: 15,
    marginTop: 0,
    padding: 15,
    borderRadius: 15,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    fontSize: 24,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    flex: 1,
  },
  timestamp: {
    color: '#666',
    fontSize: 12,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
  actions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    marginLeft: 5,
    color: '#666',
  },
});
