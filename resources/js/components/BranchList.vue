<template>
    <div class="container">
        <div class="text-end mb-3">
            <button
                @click="$router.push({ path: '/branch/form' })"
                class="btn btn-primary"
            >
                Add Branch
            </button>
        </div>
        <jl-datatable
            :url="datatable.url"
            :columns="datatable.columns"
            :isReload="this.$store.state.reload"
        />
    </div>
</template>
<script>
import axios from "axios";
import Buttons from "./Button.vue";

export default {
    data() {
        return {
            datatable: {
                url: "http://127.0.0.1:8000/form/branch",
                isSearch: true,
                // isReload: ,
                columns: [
                    {
                        title: "Branch Name",
                        key: "branch_name",
                    },
                    {
                        title: "IFSC",
                        key: "ifsc",
                    },
                    {
                        title: "Bank",
                        key: "bank_name",
                    },
                    {
                        title: "Actions",
                        key: "id",
                        isAction: true,
                        component: {
                            ...Buttons,
                            methods: {
                                onBtnClickDelete: (id) => {
                                    if (confirm("Are you sure?")) {
                                        axios
                                            .delete(
                                                `http://127.0.0.1:8000/form/branch/${id}`
                                            )
                                            .then(() => {
                                                this.$store.dispatch(
                                                    "changedata"
                                                );
                                                setTimeout(() => {
                                                    this.$store.dispatch(
                                                        "changedata"
                                                    );
                                                }, 1000);
                                            });
                                    }
                                },
                                onBtnClickEdit: (id) => {
                                    this.$router.push({
                                        path: `/branch/form/${id}`,
                                    });
                                },
                            },
                        },
                    },
                ],
            },
        };
    },
    mounted() {
        console.log(this.datatable.columns);
    },
    methods: {},
};
</script>
<style></style>
