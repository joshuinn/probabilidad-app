import React from 'react'
import { Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { FontAwesome5, MaterialIcons, AntDesign } from '@expo/vector-icons'
import { LineChart, } from 'react-native-chart-kit'

import { Container } from '../../theme'
import concepts from '../../concepts'
import Text from '../components/Text'

export default HomeScreen = () => {
  const renderConcept = ({ item }) => {
    return (
      <CardContainer>
        <CardTitle>
          <Text center large bold style={{ backgroundColor: item.color }}>{item.title}</Text>
          <MaterialIcons name={item.icon} size={24} color={item.colorItem} />
        </CardTitle>
        <CardInfo>
          <Text color="#727479">{item.concept}</Text>
        </CardInfo>
      </CardContainer>
    )
  }

  return (
    <Container>
      <CogContainer>
        <FontAwesome5 name="cog" size={24} color="#727479" />
      </CogContainer>
      <Text center title heavy margin_custom="0">Conceptos</Text>
      <Cards data={concepts} renderItem={renderConcept} />
    </Container>
  )
}

const Cards = styled.FlatList`
  padding:0 8px;
  margin-top:32px;
`;

const CardContainer = styled.TouchableOpacity`
  background-color:#292929;
  margin-bottom:16px;
  padding:16px;
  border-radius:8px;
`;
const CardTitle = styled.View`
  flex-direction:row;
  border-bottom-width:1px;
  border-bottom-color:#393939;
  justify-content:space-between;
  padding:10px 0;
`;

const CardInfo = styled.View`
  padding:10px 0;
`;

const CogContainer = styled.View`
  align-items:flex-end;
  margin:10px 10px 0 0;
`;
