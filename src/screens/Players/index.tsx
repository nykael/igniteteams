import { useEffect, useState, useRef } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import { AppError } from "@utils/AppError";


import { Input } from "@components/Input";
import { Header } from "@components/Header";
import { Filter } from "@components/Filter";
import { Button } from "@components/Button";
import { Loading } from "@components/Loading";
import { Highlight } from "@components/Highlight";
import { ListEmpty } from "@components/ListEmpty";
import { ButtonIcon } from "@components/ButtonIcon";
import { PlayerCard } from "@components/PlayerCard";

import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";
import { PlayerRemoveByGroup } from "@storage/player/PlayerRemoveByGroup";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { groupRemoveByname } from "@storage/group/groupRemoveByName";


type RouteParams = {
    group: string;
}

export function Players() {
    const [isLoading, setIsLoading] = useState(true)
    const [newPlayerName, setNewPlayerName] = useState('')
    const [team, setTeam] = useState('Time A')
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

    const navigation = useNavigation()

    const route = useRoute()
    const { group } = route.params as RouteParams

    const newPlayerNameInputRef = useRef<TextInput>(null)

    async function handleAddPlayer() {
        if(newPlayerName.trim().length === 0) {
            return Alert.alert('Nova pessoa', 'Informe o nomde da pessoa para adicionar')
        }

        const newPlayer = {
            name: newPlayerName,
            team,
        }

        try {
            await playerAddByGroup(newPlayer, group)

            newPlayerNameInputRef.current?.blur();

            setNewPlayerName('')
            fetchPlayersByTeam();
        } catch (error) {
            if(error instanceof AppError) {
                Alert.alert('Nova pessoa', error.message)
            }else {
                console.log(error)
                Alert.alert('Nova pessoa','N??o foi poss??vel adicionar')
            }
        }
    }

    async function fetchPlayersByTeam() {
        try {
            setIsLoading(true)

            const playersByTeam = await playersGetByGroupAndTeam(group, team);
            setPlayers(playersByTeam);
            setIsLoading(false)
        } catch (error) {
            console.log(error);
            Alert.alert('Nova pessoa','N??o foi poss??vel carregar as pessoas filtradas do time selecionado')
        }
    }

    async function handlePlayerRemove(playerName: string){
        try {
            await PlayerRemoveByGroup(playerName, group)
            fetchPlayersByTeam()

        } catch (error) {
            console.log(error)
            Alert.alert('Remover pessoa', 'N??o foi poss??vel remover essa pessoa')
        }
    }

    async function groupRemove() {
        try {
            await groupRemoveByname(group)
            navigation.navigate('groups')
        } catch (error) {
            console.log(error)
            Alert.alert('Remover Grupo', 'N??o foi poss??vel remover o grupo')
        }
    }

    async function handleGroupRemove(){
        Alert.alert('Remover','Deseja remover o grupo ?', 
        [
            {text: 'N??o', style:'cancel'},
            {text: 'Sim', onPress: () => groupRemove()}
        ])
    }

    useEffect(() => {
        fetchPlayersByTeam()
    },[team])


    return (
        <Container>
            <Header showBackButton />

            <Highlight 
                title={group}
                subTitle="adicione a galera e separe os times"
            />


            <Form>
                <Input 
                    inputRef={newPlayerNameInputRef}
                    onChangeText={setNewPlayerName}
                    value={newPlayerName}
                    placeholder="Nome do participante"
                    autoCorrect={false}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType="done"
                /> 

                <ButtonIcon  
                    icon="add"
                    onPress={handleAddPlayer}
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

           {
            isLoading ? <Loading/> : 
                <FlatList 
                    data={players}
                    keyExtractor={item => item.name}
                    renderItem={({item}) => (
                        <PlayerCard 
                        name={item.name}
                        onRemove={() => handlePlayerRemove(item.name)}
                        />
                    )}
                    ListEmptyComponent={() => (
                        <ListEmpty 
                            message="N??o h?? pessoas nesse time"
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[
                        { paddingBottom: 100},
                        players.length === 0 && {flexGrow: 1}
                    ]}
                />
            }

            <Button 
                title="Remover turma"
                type="SECONDARY"
                onPress={handleGroupRemove}
            />

        </Container>
    )
}