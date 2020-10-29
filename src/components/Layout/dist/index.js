exports.__esModule = true;
const react_1 = require('react');
const NavBar_1 = require('./NavBar');
require('./Layout.scss');
const useWindowSize_1 = require('utils/useWindowSize');

function Layout(_a) {
  const { children } = _a;
  const size = useWindowSize_1.default();
  return react_1.default.createElement(
    'div',
    { className: 'dashboard_layout' },
    react_1.default.createElement(
      'div',
      { className: 'grid-container' },
      react_1.default.createElement(NavBar_1.default, null),
      react_1.default.createElement(
        'div',
        { className: 'main' },
        react_1.default.createElement('main', null, children),
        (size === null || size === void 0 ? void 0 : size.width) &&
          (size === null || size === void 0 ? void 0 : size.width) > 768 &&
          react_1.default.createElement('div', {
            className: 'main-background'
          })
      )
    )
  );
}
exports.default = Layout;
