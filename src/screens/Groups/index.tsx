import { useState, useCallback } from 'react';
import { Alert, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';

import { Container } from './styles';
import { groupsGetAll } from '@storage/group/groupGetAll';
import { Loading } from '@components/Loading';


export function Groups() {
  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGroups] = useState<string[]>([])
  const navigation = useNavigation()

  function handleNewGroup() {
    navigation.navigate('new')
  }

  async function fetchGroups() {
    try {
      setIsLoading(true)

      const data = await groupsGetAll()
      setGroups(data)
      setIsLoading(false)
    } catch (error) {
      Alert.alert('Turmas', 'Não foi possível carregar as turmas ')
      console.log(error)
    }
  }

  function handleOpenGroup(group:string) {
    navigation.navigate('players', { group })
  }

  useFocusEffect(useCallback(() => {
    fetchGroups()
  }, []));

  return (
    <Container>
       <Header />

       <Highlight 
         title="Turmas" 
         subTitle="Jogue com a sua turma"
       />

       { 
        isLoading ? <Loading /> : 
          <FlatList 
            data={groups}
            keyExtractor={item => item}
            renderItem={({item}) => (
              <GroupCard  
                title={item}
                onPress={() => handleOpenGroup(item)}  
              />
            )}
            contentContainerStyle={groups.length === 0 && {height: 400,}}
            ListEmptyComponent={() => (
            <ListEmpty message="Que tal cadastrar a primeira turma ?" />
            )}
            showsVerticalScrollIndicator={false}
          />
       } 

       <Button 
        title='Criar nova turma'
        onPress={handleNewGroup}
       />
    </Container>

  );
}

