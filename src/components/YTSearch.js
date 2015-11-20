import React from 'react';
import View from 'react-flexbox';
import MUI from 'material-ui';

export default class YTSearch extends React.Component {
  static propTypes = {
    onSearch: React.PropTypes.func.isRequired,
  };

  onSubmit(event) {
    event.preventDefault();
    const query = this.refs.queryInput.getValue();

    if (query) {
      this.props.onSearch(query);
      this.refs.queryInput.blur();
    }
  }

  render() {
    return (
      <View>
        <MUI.Paper style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0 10px',
          width: '100%',
          height: '100%',
        }}>
          <MUI.FontIcon className="material-icons">search</MUI.FontIcon>
          <form onSubmit={::this.onSubmit}>
            <MUI.TextField
              ref="queryInput"
              hintText="Search"
              underlineStyle={{display: 'none'}}
            />
          </form>
        </MUI.Paper>
      </View>
    );
  }
}
