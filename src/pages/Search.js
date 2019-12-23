import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router';
import { List, WindowScroller } from 'react-virtualized';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles, Container, Grid, useMediaQuery } from '@material-ui/core';

import SettingBar from '../components/SettingBar';
import StoreCardView from '../components/StoreCardView';
import BottomBar from '../components/BottomBar';

import 'react-virtualized/styles.css';
import Loading from '../components/Loading';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
}));

const Search = ({ loading, datas }) => {
  const [currentData, setCurrentData] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [pageIndex, setPageIndex] = useState(Number(params.get('page')) || 1);
  const match = useMediaQuery(theme => theme.breakpoints.down('xs'));
  const path = `/search${location.search.split('&page')[0]}`;
  useEffect(() => {
    if (datas.length !== 0) {
      const newRangeDatas = datas.slice(24 * (pageIndex - 1), 24 * pageIndex);
      setCurrentData(newRangeDatas);
    }
  }, [pageIndex, datas]);

  useLayoutEffect(() => {
    if (match) {
      setCurrentData(datas);
    } else {
      const newRangeDatas = datas.slice(24 * (pageIndex - 1), 24 * pageIndex);
      setCurrentData(newRangeDatas);
    }
  }, [match, datas, pageIndex]);

  const classes = useStyles();

  function sortByStar(powerOperaton) {
    // TODO: 這邊直接對原本data做修改，不應該這樣處理，之後再回來調整
    datas.sort((a, b) =>
      a.star > b.star ? -1 * powerOperaton : 1 * powerOperaton
    );
    if (pageIndex === 1) {
      setCurrentData(datas.slice(0, 24));
    } else {
      setPageIndex(1);
    }
  }

  function sortByCreatedDate() {
    datas.sort((a, b) => (a.createdDate > b.createdDate ? -1 : 1));
    if (pageIndex === 1) {
      setCurrentData(datas.slice(0, 24));
    } else {
      setPageIndex(1);
    }
  }

  function changePageIndex(type, page) {
    switch (type) {
      case 'order':
        setPageIndex(page);
        break;
      case 'prev':
        setPageIndex(pageIndex === 1 ? pageIndex : pageIndex - 1);
        break;
      case 'next':
        setPageIndex(
          pageIndex === datas.length - 1 ? pageIndex : pageIndex + 1
        );
        break;
      default:
        throw new Error(`unknown type ${type}`);
    }
  }

  function rowRenderer({ key, index, style }) {
    return (
      <Grid key={key} item lg={3} md={4} sm={6} xs={12} style={style}>
        <StoreCardView data={currentData[index]} />
      </Grid>
    );
  }

  return (
    <Container className={classes.root}>
      <Loading loading={loading} />
      <SettingBar
        path={path}
        match={match}
        length={Math.ceil(datas.length / 24)}
        pageIndex={pageIndex}
        changePageIndex={changePageIndex}
        sortByStar={sortByStar}
        sortByCreatedDate={sortByCreatedDate}
      />
      {/* TODO: 尚未解決react-virtualize grid 排法 先以match控制 */}
      {match ? (
        <WindowScroller>
          {({ width, height, isScrolling, onChildScroll, scrollTop }) => (
            <List
              autoHeight
              height={height}
              isScrolling={isScrolling}
              onScroll={onChildScroll}
              rowCount={currentData.length}
              rowHeight={450}
              rowRenderer={rowRenderer}
              scrollTop={scrollTop}
              width={width - 32} //padding 16
            />
          )}
        </WindowScroller>
      ) : (
        <Grid container justify="flex-start" alignitems="center" spacing={3}>
          {currentData.map((_, index) => rowRenderer({ key: index, index }))}
        </Grid>
      )}
      {match ? (
        ''
      ) : (
        <BottomBar
          length={Math.ceil(datas.length / 24)}
          pageIndex={pageIndex}
          changePageIndex={changePageIndex}
          path={path}
        />
      )}
    </Container>
  );
};

Search.propTypes = {
  loading: PropTypes.bool.isRequired,
  datas: PropTypes.array.isRequired,
};

function mapStateToProp(state) {
  return {
    loading: state.searchStores.loading,
    datas: state.searchStores.stores,
  };
}

export default connect(mapStateToProp)(Search);
