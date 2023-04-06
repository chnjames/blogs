export default [
    ['link', {
        rel: 'icon',
        href: 'https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202206141707606.png'
    }],
    ['script', {
        async: true,
        src: 'https://www.googletagmanager.com/gtag/js?id=G-PF50YMCFTR'
    }],
    ['script', {}, [
        "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-PF50YMCFTR');",
    ]]
]