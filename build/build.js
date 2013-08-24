({
    appDir: '../',
    baseUrl: './js',
    paths: {
        jquery: "empty:",
        underscore: "empty:",
        backbone: "empty:",
        'text':'libs/requirejs-text-plugin'
    },
    dir: '../dist',
    optimize: 'none',
    fileExclusionRegExp: /(build|idea)/,
    modules: [
        {
            name: 'common',
            include: ['jquery',
                'backbone',
                'underscore',
                'text',
                'common/app',
                'common/bone',
                'common/widgets'
            ]
        },

        {
            name: 'apps/advertiser',
            include: [
                'apps/advertiser/app'
            ],
            exclude: ['common']
        },

        {
            name: 'apps/publisher',
            include: [
                'apps/publisher/app'
            ],
            exclude: ['common']
        },

        {
            name: 'apps/analyze',
            include: [
                'apps/analyze/app'
            ],
            exclude: ['common']
        },

        {
            name: 'apps/properties',
            include: [
                'apps/properties/app'
            ],
            exclude: ['common']
        },

        {
            name: 'apps/funds',
            include: [
                'apps/funds/app'
            ],
            exclude: ['common']
        },

        {
            name: 'apps/examples',
            include: [
                'apps/examples/app'
            ],
            exclude: ['common']
        }


    ]
})
