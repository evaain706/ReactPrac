import React from 'react';
import { createRoot } from 'react-dom/client';
import {Provider} from 'react-redux';

import './index.css';
import App from './App';
import store from './store';

const root = createRoot(document.getElementById('root'));
root.render(
    // Provicer로 감싸기
    // prop으로는 만들어둔 redux store넣기
    <Provider store={store}> 
      <App />
    </Provider>
   );
