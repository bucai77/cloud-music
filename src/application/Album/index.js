//src/application/Album/index.js
import React, { useState } from "react";
import { Container } from "./style";
import { CSSTransition } from "react-transition-group";
import Header from "./../../baseUI/header/index";
function Album(props) {
  const [showStatus, setShowStatus] = useState(true);
  const handleBack = () => {
    setShowStatus(false);
  };
  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      // 先让页面切出动画执行一次，然后在动画执行完的瞬间跳转路由
      onExited={props.history.goBack}
    >
      <Container>
        <Header title={"返回"} handleClick={handleBack}></Header>
      </Container>
    </CSSTransition>
  );
}

export default Album;
