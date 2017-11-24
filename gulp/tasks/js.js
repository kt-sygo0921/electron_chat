import gulp from 'gulp';
import {FuseBox,BabelPlugin} from 'fuse-box';

const path = require('path');

const rootpath = path.resolve();

function bundle() {
    const fuse = new FuseBox({
        homeDir: `${rootpath}/src/js/`,
        output: `${rootpath}/view/js/$name.js`,
        target: 'browser',
        sourceMaps: true,
        plugins:[
            BabelPlugin({
                presets:['es2015','react']
            })
        ]
    });
    fuse.bundle('bundle').instructions('> app.tsx');
    return fuse.run();
}
gulp.task('js', () => {
     bundle();
});
