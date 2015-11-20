import React from 'react';
import MUI from 'material-ui';

export default class YTResult extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    channelTitle: React.PropTypes.string.isRequired,
    thumbnail: React.PropTypes.string.isRequired,
  };

  render() {
    const { title, channelTitle, thumbnail } = this.props;
    return (
      <MUI.Card style={{width: '100%', marginTop: '20px'}}>
        <MUI.CardHeader
          title={title}
          subtitle={channelTitle}
          style={{
            display: 'flex',
            position: 'relative',
            width: '100%',
            flexWrap: 'wrap',
          }}
          textStyle={{
            flexBasis: '80%',
            overflow: 'hidden',
          }}
          titleStyle={{
            width: '100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          avatar={
            <MUI.Avatar style={{display: 'none'}} /> // cant disable this shit
          }
        />

        <MUI.CardMedia>
          <img src={thumbnail} alt={title} />
        </MUI.CardMedia>

      </MUI.Card>
    );
  }
}
