import { useState } from "react";
import { FlatList } from "react-native";

import { Input } from "@components/Input";
import { Header } from "@components/Header";
import { Filter } from "@components/Filter";
import { Button } from "@components/Button";
import { Highlight } from "@components/Highlight";
import { ListEmpty } from "@components/ListEmpty";
import { ButtonIcon } from "@components/ButtonIcon";
import { PlayerCard } from "@components/PlayerCard";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

export function Players() {
    const [team, setTeam] = useState('Time A')
    const [players, setPlayers] = useState(['asasas', 'asasas22'])

    return (
        <Container>
            <Header showBackButton />

            <Highlight 
                title="Nome da turma"
                subTitle="adicione a galera e separe os times"
            />


            <Form>
                <Input 
                    placeholder="Nome do participante"
                    autoCorrect={false}
                /> 

                <ButtonIcon  
                    icon="add"
                />
            </Form>

            <HeaderList>

            <FlatList 
               data={['Time A', 'Time B']}
               keyExtractor={item => item}
               renderItem={({item}) => (
                   <Filter 
                   title={item}
                   isActive={item === team}
                   onPress={() => setTeam(item)}
                />
                )}
               horizontal
            />
            <NumberOfPlayers>{players.length}</NumberOfPlayers>
           </HeaderList>
            
            <FlatList 
                data={players}
                keyExtractor={item => item}
                renderItem={({item}) => (
                    <PlayerCard 
                      name={item}
                      onRemove={() => {}}
                    />
                )}
                ListEmptyComponent={() => (
                    <ListEmpty 
                        message="Não há pessoas nesse time"
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    { paddingBottom: 100},
                    players.length === 0 && {flexGrow: 1}
                ]}
            />

            <Button 
                title="Remover turma"
                type="SECONDARY"
            />

        </Container>
    )
}