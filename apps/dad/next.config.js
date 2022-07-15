// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPlugins = require("next-compose-plugins");
const withNx = require('@nrwl/next/plugins/with-nx');
const { withFederatedSidecar } = require('@module-federation/nextjs-ssr');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  webpack5: true,
  webpack(config, options) {
    config.module.rules.push({
      test: /_app.js/,
      loader: '@module-federation/nextjs-ssr/lib/federation-loader.js',
    });

    return config;
  },
};

const remotes = isServer => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    dad: `dad@http://localhost:3000/_next/static/${location}/remoteEntry.js`,
    son: `son@http://localhost:3001/_next/static/${location}/remoteEntry.js`,
  };
};

const withFederationProvider = withFederatedSidecar(
  {
    name: 'dad',
    filename: 'static/chunks/remoteEntry.js',
    remotes,
    exposes: {
      './title': './components/title/title.tsx',
    },
    shared: {},
  },
  {
    experiments: {
      flushChunks: true,
      hot: true,
    },
  }
);

module.exports = module.exports = withPlugins([
  withNx,
  withFederationProvider
], nextConfig);
