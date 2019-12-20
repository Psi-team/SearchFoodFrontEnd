import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, CircularProgress } from '@material-ui/core';

import DetailView from './DetailView';
import CommentsView from './CommentsView';
import { shopActions } from '../../actions';
import useMountEffect from '../../helpers/useMountEffect';
import { useParams } from 'react-router';

const Store = ({ store, loading, fetchStore }) => {
  const param = useParams();
  useMountEffect(() => {
    if (loading || !store) {
      const storeId = param.storename.split('-')[1];
      fetchStore(storeId)
    }
  }, []);

  return (
    <Container>
      {loading || !store ? (
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
  fetchStore: PropTypes.func.isRequired
};

function mapStateToProp(state) {
  return {
    store: state.fetchStore.store,
    loading: state.fetchStore.loading,
  };
}

const actionCreator = {
  fetchStore: shopActions.fetchStore,
};

export default connect(mapStateToProp, actionCreator)(Store);
