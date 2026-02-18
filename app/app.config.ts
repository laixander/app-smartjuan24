export default defineAppConfig({
    ui: {
        colors: {
            primary: 'lime',
            neutral: 'neutral',
            red: 'red',
            orange: 'orange',
            amber: 'amber',
            yellow: 'yellow',
            lime: 'lime',
            green: 'green',
            emerald: 'emerald',
            teal: 'teal',
            cyan: 'cyan',
            sky: 'sky',
            blue: 'blue',
            indigo: 'indigo',
            violet: 'violet',
            purple: 'purple',
            fuchsia: 'fuchsia',
            pink: 'pink',
            rose: 'rose',
            slate: 'slate',
            gray: 'gray',
            zinc: 'zinc',
            stone: 'stone'
        },
        card: {
            slots: {
                root: 'rounded-2xl overflow-hidden',
            },
        },
        table: {
            slots: {
                th: 'text-default px-6',
                td: 'px-6',
            },
        },
        // button: {
        //     slots: {
        //         base: 'rounded-xl',
        //     },
        //     variants: {
        //         size: {
        //             xs: {
        //                 base: 'px-3.5 py-2.5 gap-2',
        //             }
        //         }
        //     },
        //     defaultVariants: {
        //         size: 'xs',
        //     },
        // },
    }
})
