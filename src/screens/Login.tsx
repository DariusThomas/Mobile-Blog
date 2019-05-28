import * as React from "react"
import { StyleSheet, View, Alert } from 'react-native';
import { Button, Text, Input} from "react-native-elements";
import { NavigationScreenOptions, NavigationScreenProps} from "react-navigation"
import { json as fwt, SetAccessToken, getUser } from "../utils/api"

interface props extends NavigationScreenProps{}

interface state{
    email:string;
    password:string
}

export default class Login extends React.Component<props, state>{
   
    static navigationOptions:NavigationScreenOptions={
        headerTitle:"Login"
    }

    constructor(props:props){
        super(props);
        this.state={
            email:'',
            password:''
        }
    }
async handleLogin(){
    try{
        let result = await fwt('https://protected-gorge-79324.herokuapp.com/auth/login',"POST",{
            email:this.state.email,
            password:this.state.password
        })
       if(result){
           let res:any = await result.json()
           await SetAccessToken(res.token, {userid: res.userid, role:res.role})
           let user = await getUser();
           if(user && user.role ==="admin"){
            this.props.navigation.navigate("AllBlogs")
           }else{
               Alert.alert("Invalid Credentials")
           }
       }
    }catch(e){
        console.log(e);
        Alert.alert("Problem Logging in. Contact Admin")
    }
}

    render() {
        return(
            <View style={styles.container}>
                <View style ={{flex:1, justifyContent:"center", alignItems:"center"}}>
                <Input 
                textContentType="emailAddress"
                containerStyle={{marginVertical:5}}
                placeholder="Email"
                leftIcon ={{type: 'font-awesome',name:'envelope'}}
                value={this.state.email}
                onChangeText={(text)=> this.setState({email:text})}
                />
                <Input 
                textContentType="password"
                secureTextEntry={true}
                containerStyle={{marginVertical:5}}
                leftIcon ={{type: 'font-awesome',name:'key'}}
                placeholder="password"
                value={this.state.password}
                onChangeText={(text)=> this.setState({password:text})}
                />
                </View>
                <View style={{flex:1}}>
                    <Button 
                    raised
                    title="Login"
                    containerStyle ={{ margin: 10}}
                    onPress={()=>this.handleLogin()}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    fontMd:{
      color:"black",
      fontSize: 28,
      margin:20
    },
    fontLg:{
      color:"black",
      fontSize: 45,
    },
    fontSm:{
      color:"black",
      fontSize: 18,
    }
  });
  