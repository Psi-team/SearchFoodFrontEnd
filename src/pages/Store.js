import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { Container, CircularProgress } from '@material-ui/core';

import useMountEffect from '../helpers/useMountEffect';
import { shopActions } from '../redux/actions';
import DetailView from '../components/DetailView';
import LeaveMessage from '../components/LeaveMessageView';
import MessageView from '../components/MessageView';

const Store = ({ store, loading, fetchStore }) => {
  const param = useParams();
  const isFetching = loading || Object.keys(store).length === 0;
  const storeId = param.storename.split('-')[1];
  useMountEffect(() => {
    if (isFetching) {
      fetchStore(storeId);
    }
  }, []);

  return (
    <Container>
      {isFetching ? (
        <CircularProgress />
      ) : (
        <>
          <DetailView data={store} />
          <LeaveMessage storeId={storeId} />
          <MessageView data={store.comments} />
        </>
      )}
    </Container>
  );
};

Store.propTypes = {
  store: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  fetchStore: PropTypes.func.isRequired,
};

function mapStateToProp(state) {
  return {
    store: state.storeDetail.store,
    loading: state.storeDetail.loading,
  };
}

const actionCreator = {
  fetchStore: shopActions.fetchStore,
};

export default connect(mapStateToProp, actionCreator)(Store);
