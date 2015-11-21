import React from 'react';
import View from 'react-flexbox';
import MUI from 'material-ui';

export default class YTSearch extends React.Component {
  static propTypes = {
    onSearch: React.PropTypes.func.isRequired,
    onResetSearch: React.PropTypes.func.isRequired,
  };

  onSubmit(event) {
    event.preventDefault();
    const query = this.refs.queryInput.getValue();

    if (query) {
      this.props.onSearch(query);
      this.refs.queryInput.blur();
    }
  }

  onClear() {
    this.props.onResetSearch();
    this.refs.queryInput.setValue('');
    this.refs.queryInput.focus();
  }

  render() {
    return (
      <View>
        <MUI.Paper style={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '100%',
        }}>
          <MUI.IconButton>
            <MUI.FontIcon className="material-icons">search</MUI.FontIcon>
          </MUI.IconButton>

          <form onSubmit={::this.onSubmit}>
            <MUI.TextField
              ref="queryInput"
              hintText="Search"
              underlineStyle={{display: 'none'}}
              style={{
                width: '100%',
              }}
            />
          </form>

          <MUI.IconButton onClick={::this.onClear}>
            <MUI.FontIcon className="material-icons">clear</MUI.FontIcon>
          </MUI.IconButton>
        </MUI.Paper>
      </View>
    );
  }
}
