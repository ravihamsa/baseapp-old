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
            name: 'apps/examples',
            include: [
                'apps/examples/app'
            ],
            exclude: ['common']
        }


    ]
})
