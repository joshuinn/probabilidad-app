import React, { memo, useEffect, useState } from 'react'
import { ScrollView, View, StyleSheet } from "react-native-gesture-handler";

import Text from "./Text";
import * as operations from './operations'

export const GeneralTable =
    memo(({ data, setIsDisplayedKeyboard, whoItemPressed, setWhoItemPressed, isDisplayedKeyboard }) => {
        const RenderData = memo(({ item, index }) => {
            return (
                <View>{item}</View>
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
