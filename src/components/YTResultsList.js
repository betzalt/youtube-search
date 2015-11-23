import React from 'react';
import MUI from 'material-ui';
import View from 'react-flexbox';
import YTResult from './YTResult';

export default class YTResultsList extends React.Component {
  static propTypes = {
    results: React.PropTypes.array.isRequired,
    onLoadMore: React.PropTypes.func.isRequired,
  };

  renderLoadMoreButton() {
    const { results, onLoadMore } = this.props;

    if (results.length > 0) {
      return (
        <MUI.RaisedButton
          label="Load more"
          style={{marginTop: '20px'}}
          onClick={onLoadMore}
        />
      );
    }
  }

  render() {
    return (
      <View column>
        <ul style={{margin: 0, padding: 0}}>
          {
            this.props.results.map(result =>
              <YTResult key={result.id} { ...result } />
            )
          }
        </ul>
        {this.renderLoadMoreButton()}
      </View>
    );
  }
}
