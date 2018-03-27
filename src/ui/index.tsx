import * as React from 'react';
import Layout from './layouts/main-layout';
import Menu from './components/menu';
import Content from './components/content'
import StyledStatusComp from './components/status-bar/status-bar';


export default  function UI () {
    return (
      <Layout>
        <Menu />
        <Content />
        <StyledStatusComp />
      </Layout>
    );
}
