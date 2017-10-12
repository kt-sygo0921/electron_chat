import gulp from 'gulp';
import {FuseBox,BabelPlugin} from 'fuse-box';

const path = require('path');

let app;
const rootpath = path.resolve();

function bundle() {
    const fuse = new FuseBox({
        homeDir: `${rootpath}/src/js/`,
        output: `${rootpath}/view/js/$name.js`,
        target: 'browser',
        plugins:[
            BabelPlugin({
                presets:['es2015','react']
            })
        ]
    });
    app = fuse.bundle('bundle').instructions('> common.js');
    return fuse.run();
}
gulp.task('js', () => {
    return bundle();
});
