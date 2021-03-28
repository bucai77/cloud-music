/*
 * @Author: your name
 * @Date: 2021-03-18 20:21:12
 * @LastEditTime: 2021-03-28 14:16:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cloud-music\src\application\Home\index.js
 */
//src/appliction/Home/index.js
import React from 'react';
import { renderRoutes } from "react-router-config";
import {
    Top,
    Tab,
    TabItem,
} from './style';
import { NavLink } from 'react-router-dom';// 利用 NavLink 组件进行路由跳转
import Player from '../Player';

function Home(props) {
    const { route } = props;

    return (
        <div>
            <Top>
                <span className="iconfont menu">&#xe65c;</span>
                <span className="title">Web App</span>
                <span className="iconfont search">&#xe62b;</span>
            </Top>
            <Tab>
                <NavLink to="/recommend" activeClassName="selected"><TabItem><span > 推荐 </span></TabItem></NavLink>
                <NavLink to="/singers" activeClassName="selected"><TabItem><span > 歌手 </span></TabItem></NavLink>
                <NavLink to="/rank" activeClassName="selected"><TabItem><span > 排行榜 </span></TabItem></NavLink>
            </Tab>
            { renderRoutes(route.routes)}
            <Player></Player>
        </div>
    )
}

export default React.memo(Home);