import {  useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Container, Content, Icon } from "./styled";

import { Input } from "@components/Input";
import { AppError } from "@utils/AppError";
import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { groupCreate } from "@storage/group/groupCreate";
import { Alert } from "react-native";


export function NewGroup() {
    const navigation = useNavigation()
    const [group, setGroup] = useState('')

    async function handleNew() {
        try {
            if(group.trim().length === 0 ) {
                Alert.alert('Novo grupo', 'Informe o nome da turma.')
            }

            await groupCreate(group)
            navigation.navigate("players", {group }) 
            
        } catch (error) {
            if(error instanceof AppError) {
                Alert.alert('Novo grupo', error.message)
            }else {
                Alert.alert('Novo grupo', 'Não foi possível criar um novo grupo.')
                console.log(error)
            }
        }
    }


    return (
        <Container>
            <Header showBackButton />
            <Content>
                <Icon />

               <Highlight 
                 title="Nova turma"
                 subTitle="Crie a turma para adicionar as pessoas"
               />
               <Input  
                placeholder="Nome da turma"
                onChangeText={setGroup}
               />

               <Button 
                title="Criar"
                style={{marginTop: 20}}
                onPress={handleNew}
               />
            </Content>
        </Container>
    )
}