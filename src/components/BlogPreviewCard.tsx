import * as React from "react";
import { Text, Card, Button, Icon } from "react-native-elements"
import { NavigationInjectedProps, withNavigation } from "react-navigation"
interface Props extends NavigationInjectedProps{
    blog: {
        BlogId: number,
        title: string,
        name: string
    }
}

interface State { }
 class BlogPreviewCard extends React.Component<Props, State>{
    render() {
        const { BlogId, title, name } = this.props.blog
        return (
            <Card
                title={title}
              image={{uri:"https://aozoeky4dglp5sh0-zippykid.netdna-ssl.com/wp-content/uploads/2017/09/ubuntu-1710-default-wallpaper-artful.jpg"}}
            >
                <Text style={{ marginBottom: 10 }}>{`Written By:${name}`}</Text>
                <Button
                    icon={<Icon name='code' color='#ffffff' />}
                    
                    buttonStyle={{ backgroundColor:'#03A9F4', borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                    title='Read This Blog' 
                    onPress={() => this.props.navigation.navigate("SingleBlog",{
                        id:BlogId
                    })}
                    />
            </Card>
        );
    }
}


export default withNavigation(BlogPreviewCard)