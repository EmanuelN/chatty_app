import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: '',
      username: ''
    }
  }
  render() {
    return (
      <footer className="chatbar">
          <input name= 'username' className="chatbar-username" onKeyUp={this.typingUsername} placeholder={this.props.currentUser.name}/>
          <input name= 'message' value={this.state.text} onKeyUp={this.typingPost} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
  typingPost = (e)=>{
    e.preventDefault()
    if (e.key === 'Enter' && this.state.text !== ''){
      this.props.newPost(this.state.text, this.state.username);
      this.setState({text: ''})
    } else if (e.key != 'Backspace' && e.key !== 'Shift' && e.key !== 'CapsLock' && e.key !== 'Tab' && e.key !== 'Enter'){
        const newText = e.target.value + e.key;
        this.setState({text: newText});
    } if (e.key == 'Backspace'){
      const newText = e.target.value.substring(0, e.target.value.length - 1)
      this.setState({text: newText})
    }
  }
  typingUsername = (e)=>{
    e.preventDefault();
    if (e.key === 'Enter' && this.state.text !== ''){
      this.props.newPost(this.state.text, this.state.username);
      this.setState({text: ''})
    } else {
      const newUser = e.target.value;
      this.setState({username: newUser});
    }
  }
}
export default Chatbar;
