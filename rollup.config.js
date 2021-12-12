//import path from 'path/posix';
//import banner from 'rollup-plugin-banner';
import clear from 'rollup-plugin-clear';

export default {
    input: './index.js',
    output: {
        file: './dist/badoo-auto-filter.userscript.js',
        format: 'cjs'
    },
    plugins: [
        clear({
            // required, point out which directories should be clear.
            targets: ['dist'],
            // optional, whether clear the directores when rollup recompile on --watch mode.
            watch: true, // default: false
        }),
        // banner({
        //     file: path.join(__dirname, './prefixTamperMonkey.js'),
        //     encoding: 'utf-8', // default is utf-8
        // }),
    ],
};