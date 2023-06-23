//@ts-check
if (process.env.CONFIG_ENV === 'local') {
    require('dotenv').config({ path: './apps/frontend/.env.local.public' });
    require('dotenv').config({ path: './apps/frontend/.env.local.secret' });
} else if (process.env.CONFIG_ENV === 'dev') {
    require('dotenv').config({ path: './apps/frontend/.env.dev.public' });
    require('dotenv').config({ path: './apps/frontend/.env.dev.secret' });
} else if (process.env.CONFIG_ENV === 'staging') {
    require('dotenv').config({ path: './apps/frontend/.env.staging.public' });
    require('dotenv').config({ path: './apps/frontend/.env.staging.secret' });
} else if (process.env.CONFIG_ENV === 'prod') {
    require('dotenv').config({ path: './apps/frontend/.env.prod.public' });
    require('dotenv').config({ path: './apps/frontend/.env.prod.secret' });
}

const { withNx } = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
    nx: {
        // Set this to true if you would like to use SVGR
        // See: https://github.com/gregberge/svgr
        svgr: false,
    },
    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true,
    },
};

module.exports = withNx(nextConfig);
