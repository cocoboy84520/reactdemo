const { override, fixBabelImports, addLessLoader,addDecoratorsLegacy } = require('customize-cra');

const supportMjs = () => (webpackConfig) => {
    webpackConfig.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
    });
    return webpackConfig;
};

module.exports = override(
    addDecoratorsLegacy(),
    supportMjs(),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        // modifyVars: { '@primary-color': '#1DA57A' },
    }),
);
