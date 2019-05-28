import * as React from "react";
import {
    createStackNavigator,
     createAppContainer,
    createSwitchNavigator,
    createBottomTabNavigator
    } from "react-navigation"
import { Icon } from "react-native-elements"
import AllBlogs from "./screens/AllBlogs"
import SingleBlog from "./screens/SingleBlog"
import Login from "./screens/Login"
import AuthLoading from "./screens/AuthLoading"
import AddBlog from "./screens/BlogForm"
const AuthStack = createStackNavigator(
    {
        Login
    },{

    }
)

const AppStack = createStackNavigator(
    {
        //screems
        AllBlogs,
        SingleBlog
    },
    {
        //generic styling
        initialRouteName:"AllBlogs",
        defaultNavigationOptions:{
            headerStyle:{
                backgroundColor: "#fff"
            },
            headerTintColor:"black",
            headerTitleStyle:{
                fontWeight:"bold"
            }
        }
    }
);

const BlogsTab = createBottomTabNavigator(
    {
            Blogs: AppStack,
            NewBlog: createStackNavigator(
                {
                   AddBlog
                },
                {
                    defaultNavigationOptions:{
                        headerStyle:{
                            backgroundColor: "#fff"
                        },
                        headerTintColor:"black",
                        headerTitleStyle:{
                            fontWeight:"bold"
                        }
                    }
                }
            )
    },
    {
        initialRouteName:"Blogs",
        defaultNavigationOptions:({ navigation})=>({
            tabBarIcon:({ tintColor})=>{
                let { routeName } = navigation.state;
                let iconName;
                if(routeName=="Blogs"){
                     iconName = "home"
                } else if (routeName =="NewBlog"){
                    iconName = "pencil"
                }
                return (
                <Icon 
                color={`${tintColor}`}
                type="font-awesome" 
                name={`${iconName}`}
                size={25} />
                )
            }
        }),
        tabBarOptions:{
            activeBackgroundColor:"lightblue",
            inactiveBackgroundColor:"lightblue",
            activeTintColor:"blue",
            inactiveTintColor:"white"
        }
    }
);

export default createAppContainer(createSwitchNavigator(
    {
        App: BlogsTab,
        Auth: AuthStack,
        AuthLoading
    },
    {
        initialRouteName: "AuthLoading"
    }
))