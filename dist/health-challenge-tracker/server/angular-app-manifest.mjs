
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {},
  assets: {
    'index.csr.html': {size: 2208, hash: 'c7789f0da710d1e90cd0acf984d29a887f74c5e0c2fe5d7e22387f49750e745c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1021, hash: '2dce4065d0de4b5d9ddedd4e99d5cfc12ecd64ce372a8042c6d74c62ad0587dd', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-RCDTX57Z.css': {size: 10055, hash: '7iAJuFKMlng', text: () => import('./assets-chunks/styles-RCDTX57Z_css.mjs').then(m => m.default)}
  },
};
