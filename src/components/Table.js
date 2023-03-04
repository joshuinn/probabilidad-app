import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { Container } from '../../theme'
import { AntDesign } from '@expo/vector-icons';

import Text from './Text'
import NumberPad from './NumberPad';
import { BackHandler } from 'react-native';

const ModalKeyBoard = ({ onPress }) => {
    return (
        <KeyBoardContainer>
            <NumberPad onPress={onPress} />
        </KeyBoardContainer>
    )
}


export default Table = ({navigation}) => {
    const [dataTable, setDataTable] = useState([])
    const [numberOfRows, setNumberOfRows] = useState("0")
    const [isDisplayedKeyboard, setIsDisplayedKeyboard] = useState(false)

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            if (isDisplayedKeyboard) {
                setIsDisplayedKeyboard(false);
                return true;
            }
            return false;
        })
    })
    const handleKeyBoard = (item, index) => {
        setNumberOfRows(prev => {
            if (index != 10) {
                let newNumber = prev + item;
                if (parseInt(newNumber) == 0) {
                    return "0"
                }
                if (prev[0] == "0") {
                    return item;
                }
                return newNumber;
            }
            else {
                if (prev.length - 1 === 0) {
                    return "0";
                }
                return prev.slice(0, prev.length - 1)
            }
            return index != 10 ? prev + item :
                (prev.slice(0, prev.length - 1))
        });
    }

    if (!dataTable.length > 0) {
        return (
            <Container>
                <EmptyTitle>
                    <Text center large heavy>Parece que aún no hay tablas</Text>
                    <AntDesign name="table" size={24} color="white" />
                </EmptyTitle>
                <GetRowsContainer>
                    <Text>Establecer valor:</Text>
                    <InputRows onPress={() => { setIsDisplayedKeyboard(!isDisplayedKeyboard) }}>
                        <Text>
                            {numberOfRows}
                        </Text>
                    </InputRows>
                    {
                        parseInt(numberOfRows) > 0 &&
                        <GeterateTableButton>
                            <Text>Generar tabla</Text>
                        </GeterateTableButton>
                    }
                </GetRowsContainer>
                {isDisplayedKeyboard ? (
                    <ModalKeyBoard onPress={handleKeyBoard} />
                ) : null}
            </Container>
        )
    }
    return (
        <Container>
            <TableContainer data={dataTable}>
                <Text>Table</Text>
            </TableContainer>
        </Container>
    )
}

const TableContainer = styled.FlatList`

`;
const KeyBoardContainer = styled.View`
    position:absolute;
    bottom:0;
    background:#242424;
    padding:10px;
`;
const EmptyTitle = styled.View`
    flex-direction:row;
    justify-content:center;
    gap:20px;
    padding:10px 0;
`;

const InputRows = styled.Pressable`
    width:20%;
    padding:10px;
    background-color:#515151;
    border-radius:15px;
    justify-content:center;
    align-items:center;
`;

const GetRowsContainer = styled.View`
    flex-direction:row;
    align-items:center;
    justify-content:space-evenly;
    margin:10px;
`;

const GeterateTableButton = styled.TouchableOpacity`
    background-color:#5750f0;
    width:100px;
    padding:10px;
    border-radius:10px;
`;