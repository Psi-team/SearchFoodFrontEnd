import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { Container, CircularProgress } from '@material-ui/core';

import useMountEffect from '../helpers/useMountEffect';
import { shopActions } from '../redux/actions';
import DetailView from '../components/Stores/DetailView';
import LeaveMessage from '../components/Stores/LeaveMessageView';
import MessageView from '../components/Stores/MessageView';

const Store = ({ store, loading, fetchStore, favorites }) => {
  const param = useParams();
  const isFetching = loading || Object.keys(store).length === 0;
  const storeId = param.storename.split('-')[1];
  useMountEffect(() => {
    if (isFetching) {
      fetchStore(storeId);
    }
  });

  return (
    <Container>
      {isFetching ? (
        <CircularProgress />
      ) : (
        <>
          <DetailView
            data={{
              ...store,
              storeId,
              isFavorite: favorites.some(f => f.storeId === storeId),
            }}
          />
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
  favorites: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.oneOf([undefined]), PropTypes.object])
  ).isRequired,
};

function mapStateToProp(state) {
  return {
    store: state.storeDetail.store,
    loading: state.storeDetail.loading,
    favorites: state.user.favorites || [],
  };
}

const actionCreator = {
  fetchStore: shopActions.fetchStore,
};

export default connect(mapStateToProp, actionCreator)(Store);
