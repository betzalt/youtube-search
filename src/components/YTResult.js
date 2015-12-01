import React from 'react';
import MUI from 'material-ui';
import YTResultMedia from './YTResultMedia';

export default class YTResult extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    channelTitle: React.PropTypes.string.isRequired,
    thumbnail: React.PropTypes.string.isRequired,
  };

  render() {
    const { id, title, channelTitle, thumbnail } = this.props;
    return (
      <MUI.Card style={{width: '100%', marginTop: '20px'}}>
        <MUI.CardHeader
          title={title}
          subtitle={channelTitle}
          style={{
            height: 'auto',
          }}
          avatar={
            <MUI.Avatar style={{display: 'none'}} /> // cant disable this shit
          }
        />

        <YTResultMedia
          id={id}
          title={title}
          thumbnail={thumbnail}
        />
      </MUI.Card>
    );
  }
}
