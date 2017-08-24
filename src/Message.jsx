import React, {Component} from 'react';

class Message extends Component {
  render() {
    if (this.props.message.type === 'incomingNotification'){
      return (
        <div className='message system'>
          {this.props.message.content}
        </div>
      );
    } else {
      const style = {
        color: this.props.message.userColor
      }
      const imgRegex = /(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?[.png|.jpg|.gif]/
      const movieRegex = /(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?\.webm/
      if (movieRegex.test(this.props.message.content)){
        const movieURL = this.props.message.content.match(movieRegex)[0];
        // removes url from content
        const otherContent = this.props.message.content.replace(movieRegex, '');
        return (
          <div className='message'>
            <span className='message-username' style={style}>{this.props.message.username}</span>
            <span className='message-content'>{otherContent}<br/>
              <video src={movieURL} controls></video>
            </span>
          </div>
        );
      } else if (imgRegex.test(this.props.message.content)){
        const imgURL = this.props.message.content.match(imgRegex)[0];
        // removes url from content
        const otherContent = this.props.message.content.replace(imgRegex, '');
        return (
          <div className='message'>
            <span className='message-username' style={style}>{this.props.message.username}</span>
            <span className='message-content'>{otherContent}<br/><img src= {imgURL}/></span>

          </div>
        );
      } else {
        return (
          <div className='message'>
            <span className='message-username' style={style}>{this.props.message.username}</span>
            <span className='message-content'>{this.props.message.content}</span>
          </div>
      );
      }

    }
  }
}
export default Message;
