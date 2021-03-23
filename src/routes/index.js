/*
 * @Author: your name
 * @Date: 2021-03-18 20:20:39
 * @LastEditTime: 2021-03-18 20:33:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cloud-music\src\routes\index.js
 */
//routes/index.js
import React from "react";
import { Redirect } from "react-router-dom";
import Home from "../application/Home";
import Recommend from "../application/Recommend";
import Singers from "../application/Singers";
import Rank from "../application/Rank";
import Album from "../application/Album";

// eslint-disable-next-line
export default [
  {
    path: "/",
    component: Home,
    routes: [
      {
        path: "/",
        exact: true,
        render: () => <Redirect to={"/recommend"} />,
      },
      {
        path: "/recommend",
        component: Recommend,
        routes: [
          {
            path: "/recommend/:id",
            component: Album,
          },
        ],
      },
      {
        path: "/singers",
        component: Singers,
      },
      {
        path: "/rank",
        component: Rank,
        routes: [
          {
            path: "/rank/:id",
            component: Album,
          },
        ],
      },
    ],
  },
];
