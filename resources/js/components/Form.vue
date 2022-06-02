<template>
    <div class="container">
        <div>
            <center>
                <p class="h3 text-secondary heading">
                    {{ $route.params.id ? "Edit User" : "Create User" }}
                </p>
            </center>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Name</label>
                <input
                    @focus="show = false"
                    type="text"
                    class="form-control name"
                    v-model="name"
                    aria-describedby="emailHelp"
                />
                <div
                    id="title-error"
                    class="form-text text-danger"
                    v-text="this.error.name"
                ></div>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label"
                    >Email</label
                >
                <input
                    type="text"
                    class="form-control email"
                    name="email"
                    v-model="email"
                    @focus="show = false"
                    aria-describedby="emailHelp"
                />
                <div
                    id="description-error"
                    class="form-text text-danger"
                    v-text="this.error.email"
                ></div>
            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label"
                    >Phone No.</label
                >
                <input
                    type="text"
                    class="form-control mobile"
                    @focus="show = false"
                    v-model="mobile"
                />
                <div
                    id="userid-error"
                    class="form-text text-danger"
                    v-text="this.error.mobile"
                ></div>
            </div>
            <div
                class="alert alert-success alert-dismissible fade show"
                role="alert"
                v-if="show"
            >
                {{ this.successmsg }}
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    @click="show = !show"
                ></button>
            </div>
            <button
                type="submit"
                @click="addUser()"
                class="btn btn-primary me-2"
                v-if="$route.params.id == ''"
            >
                Submit
            </button>
            <button
                type="submit"
                @click="editUser()"
                class="btn btn-primary me-2"
                v-else
            >
                Update
            </button>
            <button @click="$router.back()" class="btn btn-link">Cancel</button>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { useRoute } from "vue-router";
export default {
    data() {
        const route = useRoute();
        return {
            successmsg: "",
            id: route.params.id,
            error: {
                name: "",
                email: "",
                mobile: "",
            },
            name: "",
            email: "",
            mobile: "",
            show: false,
        };
    },
    mounted() {
        if (this.id) {
            this.getData();
        }
    },
    methods: {
        validate(name, email, phone) {
            // this.error = {
            //     name: "",
            //     email: "",
            //     mobile: "",
            // };
            let count = 0;
            const emailregex = new RegExp(
                "[a-z][a-z0-9]+.[a-z0-9]+.[a-z0-9]+[@][a-z]+[.][a-z]+"
            );
            const phoneregex = new RegExp("[1-9][0-9]{9}");
            if (name === "") {
                this.error.name = "please enter valid name";
                count++;
                this.show = false;
            } else {
                this.error.name = "";
            }
            if (!emailregex.test(email)) {
                this.error.email = "please enter valid email";
                count++;
                this.show = false;
            } else {
                this.error.email = "";
            }
            if (!phoneregex.test(phone)) {
                this.error.mobile = "please enter valid phone number";
                count++;
                this.show = false;
            } else {
                this.error.mobile = "";
            }
            if (count > 0) {
                return false;
            }
            return true;
            // console.log(
            //     this.error.email === "" &&
            //         this.error.name === "" &&
            //         this.error.mobile === ""
            // );
            // return (
            //     this.error.email === "" &&
            //     this.error.name === "" &&
            //     this.error.mobile === ""
            // );
        },
        addUser() {
            if (this.validate(this.name, this.email, this.mobile)) {
                axios
                    .post("http://127.0.0.1:8000/form/user", {
                        name: this.name,
                        email: this.email,
                        phone_no: this.mobile,
                    })
                    .then(() => {
                        this.show = true;
                        this.name = "";
                        this.email = "";
                        this.mobile = "";
                        this.successmsg = "User Added Successfuly";
                    });
            }
        },
        editUser() {
            if (this.validate(this.name, this.email, this.mobile)) {
                axios
                    .put(`http://127.0.0.1:8000/form/user/${this.id}`, {
                        name: this.name,
                        email: this.email,
                        phone_no: this.mobile,
                    })
                    .then(() => {
                        this.show = true;
                        this.successmsg = "Update Successful";
                    });
            }
        },
        getData() {
            axios
                .get(`http://127.0.0.1:8000/form/user/${this.id}`)
                .then((res) => {
                    this.name = res.data.name;
                    this.email = res.data.email;
                    this.mobile = res.data.phone_no;
                });
        },
    },
};
</script>
<style></style>
