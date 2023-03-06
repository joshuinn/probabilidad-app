import { Text, StyleSheet } from "react-native";

export default TextStyle = ({ ...props }) => {
    const styled = [
        styles.text,
        props.center && styles.center,
        props.title && styles.title,
        props.large && styles.large,
        props.medium && styles.medium,
        props.small && styles.small,
        props.light && styles.light,
        props.bold && styles.bold,
        props.heavy && styles.heavy,
        props.black && styles.black,
        { color: props.color ?? "#dbdbdb" }
    ]
    return (
        <Text
            style={styled}
            {...props}
        >
            {props.children}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        color: "#fff",
        fontSize: 13,
        fontWeight: 400,
    },
    center: {
        textAlign: 'center'
    },
    title: {
        fontSize: 32
    },
    large: {
        fontSize: 18
    },
    medium: {
        fontSize: 15
    },
    light: {
        fontWeight: "200"
    },
    bold: {
        fontWeight: "600"
    },
    heavy: {
        fontWeight: "700"
    },
    black: {
        fontWeight: "900"
    },


})


/*const Text = styled.Text`
    color:${(props) => props.color ?? "#DBDBDB"};
    margin:${(props) =>  props.margin_custom ?? 0};
    padding:${(props) => props.padding_custom ?? 0};
    ${({ title, large, medium, small, tiny }) => {
        switch (true) {
            case title:
                return `font-size:32px;`;
            case large:
                return `font-size:18px;`;
            case medium:
                return `font-size:15px;`;
            case small:
                return `font-size:11px;`;
            case tiny:
                return `font-size:10px;`;
            default:
                return `font-size:13px;`;
        }
    }}
    ${({ light, bold, heavy, black }) => {
        switch (true) {
            case light:
                return `font-weight:200;`;
            case bold:
                return `font-weight:600;`;
            case heavy:
                return `font-weight:700;`;
            case black:
                return `font-weight:900;`;
            default:
                return 'font-weight:400;';
        }
    }}
    ${({ center, right }) => {
        switch (true) {
            case center:
                return `text-align:center;`;
            case right:
                return `text-align:rigth;`;
            default:
                return `text-align:left;`;
        }
    }}
`
*/