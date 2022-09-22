import {  useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Container, Content, Icon } from "./styled";

import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Highlight } from "@components/Highlight";


export function NewGroup() {
    const navigation = useNavigation()
    const [group, setGroup] = useState('')

    function handleNew() {
        navigation.navigate("players", {group })
    }


    return (
        <Container>
            <Header showBackButton />
            <Content>
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