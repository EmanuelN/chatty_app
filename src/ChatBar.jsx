import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props){
    super(props);
    this.state ={
      username: this.props.currentUser.name
    }
  }
  render() {
    return (
      <footer className="chatbar">
          <input name= 'username' onKeyUp={this.typingUsername} className="chatbar-username" onChange={this.typingUsername} placeholder='Anonymous'/>
          <input name= 'message'  onKeyUp={this.typingPost} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }

  typingPost = (e)=>{
    e.preventDefault()
    if (e.key === 'Enter'){
      this.props.changeName(this.state.username)
      this.props.newPost(e.target.value, this.state.username);
      e.target.value='';
    }
  }
  typingUsername = (e)=>{
    e.preventDefault();
      const newUser = e.target.value;
      this.setState({username: newUser});
      //if user pressed enter submit new name for notification
      if (e.key === 'Enter'){
        this.props.changeName(e.target.value)
      }

  }
}
export default Chatbar;
