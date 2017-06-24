import * as React from 'react';
import Main from './content';

export type matrixType =  'int' | 'hex';

const {
  MasterDetailsView,
  MasterDetailsViewItem,
  MasterDetailsViewItemMaster,
  MasterDetailsViewItemDetails,
  Window,
  TitleBar
} =  require('react-desktop') ;

export default class extends React.Component<any, any> {
  static defaultProps = {
    color: '#cc7f29',
    theme: 'light'
  };
  playg: Main;
  render() {
    return (
        <Window
         theme='dark'
         chrome
        >
         <TitleBar
          onCloseClick={this.props.close}
          onMinimizeClick={this.props.minimize}
          onMaximizeClick={this.props.maximize}
         title='My Windows Application'
         controls/>
            <MasterDetailsView color={this.props.color} theme={this.props.theme}>
                {this.renderItem('Item 1')}
            </MasterDetailsView>
        </Window>
    );
  }

  renderItem(master: any) {
    return (
      <MasterDetailsViewItem>
        <MasterDetailsViewItemMaster
          width='200px'
            push>
          {master}
        </MasterDetailsViewItemMaster>
        <MasterDetailsViewItemDetails background>
            <Main ref={ node => this.playg = node}/>
        </MasterDetailsViewItemDetails>
      </MasterDetailsViewItem>
    );
  }

  //getLedMatrix = () => this.playg.getPanelAt();
  //getLedMatrixHex = () => this.playg.getLedMatrixHex();
}