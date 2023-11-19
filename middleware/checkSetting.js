export default function({ store, next, from, redirect }) {
    if (store.getters["authenticated"]) {
        store.dispatch("checkRequireFields").then(res => {
            if (res === false) {
                redirect("/users/settings?success=0");
            }
        });
    }
}