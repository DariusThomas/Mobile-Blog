import * as React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { NavigationScreenOptions, NavigationParams } from "react-navigation"
import { json as fwt} from "../utils/api"

interface props extends NavigationParams { }

interface state {
  blog: {
    BlogId: number,
    title: string,
    content: string,
    Author: string
  },
  id: number
  ,
  Tags: Array<
    {
      blogId: number,
      tagId: number,
      id: number
      name: string
    }
  >
}

export default class SingleBlog extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      blog: {
        BlogId:NaN,
        title: "",
        content: "",
        Author:""
      },
      id: this.props.navigation.getParam("id", "NO-ID"),
      Tags: []
    }
  }
  static navigationOptions: NavigationScreenOptions = {
    headerTitle: "Single Blog"
  }

  async componentDidMount() {
    try {
      let blogRes = await fwt(`https://protected-gorge-79324.herokuapp.com/api/blogs/${this.state.id}`)
      let TagsRes = await fwt(`https://protected-gorge-79324.herokuapp.com/api/blogs/${this.state.id}/blogtags`)
      if(blogRes && TagsRes){
      let [Tags] = await TagsRes.json()
      let blog = await blogRes.json()
      this.setState({ blog, Tags })
    }
    } catch (e) {
      console.log(e);
      Alert.alert("Error in fetching Blog")
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.fontLg}>{this.state.blog.title}</Text>
        {this.state.Tags.map((tag, i) => {
        return <Text key={i} style={styles.fontSm}>{tag.name}</Text>
      }
        )}
        <Text style={styles.fontMd}> Written By: {this.state.blog.Author}</Text>
        <Text style={styles.fontSm}>{this.state.blog.content}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontMd: {
    color: "white",
    fontSize: 28,
  },
  fontLg: {
    color: "white",
    fontSize: 45,
  },
  fontSm: {
    color: "white",
    fontSize: 18,
  },
  fontTags:{
    color: "white",
    fontSize: 18,
    flexDirection:'row',
     flexWrap:'wrap'
  }
});
