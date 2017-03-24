//如果外壳是APP的话,跳入三级页面的时候在当前页面加入SOURCE=APP和VERSION=版本号
// function locationHref(){
//     var source =window.localStorage.getItem('source');
//     var version = window.localStorage.getItem('version');
//     var url = window.location.href;
//     if(source url.indexOf("?") > 0){
//         window.location.href= url +"&source="+source+"&version="+version;
//         return ;
//     }else{
//         window.location.href= url +"?source="+source+"&version="+version;
//         return ;
//     }
// }
// locationHref();