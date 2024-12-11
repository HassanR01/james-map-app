import { StyleSheet } from "react-native";
import { Colors } from "./Colors";
import { Fonts } from "./Fonts";


export const ConstantStyles = StyleSheet.create({
    inputsCont: {
        height: 45,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.background,
        borderRadius: 8,
        paddingHorizontal: 5,
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
    },
    IconButton: {
        backgroundColor: Colors.light.background,
        padding: 10,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: Colors.light.tint,
        marginLeft: 10
    },
})