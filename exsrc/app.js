import {render} from 'react-dom';

import routers from './routers';

render(routers,document.getElementById('react-main'));
if (module.hot) {
    module.hot.accept();
}