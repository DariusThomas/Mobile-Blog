import * as React from "react"
import {
ActivityIndicator,
StatusBar,
View,
AsyncStorage
} from "react-native"
import { getAccessToken } from "../utils/api"
import { NavigationScreenProps} from "react-navigation"

interface props extends NavigationScreenProps{};

interface state{};

export default class AuthLoading extends React.Component<props,state>{
   
   constructor(props: props){
       super(props);
       this._accessToken();
   }
   
   async _accessToken(){
       try{
          // await AsyncStorage.clear();
        let token = await getAccessToken();
        this.props.navigation.navigate( token? "App" : "Auth")
       }catch(e){
           console.log(e)
       }
   }

    render(){
        return(
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        )
    }
}