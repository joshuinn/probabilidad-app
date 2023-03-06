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
          <Text style={{ color: "#fff", backgroundColor: item.titlebgColor, padding: 10, borderRadius: 10 }} >{item.title}</Text>
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
      <SearchContainer>
        <AntDesign name="search1" size={18} color="#5196f4" />
        <Search placeholder="Buscar dato" />
      </SearchContainer>
      <Text center title heavy>Conceptos</Text>
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

const SearchContainer = styled.View`
  background-color:#3d3d3d;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  padding:0 8px;
  border-radius:6px
  margin:16px 0 10px 10px;
  width:70%;
`;

const Search = styled.TextInput`
  flex:1;
  padding:8px 16px;
  color:#dbdbdb;
  width:80%;
  
`;