import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.socket = new WebSocket('ws://localhost:3001')
    this.state = {
      currentUser: {name: 'Anon'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [], //messages from the server will be stored here as they arrive
      userCount: 0
    }
  }
  componentDidMount() {
    this.socket.onopen = (e) =>{
      console.log('Connected to server');
    }

    this.socket.onmessage = (event)=>{
      const eventJSON = JSON.parse(event.data);
      switch(eventJSON.type){
        case 'userCount':
          this.setState({userCount: eventJSON.number})
        break;
        default:
          const oldMessages = this.state.messages;
          const newMessages = oldMessages.concat(eventJSON);
          this.setState({messages: newMessages});
        break;
      }
        // case "incomingNotification":
        //   let oldMessages = this.state.messages;
        //   let newMessages = oldMessages.concat(eventJSON);
        //   this.setState({messages: newMessages});
        // break;
      // }
    }
    console.log('componentDidMount <App />');
  }
  render() {
    return (
      <div>
        <nav className='navbar'>
          <a href="/" className='navbar-brand'>Chatty</a>
          <div className='userCount'>{this.state.userCount} user(s) online</div>
        </nav>
        <MessageList messages={this.state.messages} notifications={this.state.notifications}/>
        <ChatBar newPost={this.newPost} currentUser={this.state.currentUser} changeName={this.changeName}/>
      </div>
    );
  }
  //When a user changes their name
  changeName = (user)=>{
    if (user && user !== this.state.currentUser.name){
      const nameChange = {
        type: "postNotification",
        content: {
          oldUser: this.state.currentUser.name,
          newUser: user}
      }
      this.socket.send(JSON.stringify(nameChange))
      this.state.currentUser.name = user
    }
  }
  newPost = (content, user)=>{
  //Make sure post is not just made up of spaces
    if (/\S/.test(content)) {
      const newMessage = {
            type: "postMessage",
            username: 'Anonymous',
            content: content
          }
          //if there is a user logged in the posts are not anonymous
        if(this.state.currentUser.name !== ''){
          newMessage.username = this.state.currentUser.name
        }
        this.socket.send(JSON.stringify(newMessage))

    }
  }
}
export default App;
