import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.socket = new WebSocket("ws://localhost:3001")
    this.state = {
      currentUser: {name: "Emanuel"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [] //messages from the server will be stored here as they arrive
    }
  }
  componentDidMount() {
    this.socket.onopen = (e) =>{
      console.log('Connected to server');
    }

    this.socket.onmessage = (event)=>{
      const eventJSON = JSON.parse(event.data);
      const oldMessages = this.state.messages
      const newMessages = oldMessages.concat(eventJSON)
      this.setState({messages: newMessages})
    }

    console.log("componentDidMount <App />");
  }
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar newPost={this.newPost} currentUser={this.state.currentUser}/>
      </div>
    );
  }

  newPost = (content, user) =>{

    const newMessage = {
        username: "Anonymous",
        content: content
      }
    if (user){
      newMessage.username = user;
    }
    this.socket.send(JSON.stringify(newMessage))
  }
}
export default App;
