import { Container, Message } from './styled'

interface Props {
    message: string;
}

export function ListEmpty({message} : Props) {
    return(
        <Container>
            <Message>{message}</Message>
        </Container>
    )
}