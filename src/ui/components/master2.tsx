import * as React from 'react';
import { NavPane, NavPaneItem, Text } from 'react-desktop/windows';
import Playground from './playground';

export default class extends React.Component<any, any> {
  static defaultProps = {
    color: '#000000',
    theme: 'light'
  };
  playg : Playground;
  constructor() {
    super();
    this.state = {
      selected: 'plane',
      text: 'props'
    };
  }

  render() {
    return (
      <NavPane
        openLength={200}
        push
        color={this.props.color}
        theme={this.props.theme}
       >
        {this.renderItem('plane',
         <Playground
            onTextChanged={this.handleTextChange}
            text={this.state.text}
            ref={ node => this.playg = node}
            cols={this.state.cols || 32}
            rows={this.state.rows || 16}
            />
         )}
        {this.renderItem('bus', 'Bus')}
      </NavPane>
    );
  }

  renderItem(title, content) {
    return (
      <NavPaneItem
        title={title}
        icon={this.renderIcon(title)}
        background='transparent'
        selected={this.state.selected === title}
        onSelect={() => this.setState({ selected: title })}
        padding='10px 20px'
        color='#ff0002'
      >
        <Text>{content}</Text>
      </NavPaneItem>
    );
  }
  handleTextChange = (text:string) => {
      this.setState({
        text,
      })
  }

  renderIcon(name) {

    switch (name) {
        case 'plane': return <b>✈</b>;
        default: return <b>🚍</b>;
    }
  }
}