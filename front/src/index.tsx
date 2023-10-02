import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import { StyleSheetManager } from 'styled-components';

const host = document.getElementById('root');
host.style.all = 'initial';
host.style.zIndex = '999';

const shadow = host.attachShadow({ mode: 'open' });
const styles = document.createElement('section');
shadow.appendChild(styles);
const renderIn = document.createElement('div');
styles.appendChild(renderIn);

const root = createRoot(shadow!);
root.render(<StyleSheetManager target={styles}><App /></StyleSheetManager>)