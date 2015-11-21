import React from 'react';
import { connect } from 'react-redux';
import View from 'react-flexbox';
import { searchAction, resetSearchResults } from '../actions';
import YTSearch from '../components/YTSearch';
import YTResult from '../components/YTResult';

export class YTApplicationContainer extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    results: React.PropTypes.array.isRequired,
  };

  render() {
    const { dispatch, results } = this.props;
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
      </View>
    );
  }
}

const currentSearch = state =>
  state.searches[state.currentQuery] || {
    error: false,
    loading: false,
    results: [],
  };

export default connect(currentSearch)(YTApplicationContainer);
