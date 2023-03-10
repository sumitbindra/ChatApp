import React from 'react'
import {StreamChat} from "stream-chat";
import {
    Chat,
    Channel,
    ChannelList,
    ChannelHeader,
    Thread,
    Window
  } from "stream-chat-react";
import { MessageList, MessageInput } from "stream-chat-react";
import Cookies from 'universal-cookie';

import {Auth, Header} from "./components"

import "stream-chat-react/dist/css/index.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const cookies = new Cookies()

const apiKey = "kh5ta7d4n7vz"
const client = StreamChat.getInstance(apiKey)
const streamToken = cookies.get("streamToken")
const authToken = cookies.get("authToken")

if (authToken) {
    client.connectUser({
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
    }, streamToken)
}


function App() {
    if (!authToken) {
        return <Auth />
    }
    console.log(client.userID)

    const filters = { members: { $in: [ '6' ] } }
    const sort = { last_message_at: -1 };
    const options = { limit: 10 }

    const logout = () => {
        cookies.remove('userId')
        cookies.remove('username')
        cookies.remove('fullName')
        cookies.remove('streamToken')
        cookies.remove('authToken')

        window.location.reload()
    }

    return (
        <div 
            // className="app__wrapper"
        >
            <Header handleLogout={logout}/>
            <Chat client={client} theme={"messaging light"}>
                {client.userID === '6' && <ChannelList filters={filters} sort={sort} options={options} />}
                {client.userID === '6' ? 
                <Channel> 
                    <Window>
                        <ChannelHeader />
                        <MessageList />
                        <MessageInput />
                    </Window>
                    <Thread />
                </Channel> : 
                <Channel channel={client.channel('messaging', { members: ['6', client.userID] })}> 
                    <Window>
                        <ChannelHeader />
                        <MessageList />
                        <MessageInput />
                    </Window>
                    <Thread />
                </Channel>
                }
                    
            </Chat>
        </div>
    )
}

export default App;
