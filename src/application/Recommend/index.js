import React, { useEffect } from "react";
import Slider from "../../components/slider";
import RecommendList from "../../components/list";
import Scroll from "../../baseUI/scroll";
import { Content } from "./style";
import { useSelector, useDispatch } from "react-redux";
import * as actionTypes from "./store/actionCreators";
import { forceCheck } from "react-lazyload";
import Loading from "../../baseUI/loading/index";
import { renderRoutes } from "react-router-config";

function Recommend(props) {
  const bannerList = useSelector((state) => {
    return state.getIn(["recommend", "bannerList"]);
  });
  const recommendList = useSelector((state) =>
    state.getIn(["recommend", "recommendList"])
  );
  const enterLoading = useSelector((state) =>
    state.getIn(["recommend", "enterLoading"])
  );
  const dispatch = useDispatch();

  useEffect(() => {
    !bannerList.size && dispatch(actionTypes.getBannerList());
    !recommendList.size && dispatch(actionTypes.getRecommendList());
    //eslint-disable-next-line
  }, []);

  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];

  return (
    <Content>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
      {enterLoading ? <Loading></Loading> : null}
      {renderRoutes(props.route.routes)}
    </Content>
  );
}

export default React.memo(Recommend);
