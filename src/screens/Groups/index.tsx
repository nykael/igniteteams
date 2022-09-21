import React, { useState } from 'react';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';

import { Container } from './styles';
import { FlatList } from 'react-native';
import { ListEmpty } from '@components/ListEmpty';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([])

  return (
    <Container>
       <Header />

       <Highlight 
         title="Turmas" 
         subTitle="Jogue com a sua turma"
       />
       
       <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <GroupCard  
            title={item}/>
        )}
        contentContainerStyle={groups.length === 0 && {height: 400,}}
        ListEmptyComponent={() => (
        <ListEmpty message="Que tal cadastrar a primeira turma ?" />
        )}
       />
    </Container>

  );
}
