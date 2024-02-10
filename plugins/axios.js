export default function({ $axios, store, redirect, $auth }) {
    $axios.onError(error => {
        if (error.response.status === 422 || error.response.status === 404) {
            store.dispatch(
                "validation/setErrors",
                error.response.data.errors ? error.response.data.errors : ""
            );
            store.dispatch("loading/clearLoading");
        }
        if (error.response.status === 401) {
            if ($auth.loggedIn) {
                $auth.logout();
            }
            redirect("/");
        }
        return Promise.reject(error);
    });

    $axios.onRequest((c) => {
        store.dispatch("validation/clearErrors");
        store.dispatch("validation/clearSuccess");
        c.headers.common['Cache-Control'] = `s-maxage=1000, stale-while-revalidate`;
    });
    $axios.setBaseURL(process.env.baseUrl);
    $axios.onResponse(res => {
        if (res.status === 200)
            store.dispatch(
                "validation/setSuccess",
                res.data.message ? res.data.message : ""
            );
    });
}