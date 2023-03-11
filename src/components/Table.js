import React, { memo, useEffect, useState } from 'react'
import { View, StyleSheet, SafeAreaView, Pressable, BackHandler } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import Text from './Text'
import * as operations from './operations'
import NumberPad from './NumberPad'
import theme from '../../theme'
//import { GeneralTable } from './TypeTables.js'

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
    memo(({ data, setIsDisplayedKeyboard, whoItemPressed, setWhoItemPressed, isDisplayedKeyboard, setDataTable }) => {
        //let getFA = operations.getAcumulateFrecuency(data[1]);
        //let getFR = operations.getRelativeFrecuency(getFA[getFA.length - 1], data[1]);
        ordened = operations.ordenar(data)
        mediana = operations.getMediana(data)
        media = operations.getMedia(data)
        moda = operations.getModa(ordened)
        const RenderData = memo(({ item, index }) => {
            return (
                <Pressable style={theme.row} onLongPress={() => {
                    setDataTable(data.filter((item, i) => {return index != i }))
                }} delayPressIn={500}>
                    <View style={theme.column}><Text>{index + 1}</Text></View>
                    <Pressable
                        style={[theme.column,
                        { backgroundColor: !whoItemPressed[0] ? (whoItemPressed[1] === index ? "#515151" : null) : "transparent" }]}
                        onPress={() => {
                            setWhoItemPressed([false, index])
                            setIsDisplayedKeyboard([true, "modData"])
                        }
                        }
                    >
                        <Text>{item}</Text></Pressable>
                </Pressable>
            )
        })

        const OrdenedTable = memo(({ item, index }) => {
            return (
                <View style={theme.row}>
                    <View style={theme.column}><Text>{index + 1}</Text></View>
                    <View style={theme.column}><Text>{item}</Text></View>
                    <View style={theme.column}><Text>{ordened.countArr[index]}</Text></View>
                </View>
            )
        })
        return (
            <ScrollView style={{ flex: 1, marginBottom: isDisplayedKeyboard[0] ? 300 : 0 }}>
                <View style={styles.tableContainer}>
                    <View style={theme.row}>
                        <View style={theme.column}><Text center heavy medium>N.</Text></View>
                        <View style={theme.column} ><Text center heavy medium>Dato</Text></View>
                    </View>
                    {data.map((item, index) => {
                        return <RenderData key={index} item={item} index={index} />
                    })}
                </View>
                <View style={styles.marginTables}>
                    <Text center heavy large>Tabla organizada</Text>
                </View>
                <View style={styles.tableContainer}>
                    <View style={theme.row}>
                        <View style={theme.column}><Text center heavy medium>N.</Text></View>
                        <View style={theme.column}><Text center heavy medium>Dato</Text></View>
                        <View style={theme.column}><Text center heavy medium>Veces que se repite</Text></View>
                    </View>
                    {
                        ordened.redux.map((item, index) => {
                            return <OrdenedTable key={index} item={item} index={index} />
                        })}
                </View>
                <View style={styles.results}>
                    <View style={styles.resultInfo}>
                        <Text bold medium center>Media: {"\n" + media} </Text>
                    </View>
                    <View style={styles.resultInfo}>
                        <Text bold medium center>Mediana: {"\n" + mediana}</Text>
                    </View>
                    <View style={styles.resultInfo}>
                        <Text bold medium center>Moda: {"\n" + moda}</Text>
                    </View>
                </View>
            </ScrollView>
        )
    })
export default Table = ({ navigation, headers }) => {
    const [dataTable, setDataTable] = useState([])
    const [dataInput, setDataInput] = useState("0");
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
            case "setData":
                setDataInput(prev => {
                    return getKeyboardPressed(prev, index, item)
                })
                return
            case "modData":
                let NewArray
                if (whoItemPressed[0]) {
                    NewArray = dataTable.map((data, i) => {
                        if (i === whoItemPressed[1]) {
                            return getKeyboardPressed(data.toString(), index, item)
                        }
                        return data
                    })
                    setDataTable(NewArray)
                } else {
                    NewArray = dataTable.map((data, i) => {
                        if (i === whoItemPressed[1]) {
                            return getKeyboardPressed(data.toString(), index, item)
                        }
                        return data
                    })
                    setDataTable(NewArray)
                }
                return;
        }
    }
    return (
        <SafeAreaView style={theme.mainContainer}>
            <Text center title black>Tabla</Text>
            <View style={styles.getDataContainer}>
                <View>
                    <Text center>Ingrese el dato: </Text>
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
                    <Pressable style={styles.button} onPress={() => {
                        setDataTable([...dataTable, dataInput])
                        setDataInput("0")
                    }}>
                        <Text>Agregar</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.tableContainer}>
                <View style={theme.table}>
                    {
                        <RenderTable
                            data={dataTable}
                            setIsDisplayedKeyboard={setIsDisplayedKeyboard}
                            whoItemPressed={whoItemPressed}
                            setWhoItemPressed={setWhoItemPressed}
                            isDisplayedKeyboard={isDisplayedKeyboard}
                            setDataTable={setDataTable}
                        />
                    }
                </View>
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
        padding: 10,
    },
    keyboard: {
        position: "absolute",
        backgroundColor: '#242424',
        bottom: 0
    },
    getDataContainer: {
        flexDirection: "row",
        gap: 10,
        alignItems: 'flex-end',
        justifyContent:'center',
        padding: 15
    },
    tableContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: "center"
    },
    marginTables: {
        marginVertical: 20
    },
    results: {
        marginVertical: 20,
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent: 'space-evenly',
        gap:15
    },
    resultInfo: {
        backgroundColor: theme.colors.darkPurple,
        padding: 20,
        borderRadius: 5,
    }
})


