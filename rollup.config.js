//import path from 'path/posix';
//import banner from 'rollup-plugin-banner';
import clear from 'rollup-plugin-clear';
import cleanup from 'rollup-plugin-cleanup';

export default {
    input: './index.js',
    output: {
        file: './dist/badoo-auto-filter.userscript.js',
        format: 'cjs'
    },
    plugins: [
        // Clean dist directory before bundling
        clear({
            // required, point out which directories should be cleared.
            targets: ['dist'],
            // optional, whether clear the directores when rollup recompile on --watch mode.
            watch: true, // default: false
        }),
        // Don't include comments in bundle
        cleanup({
            comments: 'eslint',
        }),
        // banner({
        //     file: path.join(__dirname, './prefixTamperMonkey.js'),
        //     encoding: 'utf-8', // default is utf-8
        // }),
    ],
};