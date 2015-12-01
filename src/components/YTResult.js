import React from 'react';
import MUI from 'material-ui';
import YTResultMedia from './YTResultMedia';

export default class YTResult extends React.Component {
  static propTypes = {
    id: React.PropTypes.string,
    title: React.PropTypes.string,
    channelTitle: React.PropTypes.string,
    thumbnail: React.PropTypes.string,
    isPlaceholder: React.PropTypes.bool,
  };

  static defaultProps = {
    isPlaceholder: false,
  };

  render() {
    const { id, title, channelTitle, thumbnail, isPlaceholder } = this.props;

    const mediaPlaceholder = (
      <div style={{
        paddingTop: '75%',
        backgroundColor: MUI.Styles.Colors.grey400,
        zIndex: 0,
      }} />
    );

    const titlePlaceholder = (
      <div style={{
        width: '80%',
        height: '20px',
        background: MUI.Styles.Colors.grey400,
      }} />
    );

    const subtitlePlaceholder = (
      // shit attempt at simulating spacing on top of text
      <div style={{
        width: '50%',
        paddingTop: '4px',
        boxSizing: 'border-box',
      }}>

        <div style={{
          height: '15px',
          background: MUI.Styles.Colors.grey400,
        }} />
      </div>
    );

    if (isPlaceholder) {
      return (
        <MUI.Card style={{width: '100%', marginTop: '20px'}}>
          <MUI.CardHeader
            title={titlePlaceholder}
            subtitle={subtitlePlaceholder}
            style={{height: 'auto'}}
            textStyle={{width: '100%'}}
            avatar={<MUI.Avatar style={{display: 'none'}} />} // cant disable this shit
          />

          <MUI.CardMedia>
            {mediaPlaceholder}
          </MUI.CardMedia>
        </MUI.Card>
      );
    }

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

        <MUI.CardMedia>
          {mediaPlaceholder}
          <YTResultMedia
            id={id}
            title={title}
            thumbnail={thumbnail}
          />
        </MUI.CardMedia>
      </MUI.Card>
    );
  }
}
