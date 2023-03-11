import React from 'react'
import styled from 'styled-components'
import { Container } from '../../theme'

import Text from '../components/Text'
import Table from '../components/Table'


const TableScreen = ({navigation}) => {
    return (
        <Container>
            <Table navigation={navigation}  />
        </Container>
    )
}

export default TableScreen