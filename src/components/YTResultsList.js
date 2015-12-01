import React from 'react';
import MUI from 'material-ui';
import View from 'react-flexbox';
import YTResult from './YTResult';
import array from 'array-range';

export default class YTResultsList extends React.Component {
  static propTypes = {
    results: React.PropTypes.array.isRequired,
    loading: React.PropTypes.bool.isRequired,
    onLoadMore: React.PropTypes.func.isRequired,
  };

  renderLoadMoreButton() {
    const { results, loading, onLoadMore } = this.props;

    if (!loading && results.length > 0) {
      return (
        <MUI.RaisedButton
          label="Load more"
          style={{
            marginTop: '20px',
            marginBottom: '80px',
          }}
          onClick={onLoadMore}
        />
      );
    }
  }

  render() {
    const { loading, results } = this.props;

    if (loading) {
      return (
        <View column>
          <ul style={{margin: 0, padding: 0}}>
            {
              array(10).map(idx =>
                <YTResult key={idx} isPlaceholder />
              )
            }
          </ul>
        </View>
      );
    }

    return (
      <View column>
        <ul style={{margin: 0, padding: 0}}>
          {
            results.map(result =>
              <YTResult key={result.id} { ...result } />
            )
          }
        </ul>
        {this.renderLoadMoreButton()}
      </View>
    );
  }
}
