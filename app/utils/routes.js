import React from 'react';
import styled from 'styled-components';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import { Icon, Menu } from 'antd';

import NotFoundPage from 'containers/NotFoundPage/Loadable';

const BreadcrumbLink = styled(Link)`
  color: rgba(0, 0, 0, ${props => (props.last ? 0.65 : 0.45)});
`;

const MenuTitle = styled.span`
  font-size: 0.8em;
`;

function joinPath(base, path) {
  const result = `${base.replace(/\/$/, '')}/${path}`;
  return result.replace(/\/$/, '');
}

function BreadcrumbRecursive(basePath, r) {
  return (
    <Switch>
      {r.map(route => (
        <Route
          strict
          exact={!(route.children && route.children.length > 0)}
          key={joinPath(basePath, route.path)}
          path={joinPath(basePath, route.path)}
        >
          <span>
            {route.title && <span className="ant-breadcrumb-separator">/</span>}
            <BreadcrumbLink
              last={route.children ? undefined : 'true'}
              className="ant-breadcrumb-link"
              to={joinPath(basePath, route.path)}
            >
              {route.title}
            </BreadcrumbLink>
            {route.children &&
              route.children.length > 0 &&
              BreadcrumbRecursive(
                joinPath(basePath, route.path),
                route.children,
              )}
          </span>
        </Route>
      ))}
    </Switch>
  );
}

function MenuRecursive(basePath, r) {
  return r
    .filter(route => !route.hidden)
    .map(route => {
      let view = (
        <Menu.Item key={joinPath(basePath, route.path)}>
          <Link to={joinPath(basePath, route.path)}>
            {route.icon && <Icon type={route.icon} />}
            <MenuTitle>{route.menu}</MenuTitle>
          </Link>
        </Menu.Item>
      );
      const title = (
        <span>
          <Icon type={route.icon} />
          <MenuTitle>{route.menu}</MenuTitle>
        </span>
      );
      if (route.children && route.children.length > 0) {
        view = (
          <Menu.SubMenu title={title} key={joinPath(basePath, route.path)}>
            {MenuRecursive(joinPath(basePath, route.path), route.children)}
          </Menu.SubMenu>
        );
      }
      return view;
    });
}

export function BreadcrumbGen(basePath, r) {
  return (
    <div style={{ margin: '16px 0' }}>
      <BreadcrumbLink className="ant-breadcrumb-link" to={basePath}>
        {/* <Icon type="home" style={{ fontSize: 16 }} /> */}
        Home
      </BreadcrumbLink>
      {BreadcrumbRecursive(basePath, r)}
    </div>
  );
}

export function RouterRecursive(basePath, r) {
  return (
    <Switch>
      {r.map(route => (
        <Route
          strict
          exact={!(route.children && route.children.length > 0)}
          key={joinPath(basePath, route.path)}
          path={joinPath(basePath, route.path)}
          component={route.component}
        >
          {route.children &&
            route.children.length > 0 &&
            RouterRecursive(joinPath(basePath, route.path), route.children)}
        </Route>
      ))}
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export function RouterGen(basePath, r, defaultPath) {
  return (
    <Switch>
      {defaultPath && (
        <Route
          exact
          path={basePath}
          render={() => (
            <Redirect to={{ pathname: joinPath(basePath, defaultPath) }} />
          )}
        />
      )}
      {r.map(route => (
        <Route
          strict
          exact={!(route.children && route.children.length > 0)}
          key={joinPath(basePath, route.path)}
          path={joinPath(basePath, route.path)}
          component={route.component}
        >
          {route.children &&
            route.children.length > 0 &&
            RouterRecursive(joinPath(basePath, route.path), route.children)}
        </Route>
      ))}
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export function MenuGen(basePath, r) {
  return MenuRecursive(basePath, r);
}
