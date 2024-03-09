export default function ({from, route, app}) { 
    if (typeof  route.query.redirect !== "undefined") { 
        app.$cookies.set("last-location", route.query.redirect); 
    } else {
        if (from) {
            if (from.path == '/login' || from.path == '/register' || from.path == '/forgot-password') {
                app.$cookies.remove("last-location");
            } else {
                app.$cookies.set("last-location", from.path);  
            }
        } else {
            app.$cookies.remove("last-location"); 
        }  
    }  
}