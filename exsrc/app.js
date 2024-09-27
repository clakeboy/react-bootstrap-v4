import {render} from 'react-dom';

import routers from './routers';

import './css/main.less';

import { i18n } from '../src';
// i18n.setLang('en')

render(routers,document.getElementById('react-main'));
if (module.hot) {
    module.hot.accept();
}