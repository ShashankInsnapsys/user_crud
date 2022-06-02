<template>
    <div>
        <div
            class="m-3 fs-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
        >
            <font-awesome-icon icon="bars" />
        </div>

        <div
            class="offcanvas offcanvas-start"
            tabindex="-1"
            id="offcanvasExample"
            aria-labelledby="offcanvasExampleLabel"
        >
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasExampleLabel">Menu</h5>
                <button
                    type="button"
                    class="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>
            <div class="offcanvas-body">
                <div class="list-group list-group-flush">
                    <button
                        type="button"
                        class="list-group-item list-group-item-action"
                        @click="$router.push({ path: '/' })"
                    >
                        Users
                    </button>
                    <button
                        type="button"
                        class="list-group-item list-group-item-action"
                        @click="$router.push({ path: '/banks' })"
                    >
                        Banks
                    </button>
                    <button
                        type="button"
                        class="list-group-item list-group-item-action"
                        @click="$router.push({ path: '/branches' })"
                    >
                        Branches
                    </button>
                    <button
                        type="button"
                        class="list-group-item list-group-item-action"
                        @click="$router.push({ path: '/accounts' })"
                    >
                        Accounts
                    </button>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
// import List from "./components/List.vue";

// export default {
//     components: {
//         List,
//     },
// };
</script>
