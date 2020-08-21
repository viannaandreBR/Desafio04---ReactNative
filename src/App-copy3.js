import React, {useEffect, useState} from "react";
import api from './services/api';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";



export default function App() {
  const [repos, setRepos] = useState([]);

  useEffect(()=>{
    api.get('/repositories').then(response=>{
      setRepos(response.data);
    })
  }, []);

  async function handleLikeRepository(id) {
    await api.post(`/repositories/${id}/likes`);

    const repoIndex = repos.findIndex(repo => repo.id === id);

    //repos[repoIndex].likes++;

    setRepos([...repos])
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data = {repos}
          keyExtractor = {repo => repo.id}
          renderItem = {({item:repo})=>(          
            <View style={styles.repositoryContainer}>
            <Text style={styles.repository}>{repo.title}</Text>
            
          <View style={styles.techsContainer}>
            {repo.techs.map(tech=>
              <Text style={styles.tech} key={tech}>
                {tech}
              </Text>
              )}
          </View>

          <View style={styles.likesContainer}>
            <Text
              style={styles.likeText}
              // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
              testID={`repository-likes-${repo.id}`}
            >
              {repo.likes} curtidas
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(repo.id)}
            // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
            testID={`like-button-${repo.id}`}
          >
            <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity>
        </View>
        )}
        ></FlatList>

      </SafeAreaView>
    </>
  );
}