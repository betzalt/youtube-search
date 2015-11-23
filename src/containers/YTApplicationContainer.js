import React from 'react';
import { connect } from 'react-redux';
import View from 'react-flexbox';
import {
  searchAction,
  loadMoreAction,
  resetSearchResults,
} from '../actions';
import YTSearch from '../components/YTSearch';
import YTResult from '../components/YTResult';
import MUI from 'material-ui';

export class YTApplicationContainer extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    results: React.PropTypes.array.isRequired,
    currentQuery: React.PropTypes.string,
  };

  render() {
    const { dispatch, results, currentQuery } = this.props;

    const loadMoreButton = results.length > 0 ? (
      <MUI.RaisedButton
        label="Load more"
        style={{marginTop: '20px'}}
        onClick={() => dispatch(loadMoreAction(currentQuery))}
      />
    ) : null;

    return (
      <View column style={{
        padding: '20px',
      }}>
        <YTSearch
          onSearch={q => dispatch(searchAction(q))}
          onResetSearch={() => dispatch(resetSearchResults())}
        />
        <ul style={{margin: '0', padding: '0'}}>
          {
            results.map(result =>
              <YTResult key={result.id} { ...result } />
            )
          }
        </ul>

        {loadMoreButton}
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
