/** @type {import('esbuild-node-tsc/dist/config').Config} */
module.exports = {
  esbuild: {
    packages: 'external',
    outdir: './dist',
    sourcemap: true,
    entryPoints: ['./src/index.ts'],
    bundle: true,
    minify: true,
    platform: 'node',
  },
  prebuild: async () => {
    console.log("prebuild");
    const rimraf = (await import("rimraf"));
    rimraf.sync("./dist"); // clean up dist folder
  },
};
