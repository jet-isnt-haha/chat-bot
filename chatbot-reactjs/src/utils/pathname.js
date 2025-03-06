//对查找当前url下路由的封装

function pathname(){

    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    let lastRouter = url.pathname.split('/').at(-1)

    return {lastRouter}
}

export {pathname}