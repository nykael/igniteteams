import styled from "styled-components/native";

export const Container = styled.View`
    height: 100%;
    background-color: ${({theme}) => theme.COLORS.GRAY_600};

    padding: 24px;
`;

export const Form = styled.View`
    width: 100%;
    background-color: ${({theme}) => theme.COLORS.GRAY_700};
    flex-direction: row;


    justify-content: space-between;
    border-radius: 6px;
`;