import * as React from 'react';
import { StyleSheet, View, Alert, ScrollView, Text } from 'react-native';
import { NavigationScreenOptions, NavigationEvents } from "react-navigation"
import { json as fwt } from "../utils/api"
import BlogPreviewCard from "../components/BlogPreviewCard"

interface props { }
interface state {
  blogs: {
    BlogId: number,
    title: string,
    content: string,
    name: string
  }[]
}

export default class AllBlogs extends React.Component<props, state> {

  static navigationOptions: NavigationScreenOptions = {
    headerTitle: "Blogs"
  }

  constructor(props: props) {
    super(props);
    this.state = {
      blogs: []
    };
    this._getBlogs()
  }

  async _getBlogs() {
    try {
      let res = await fwt("https://protected-gorge-79324.herokuapp.com/api/blogs");
      if(res){
        let blogs = await res.json()
        this.setState({ blogs })
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Error in fetching AllBlogs")
    }
  }

  renderBlogs() {
    return this.state.blogs.map(blog => {
      return <BlogPreviewCard key={blog.BlogId} blog={blog} />
    })
  }

  render() {
    return (

      <View style={styles.container}>
        <NavigationEvents onDidFocus={()=>this._getBlogs()} />
        <ScrollView>
          {this.renderBlogs()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});
