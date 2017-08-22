import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.socket = new WebSocket("ws://localhost:3001")
    this.state = {
      currentUser: {name: "Emanuel"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: '000001',
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: '000002',
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
  }
  componentDidMount() {
    this.socket.onopen = (e) =>{
      console.log('Connected to server');
    }
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
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

    const newid = this.state.messages.length * 2
    const newMessage = {
        id: newid,
        username: "Anonymous",
        content: content
      }
    if (user){
      newMessage.username = user;
    }
    this.socket.send(JSON.stringify(newMessage))
    const oldMessages = this.state.messages
    const newMessages = oldMessages.concat(newMessage)
    this.setState({messages: newMessages})
  }
}
export default App;
