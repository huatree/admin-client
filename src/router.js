/* 渲染路由封装 */

/* 调用模块
---------------------------------------------------------------- */
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

/* 唯一的模块导出
---------------------------------------------------------------- */
const renderRoutes = (routes, authed, authPath = '/login', extraProps = {}, switchProps = {}) => {
  if (!routes) return null
  return (
    <Switch {...switchProps}>
      {routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={routeProps => {
            if (!route.requiresAuth || authed) {
              return <route.component {...routeProps} {...extraProps} route={route} />
            }
            return <Redirect to={{ pathname: authPath, state: { from: routeProps.location } }} />
          }}
        />
      ))}
    </Switch>
  )
}

export default renderRoutes
