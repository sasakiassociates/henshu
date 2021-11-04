import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import typescript from '@rollup/plugin-typescript';

import pkg from './package.json'

export default {

    input: 'src/index.ts',

    output: [
        {
            file: pkg.main,
            format: 'cjs',
            sourcemap: true
        },
        {
            file: pkg.module,
            format: 'es',
            sourcemap: true
        }
    ],

    plugins: [
        peerDepsExternal(),
        nodeResolve({ preferBuiltins: true }),
        commonjs(),
        postcss({ plugins: [] }),
        typescript(),
    ],

    onwarn(warning) {
        if (warning.code !== 'THIS_IS_UNDEFINED') {
            console.warn(warning.message);
        }
    },
}
