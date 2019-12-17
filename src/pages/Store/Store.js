import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DetailView from './DetailView';
import CommentsView from './CommentsView';
import { Container, CircularProgress } from '@material-ui/core';

const Store = ({ store, loading }) => {
  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <DetailView data={store} />
          <CommentsView data={store.comments} />
        </>
      )}
    </Container>
  );
};

Store.propTypes = {
  store: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProp(state) {
  return {
    store: state.fetchStore.store,
    loading: state.fetchStore.loading,
  };
}

export default connect(mapStateToProp)(Store);
