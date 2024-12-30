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
    button: {
        fontFamily: Fonts.family.bold,
        backgroundColor: Colors.light.background,
        color: Colors.light.tint,
        padding: 10,
        width: '100%',
        fontSize: 22,
        borderRadius: 10,
        textAlign: 'center',
        marginVertical: 10,
    },
    lableText: {
        marginBottom: 10,
        textAlign: 'right',
        fontFamily: Fonts.family.medium,
        fontSize: 24,
        color: Colors.light.tint
    },

    inputText: {
        padding: 3,
        fontSize: 18,
        fontFamily: Fonts.family.regular,
        width: '90%',
        textAlign: 'left',
        marginLeft: 10
    },

    inputContainer: {
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f1f8fb',
        marginVertical: 5
    },
    h1: {
        fontSize: 30,
        fontFamily: Fonts.family.bold,
        textAlign: 'center',
        color: Colors.light.tint
    },
    h2: {
        fontSize: 26,
        fontFamily: Fonts.family.bold,
        textAlign: 'center',
        color: Colors.light.tint
    },
    h3: {
        fontSize: 24,
        fontFamily: Fonts.family.medium,
        textAlign: 'center',
        color: Colors.light.tint
    },
    text: {
        fontSize: 16,
        fontFamily: Fonts.family.medium,
        textAlign: 'center',
        color: Colors.light.tint
    }

})