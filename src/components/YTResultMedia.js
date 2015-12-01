import React from 'react';
import YouTube from 'react-youtube';

export default class YTResultMedia extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    thumbnail: React.PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      videoStarted: false,
      thumbnailLoaded: false,
    };
  }

  render() {
    const coverStyle = {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
    };

    const thumbnail = (
      <img
        src={this.props.thumbnail}
        alt={`${this.props.title} thumbnail`}
        style={{
          ...coverStyle,
          zIndex: 1,
          opacity: this.state.thumbnailLoaded ? 1 : 0,
          transition: 'opacity ease 100ms',
        }}
        onLoad={() => this.setState({thumbnailLoaded: true})}
        onClick={() => this.setState({videoStarted: true})}
      />
    );

    const video = (
      <div style={{
        ...coverStyle,
        zIndex: 2,
      }}>
        <YouTube
          url={`https://youtube.com/watch?v=${this.props.id}`}
          opts={{
            width: '100%',
            height: '100%',
            playerVars: {
              autoplay: 1,
            },
          }}
        />
      </div>
    );

    return (
      <div>
        {thumbnail}
        {this.state.videoStarted ? video : null}
      </div>
    );
  }
}
