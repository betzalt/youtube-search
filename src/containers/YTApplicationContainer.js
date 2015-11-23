import React from 'react';
import { connect } from 'react-redux';
import View from 'react-flexbox';
import {
  searchAction,
  loadMoreAction,
  resetSearchResults,
} from '../actions';
import YTSearch from '../components/YTSearch';
import YTResultsList from '../components/YTResultsList';

export class YTApplicationContainer extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    results: React.PropTypes.array.isRequired,
    currentQuery: React.PropTypes.string,
  };

  render() {
    const { dispatch, results, currentQuery } = this.props;

    return (
      <View column style={{
        padding: '20px',
      }}>
        <YTSearch
          onSearch={q => dispatch(searchAction(q))}
          onResetSearch={() => dispatch(resetSearchResults())}
        />

        <YTResultsList
          results={results}
          onLoadMore={() => dispatch(loadMoreAction(currentQuery))}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { currentQuery, searches } = state;
  const currentSearch = searches[currentQuery] || {
    error: false,
    loading: false,
    results: [],
  };

  return {
    currentQuery,
    ...currentSearch,
  };
};

export default connect(mapStateToProps)(YTApplicationContainer);
