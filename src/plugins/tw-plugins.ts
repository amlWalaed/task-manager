import plugin from "tailwindcss/plugin";

export const appPlugin = plugin(function ({ addComponents, addUtilities }) {
    addUtilities({
        ".text-truncate": {
            "@apply break-all text-start line-clamp-1": {},
        },
        ".text-truncate-2": {
            "@apply overflow-hidden text-ellipsis whitespace-nowrap": {},
        },
        ".hideScrollbar::-webkit-scrollbar": {
            display: "none",
        },

        /* Hide scrollbar for IE, Edge and Firefox */
        ".hideScrollbar ": {
            "-ms-overflow-style": "none",
            /* IE and Edge */
            "scrollbar-width": "none",
            /* Firefox */
        },
    });

    addComponents({
       
    });
});

