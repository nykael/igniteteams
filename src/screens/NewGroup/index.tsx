import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Highlight } from "@components/Highlight";
import { Container, Content, Icon } from "./styled";


export function NewGroup() {
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
               />

               <Button 
                title="Criar"
                style={{marginTop: 20}}
               />
            </Content>
        </Container>
    )
}