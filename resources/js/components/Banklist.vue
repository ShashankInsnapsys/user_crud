<template>
    <div class="container">
        <div class="text-end mb-3">
            <button
                @click="$router.push({ path: '/bank/form' })"
                class="btn btn-primary"
            >
                Add Bank
            </button>
        </div>

        <!-- <div v-if="userslist.length > 0"> -->
        <!-- <table class="table table-striped">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in userslist" :key="user.id">
                            <td>{{ user.name }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.phone_no }}</td>
                            <td>
                                <button
                                    class="btn btn-warning me-2"
                                    @click="
                                        $router.push({
                                            path: `/form/${user.id}`,
                                        })
                                    "
                                >
                                    Edit
                                </button>
                                <button
                                    class="btn btn-danger"
                                    @click="deleteuser(user.id)"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </table> -->
        <!-- </div> -->
        <!-- <div v-else>
            <div class="alert alert-info">No User Record</div>
        </div>-->
        <!-- <nav aria-label="...">
            <ul class="pagination">
                <li class="page-item disabled">
                    <a
                        class="page-link"
                        href="#"
                        tabindex="-1"
                        aria-disabled="true"
                        >Previous</a
                    >
                </li>
                <li class="page-item">
                    <a class="page-link" href="#">Next</a>
                </li>
            </ul>
        </nav> -->
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
                url: "http://127.0.0.1:8000/form/bank",
                isSearch: true,
                // isReload: ,
                columns: [
                    {
                        title: "Bank ID",
                        key: "id",
                    },
                    {
                        title: "Bank Name",
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
                                                `http://127.0.0.1:8000/form/bank/${id}`
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
                                        path: `/bank/form/${id}`,
                                    });
                                },
                            },
                        },
                    },
                ],
            },
        };
    },
    methods: {},
};
</script>
<style></style>
