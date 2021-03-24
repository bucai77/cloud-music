import React, { memo, useEffect, useState } from "react";
import Horizen from "../../baseUI/horizen-item";
import { categoryTypes, alphaTypes } from "../../api/config";
import { NavContainer, List, ListContainer, ListItem } from "./style";
import Scroll from "../../baseUI/scroll";
import {
  getSingerList,
  getHotSingerList,
  changeEnterLoading,
  changePageCount,
  refreshMoreSingerList,
  changePullUpLoading,
  changePullDownLoading,
  refreshMoreHotSingerList,
} from "./store/actionCreators";
import { connect } from "react-redux";
import Loading from "../../baseUI/loading";
import LazyLoad, { forceCheck } from "react-lazyload";
import singerSrc from "./singer.png";
import { renderRoutes } from 'react-router-config';

function Singers(props) {
  const {
    singerList,
    pullUpLoading,
    pullDownLoading,
    pageCount,
    enterLoading,
  } = props;
  const {
    updateDispatch,
    getHotSingerDispatch,
    pullUpRefreshDispatch,
    pullDownRefreshDispatch,
  } = props;

  const [category, setCategory] = useState("");
  const [alpha, setAlpha] = useState("");

  // 首次加载
  useEffect(() => {
    getHotSingerDispatch();
    // eslint-disable-next-line
  }, []);

  // 更新字母
  const handleUpdateAlpha = (val) => {
    setAlpha(val);
    updateDispatch(category, val);
  };

  // 更新分类
  const handleUpdateCatetory = (val) => {
    setCategory(val);
    updateDispatch(val, alpha);
  };

  // 上拉刷新
  const handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, category === "", pageCount);
  };

  // 下拉加载
  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha);
  };

  const enterDetail = (id)  => {
    props.history.push (`/singers/${id}`);
  };

  // 渲染函数，返回歌手列表
  const renderSingerList = () => {
    const singerListJS = singerList ? singerList.toJS() : [];
    return (
      <List>
        {singerListJS.map((item, index) => {
          return (
            <ListItem key={item.accountId + "" + index} onClick={() => enterDetail (item.id)}>
              <div className="img_wrapper">
                <LazyLoad
                  placeholder={
                    <img
                      width="100%"
                      height="100%"
                      src={singerSrc}
                      alt="music"
                    />
                  }
                >
                  <img
                    src={`${item.picUrl}?param=300x300`}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <div>
      <NavContainer>
        <Horizen
          list={categoryTypes}
          title={"分类 (默认热门):"}
          oldVal={category}
          handleClick={(val) => handleUpdateCatetory(val)}
        ></Horizen>
        <Horizen
          list={alphaTypes}
          title={"首字母:"}
          oldVal={alpha}
          handleClick={(val) => handleUpdateAlpha(val)}
        ></Horizen>
      </NavContainer>
      <ListContainer>
        <Scroll
          onScroll={forceCheck}
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
        >
          {renderSingerList()}
        </Scroll>
        <Loading show={enterLoading}></Loading>
      </ListContainer>
      { renderRoutes (props.route.routes) }
    </div>
  );
}

const mapStateToProps = (state) => ({
  singerList: state.getIn(["singers", "singerList"]),
  enterLoading: state.getIn(["singers", "enterLoading"]),
  pullUpLoading: state.getIn(["singers", "pullUpLoading"]),
  pullDownLoading: state.getIn(["singers", "pullDownLoading"]),
  pageCount: state.getIn(["singers", "pageCount"]),
});

const mapDispatchToProps = (dispatch) => {
  return {
    // 初始化
    getHotSingerDispatch() {
      dispatch(getHotSingerList());
    },
    // 筛选
    updateDispatch(category, alpha) {
      dispatch(changePageCount(0)); //由于改变了分类，所以pageCount清零
      dispatch(changeEnterLoading(true)); //loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
      dispatch(getSingerList(category, alpha));
    },
    // 上拉加载
    pullUpRefreshDispatch(category, alpha, hot, count) {
      dispatch(changePullUpLoading(true));
      dispatch(changePageCount(count + 1));
      if (hot) {
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList(category, alpha));
      }
    },
    //下拉刷新
    pullDownRefreshDispatch(category, alpha) {
      dispatch(changePullDownLoading(true));
      dispatch(changePageCount(0)); //属于重新获取数据
      if (category === "" && alpha === "") {
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList(category, alpha));
      }
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(memo(Singers));
