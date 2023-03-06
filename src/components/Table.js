import React, { memo, useEffect, useState } from 'react'
import { View, StyleSheet, SafeAreaView, Pressable } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { BackHandler } from 'react-native';
import Text from './Text'
import NumberPad from './NumberPad'
import * as operations from './operations'

const ModalKeyBoard = ({ onPress }) => {
    return (
        <View style={styles.keyboard}>
            <NumberPad onPress={onPress} />
        </View>
    )
}
const getKeyboardPressed = (prev, index, item) => {
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
        if (prev.length - 1 <= 0) {
            return "0";
        }
        return prev.slice(0, prev.length - 1)
    }
}

const RenderTable =
    memo(({ data, setIsDisplayedKeyboard, whoItemPressed, setWhoItemPressed, isDisplayedKeyboard }) => {
        let getFA = operations.getAcumulateFrecuency(data[1]);
        let getFR = operations.getRelativeFrecuency(getFA[getFA.length - 1], data[1]);
        const RenderData = memo(({ item, index }) => {
            return (
                <Pressable style={styles.row} onLongPress={() => {
                    console.log("pressed!");
                }} delayPressIn={500}>
                    <Pressable
                        style={[styles.column,
                        { backgroundColor: whoItemPressed[0] ? (whoItemPressed[1] === index ? "#303030" : null) : "transparent" }]}
                        onPress={() => {
                            setWhoItemPressed([true, index])
                            setIsDisplayedKeyboard([true, "modData"])
                        }
                        }
                    >
                        <Text>{item}
                        </Text>
                    </Pressable>
                    <Pressable
                        style={[styles.column,
                        { backgroundColor: !whoItemPressed[0] ? (whoItemPressed[1] === index ? "#515151" : null) : "transparent" }]}
                        onPress={() => {
                            setWhoItemPressed([false, index])
                            setIsDisplayedKeyboard([true, "modData"])
                        }
                        }
                    >
                        <Text>{data[1][index]}</Text></Pressable>
                    <View style={styles.column}><Text>{getFA[index]}</Text></View>
                    <View style={styles.column}><Text>{getFR[index]}</Text></View>
                </Pressable>
            )
        })
        return (
            <ScrollView style={{ flex: 1, marginBottom: isDisplayedKeyboard[0] ? 300 : 0 }}>
                {data[0].map((item, index) => {
                    return <RenderData key={index} item={item} index={index} />
                })}
            </ScrollView>
        )
    })

export default Table = ({ navigation }) => {
    const [dataTable, setDataTable] = useState([[], []])
    const [dataInput, setDataInput] = useState("0");
    const [frecuencyInput, setFrecuencyInput] = useState("0")
    const [isDisplayedKeyboard, setIsDisplayedKeyboard] = useState([false, "who"])
    const [whoItemPressed, setWhoItemPressed] = useState([false, "index"]);
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            if (isDisplayedKeyboard[0]) {
                setIsDisplayedKeyboard([false, "who"]);
                setWhoItemPressed([false, false]);
                return true;
            }
            return false;
        })
    })
    const handleKeyBoard = (item, index) => {
        switch (isDisplayedKeyboard[1]) {
            case "setF":
                setFrecuencyInput(prev => {
                    return getKeyboardPressed(prev, index, item)
                })
                return
            case "setData":
                setDataInput(prev => {
                    return getKeyboardPressed(prev, index, item)
                })
                return
            case "modData":
                let NewArray
                if (whoItemPressed[0]) {
                    NewArray = dataTable[0].map((data, i) => {
                        if (i === whoItemPressed[1]) {
                            return getKeyboardPressed(data.toString(), index, item)
                        }
                        return data
                    })
                    setDataTable([NewArray, [...dataTable[1]]])
                } else {
                    NewArray = dataTable[1].map((data, i) => {
                        if (i === whoItemPressed[1]) {
                            return getKeyboardPressed(data.toString(), index, item)
                        }
                        return data
                    })
                    setDataTable([[...dataTable[0]], NewArray])
                }
                return;
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text center title black>Tabla</Text>
            <View style={styles.getDataContainer}>
                <View>
                    <Text center>Ingresa N. del dato: </Text>
                    <Pressable
                        style={[styles.inputdata,
                        { backgroundColor: isDisplayedKeyboard[1] === "setData" ? '#303030' : "#515151" }]}
                        onPress={() => {
                            setIsDisplayedKeyboard([true, "setData"])
                            setWhoItemPressed([false, false])
                        }}
                    >
                        <Text center heavy>{dataInput}</Text>
                    </Pressable>
                </View>
                <View>
                    <Text center>Su frecuencia</Text>
                    <Pressable
                        style={[styles.inputdata,
                        { backgroundColor: isDisplayedKeyboard[1] === "setF" ? '#303030' : "#515151" }]}
                        onPress={() => {
                            setIsDisplayedKeyboard([true, "setF"])
                            setWhoItemPressed([false, false])
                        }}
                    >
                        <Text center heavy>{frecuencyInput}</Text>
                    </Pressable>
                </View>
                <View>
                    <Pressable style={styles.button} onPress={() => {
                        setDataTable([[...dataTable[0], parseInt(dataInput)],
                        [...dataTable[1], parseInt(frecuencyInput)]])
                        setDataInput("0")
                        setFrecuencyInput("0")
                    }}>
                        <Text>Agregar</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.table}>
                <View style={styles.row}>
                    <View style={styles.column} ><Text center heavy large>Dato</Text></View>
                    <View style={styles.column}><Text center heavy large>Frecuecia Absoluta</Text></View>
                    <View style={styles.column}><Text center heavy medium>Frecuecia Absoluta acumulada</Text></View>
                    <View style={styles.column}><Text center heavy large>Frecuecia relativa</Text></View>
                </View>
                {
                    <RenderTable
                        data={dataTable}
                        setIsDisplayedKeyboard={setIsDisplayedKeyboard}
                        whoItemPressed={whoItemPressed}
                        setWhoItemPressed={setWhoItemPressed}
                        isDisplayedKeyboard={isDisplayedKeyboard}
                    />
                }
            </View>
            {
                isDisplayedKeyboard[0] ? (
                    <ModalKeyBoard onPress={handleKeyBoard} />
                ) : null
            }
        </SafeAreaView >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e1e1e',
        paddingTop: 32
    },
    column: {
        borderColor: "#000",
        borderWidth: 1,
        width: "25%",
        justifyContent: 'center',
        padding: 5
    },
    row: {
        flexDirection: "row"
    },
    inputdata: {
        backgroundColor: "#515151",
        padding: 10,
        width: 120,
        borderRadius: 10,
    },
    button: {
        width: 100,
        backgroundColor: "#5750f0",
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 15,
        padding: 10
    },
    keyboard: {
        position: "absolute",
        backgroundColor: '#242424',
        bottom: 0
    },
    getDataContainer: {
        flexDirection: "row",
        gap: 10,
        alignItems: 'center',
        padding: 10
    },
    table: {
        flex: 1,
        alignItems: "center",
    }
})


