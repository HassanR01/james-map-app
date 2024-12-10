import { StyleSheet } from "react-native";
import { Colors } from "./Colors";
import { Fonts } from "./Fonts";


export const ConstantStyles = StyleSheet.create({
    inputsCont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.light.background,
        borderRadius: 8,
        padding: 8,
        borderWidth: 2,
        borderColor: Colors.light.tint,
    },
    inputs: {
        fontSize: 16,
        fontFamily: Fonts.family.regular,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
        width: '80%',
    },
    scrollViewTag: {
        backgroundColor: Colors.light.background,
        padding: 10,
    }
})