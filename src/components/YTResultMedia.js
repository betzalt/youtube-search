import React from 'react';
import MUI from 'material-ui';
import View from 'react-flexbox';
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
      loaded: false,
    };
  }

  renderVideo() {
    if (this.state.loaded) {
      return (
        <View style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
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
        </View>
      );
    }
  }

  renderThumbnail() {
    return (
      <img
        src={this.props.thumbnail}
        alt={`${this.props.title} thumbnail`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
    );
  }

  render() {
    return (
      <MUI.CardMedia onClick={() => this.setState({loaded: true})}>
        <View style={{
          display: 'block',
          position: 'relative',
          width: '100%',
          paddingTop: '75%',
          backgroundColor: MUI.Styles.Colors.grey300,
        }} />
        {this.state.loaded ? this.renderVideo() : this.renderThumbnail()}
      </MUI.CardMedia>
    );
  }
}
