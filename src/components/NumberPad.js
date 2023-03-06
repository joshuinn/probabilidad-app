import React, { useMemo } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import Text from './Text';
import { View, StyleSheet, TouchableOpacity } from 'react-native'

export default NumberPad = ({ onPress }) => {
    const buttons = useMemo(() => {
        return (
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
                <MaterialIcons name="keyboard-backspace" size={24} />
            ])
    }, []
    )
    return (
        <View style={styles.container}>
            {buttons.map((item, index) => {
                return (
                    <TouchableOpacity
                        style={styles.button}
                        key={index}
                        onPress={() => onPress(item, index)}>
                        <Text large heavy>
                            {item}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: 0,
        marginHorizontal: 30
    },
    button: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: "#ffffff20",
    }
})