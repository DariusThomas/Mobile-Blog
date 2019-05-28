import * as React from "react";
import { View, StyleSheet, Alert, Picker } from "react-native"
import { Input, Button, Text } from "react-native-elements"
import { NavigationInjectedProps, withNavigation } from "react-navigation"
import { getUser, json as fwt } from "../utils/api";

interface props extends NavigationInjectedProps { };
interface state {
    title: string,
    body: string,
    tagsArr: Array<number>,
    tags: Array<{
        id:number,
        name:string
    }>
};

class BlogForm extends React.Component<props, state>{

    constructor(props: props) {
        super(props);
        this.state = {
            title: "",
            body: "",
            tags: [{
                id:NaN,
                name:''
            }],
            tagsArr: []
        }
    }

    private saving: boolean = false;

    async componentDidMount() {
        try {
            let res = await fwt("https://protected-gorge-79324.herokuapp.com/api/blogs/tags")
            if (res) {
                let tags = await res.json()
                this.setState({ tags })
            }
        } catch (e) {
            console.log(e)
            Alert.alert("Error getting tags")
        }
    }

    async handleSubmit() {
        if (this.saving) return

        let newBlog = {
            title: this.state.title,
            content: this.state.body,
            tagsArr: this.state.tagsArr,
            authorid: null
        }

        try {
            this.saving = true

            let { userid } = await getUser();
            newBlog.authorid = userid

            let result = await fwt("https://protected-gorge-79324.herokuapp.com/api/blogs", "POST", newBlog)
            if (result) {
                this.setState({
                    title: "",
                    body: ""
                })
                this.props.navigation.navigate("AllBlogs")
            }
        } catch (e) {
            console.log(e, "heere blogform");
            Alert.alert("Error adding blog")
        } finally {
            this.saving = false
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Input
                    label="Title"
                    containerStyle={styles.containerStyle}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    leftIcon={{ type: "font-awesome", name: "exclamation", color: "lightblue" }}
                    placeholder="Blog tittle..."
                    value={this.state.title}
                    onChangeText={(text) => this.setState({ title: text })}
                />
                <View style ={styles.containerStyle}>
                    <Text
                        style={styles.customLabel}
                    > Tags </Text>
                    <Picker
                    selectedValue={this.state.tagsArr[0]}
                    onValueChange={(itemValue)=>{
                        this.setState({tagsArr:[itemValue]})
                    }}
                    >
                        {this.state.tags.map(tag=>(
                            <Picker.Item value={tag.id} key={tag.id} label={tag.name} />
                        ))}
                    </Picker>
                </View>
                <Input
                    label="Body"
                    containerStyle={styles.containerStyle}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    multiline
                    numberOfLines={5}
                    leftIcon={{ type: "font-awesome", name: "file-text", color: "lightblue" }}
                    placeholder="Blog content..."
                    value={this.state.body}
                    onChangeText={(text) => this.setState({ body: text })}
                />
                <Button
                    raised
                    title="Submit"
                    containerStyle={{ margin: 10 }}
                    buttonStyle={styles.buttonStyle}
                    onPress={() => this.handleSubmit()}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 5,
        marginVertical: 10
    },
    containerStyle: {
        marginVertical: 5,
        padding: 5,
        borderWidth: 2,
        borderColor: "lightblue",
        borderStyle: "solid",
        borderRadius: 10
    },
    buttonStyle: {
        borderWidth: 2,
        borderColor: "lightblue"

    }
    ,customLabel: {
        marginHorizontal: 2,
        fontWeight: "bold",
        fontSize: 16,
        color: "blue"
    }
})

export default withNavigation(BlogForm)