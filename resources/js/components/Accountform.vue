<template>
    <div class="container">
        <center>
            <p class="h3 text-secondary heading">
                {{ $route.params.id ? "Edit Account" : "Create Account" }}
            </p>
        </center>
        <label for="" class="form-label">User Name</label>
        <input
            class="form-control mb-2"
            type="text"
            placeholder=""
            @focus="show = false"
            v-model="user_name"
            aria-label="default input example"
        />
        <div class="text-danger" v-text="this.error.user_name"></div>
        <label for="" class="form-label">Email</label>
        <input
            class="form-control mb-2"
            type="text"
            @focus="show = false"
            placeholder=""
            v-model="email"
            aria-label="default input example"
        />
        <div class="text-danger" v-text="this.error.email"></div>
        <label for="" class="form-label">Phone No.</label>
        <input
            class="form-control mb-2"
            type="text"
            @focus="show = false"
            placeholder=""
            v-model="phone_no"
            aria-label="default input example"
        />
        <div class="text-danger" v-text="this.error.phone_no"></div>
        <label for="" class="form-label">Account No.</label>
        <input
            class="form-control mb-2"
            type="text"
            @focus="show = false"
            placeholder=""
            v-model="account_no"
            aria-label="default input example"
        />
        <div class="text-danger" v-text="this.error.account_no"></div>
        <label for="" class="form-label">Account Type</label>
        <select
            class="form-select"
            id="account-type"
            @focus="show = false"
            aria-label="Default select example"
        >
            <option value="select" selected disabled>Select Type</option>
            <option
                value="saving"
                :selected="this.account_type == 'saving' ? true : false"
            >
                Savings
            </option>
            <option
                value="current"
                :selected="this.account_type == 'current' ? true : false"
            >
                Current
            </option>
        </select>
        <div class="text-danger" v-text="this.error.account_type"></div>
        <label for="" class="form-label">Bank Name</label>
        <select
            class="form-select"
            id="bank-name"
            aria-label="Default select example"
            @focus="show = false"
            @change="getBranch($event)"
        >
            <option value="select" selected disabled>Select Bank</option>
            <option
                :value="bank.id"
                v-for="bank in this.banks"
                :key="bank.id"
                :selected="this.bank_id == bank.id ? true : false"
            >
                {{ bank.bank_name }}
            </option>
        </select>
        <div class="text-danger" v-text="this.error.bank_name"></div>
        <label for="" class="form-label">Branch Name</label>
        <select
            class="form-select mb-2"
            id="branch-name"
            aria-label="Default select example"
            @focus="show = false"
        >
            <option value="select" selected disabled>Select Branch</option>
            <option
                :value="branch.id"
                v-for="branch in branches"
                :key="branch.id"
                :selected="this.branch_id == branch.id ? true : false"
            >
                {{ branch.branch_name }} - {{ branch.ifsc }}
            </option>
        </select>
        <div class="text-danger" v-text="this.error.branch_name"></div>
        <button
            type="submit"
            @click="addAccount()"
            class="btn btn-primary me-2"
            v-if="$route.params.id == ''"
        >
            Submit
        </button>
        <button
            type="submit"
            @click="editAccount()"
            class="btn btn-primary me-2"
            v-else
        >
            Update
        </button>
        <button @click="$router.back()" class="btn btn-link">Cancel</button>
        <div
            class="alert alert-success alert-dismissible fade show mt-3"
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
    </div>
</template>
<script>
import axios from "axios";
import { useRoute } from "vue-router";
export default {
    data() {
        const route = useRoute();
        return {
            id: route.params.id,
            user_name: "",
            email: "",
            phone_no: "",
            account_no: "",
            account_type: "",
            bank_id: "",
            branch_id: "",
            banks: {},
            branches: {},
            successmsg: "",
            show: false,
            error: {
                user_name: "",
                user_id: "",
                email: "",
                phone_no: "",
                account_no: "",
                account_type: "",
                bank_name: "",
                branch_name: "",
            },
        };
    },
    mounted() {
        if (this.id) {
            this.getData();
        }
        this.getBank();
        this.getAccountNo();
    },
    methods: {
        validate(
            user_name,
            email,
            phone_no,
            account_no,
            account_type,
            bank_name,
            branch_name
        ) {
            const emailregex = new RegExp(
                "[a-z][a-z0-9]+.[a-z0-9]+.[a-z0-9]+[@][a-z]+[.][a-z]+"
            );
            const accountnoregex = new RegExp("[1-9][0-9]{11}");
            const phoneregex = new RegExp("[1-9][0-9]{9}");
            let count = 0;
            if (user_name == "") {
                this.error.user_name = "please enter valid name";
                count++;
            } else {
                this.error.user_name = "";
            }
            if (!emailregex.test(email)) {
                this.error.email = "please enter valid email";
                count++;
            } else {
                this.error.email = "";
            }
            if (!accountnoregex.test(account_no)) {
                this.error.account_no = "account number should be of 12 digits";
                count++;
            } else {
                this.error.account_no = "";
            }
            if (!phoneregex.test(phone_no)) {
                this.error.phone_no = "please enter valid phone number";
                count++;
            } else {
                this.error.phone_no = "";
            }
            if (account_type == "select") {
                this.error.account_type = "please select valid account type";
                count++;
            } else {
                this.error.account_type = "";
            }
            if (bank_name == "select") {
                this.error.bank_name = "please select valid bank name";
                count++;
            } else {
                this.error.bank_name = "";
            }
            if (branch_name == "select") {
                this.error.branch_name = "please select valid branch name";
                count++;
            } else {
                this.error.branch_name = "";
            }
            if (count > 0) {
                return false;
            }
            return true;
        },
        addAccount() {
            if (
                this.validate(
                    this.user_name,
                    this.email,
                    this.phone_no,
                    this.account_no,
                    document.querySelector("#account-type").value,
                    document.querySelector("#bank-name").value,
                    document.querySelector("#branch-name").value
                )
            ) {
                axios
                    .get(
                        `http://127.0.0.1:8000/form/getaccountbyemail/${this.email}`
                    )
                    .then((res) => {
                        if (res.data.length == 0) {
                            // user will add
                            axios
                                .post("http://127.0.0.1:8000/form/user", {
                                    name: this.user_name,
                                    email: this.email,
                                    phone_no: this.phone_no,
                                })
                                .then((res) => {
                                    console.log(res.data.id);
                                    // will add new user to account
                                    axios
                                        .post(
                                            `http://127.0.0.1:8000/form/account`,
                                            {
                                                account_number: this.account_no,
                                                account_type:
                                                    document.querySelector(
                                                        "#account-type"
                                                    ).value,
                                                user_id: res.data.id,
                                                branch_id:
                                                    document.querySelector(
                                                        "#branch-name"
                                                    ).value,
                                            }
                                        )
                                        .then((res) => {
                                            this.successmsg = "Account added";
                                            this.show = true;
                                        });
                                });
                        } else {
                            // user will update
                            axios
                                .put(
                                    `http://127.0.0.1:8000/form/user/${res.data[0].id}`,
                                    {
                                        name: this.user_name,
                                        email: this.email,
                                        phone_no: this.phone_no,
                                    }
                                )
                                .then((res) => {
                                    // will add account for existing user
                                    axios
                                        .post(
                                            `http://127.0.0.1:8000/form/account`,
                                            {
                                                account_number: this.account_no,
                                                account_type:
                                                    document.querySelector(
                                                        "#account-type"
                                                    ).value,
                                                user_id: res.data.id,
                                                branch_id:
                                                    document.querySelector(
                                                        "#branch-name"
                                                    ).value,
                                            }
                                        )
                                        .then((res) => {
                                            this.successmsg = "Account added";
                                            this.show = true;
                                        });
                                });
                        }
                    });
            }
        },
        editAccount() {
            if (
                this.validate(
                    this.user_name,
                    this.email,
                    this.phone_no,
                    this.account_no,
                    document.querySelector("#account-type").value,
                    document.querySelector("#bank-name").value,
                    document.querySelector("#branch-name").value
                )
            ) {
                axios
                    .put(`http://127.0.0.1:8000/form/user/${this.user_id}`, {
                        name: this.user_name,
                        email: this.email,
                        phone_no: this.phone_no,
                    })
                    .then(() => {});
                axios
                    .put(`http://127.0.0.1:8000/form/account/${this.id}`, {
                        account_no: this.account_no,
                        account_type:
                            document.querySelector("#account-type").value,
                        user_id: this.user_id,
                        branch_id: document.querySelector("#branch-name").value,
                    })
                    .then(() => {
                        this.show = true;
                        this.successmsg = "Account updated successfuly";
                    });
            }
        },
        getAccountNo() {
            if (!this.id) {
                this.account_no = Math.floor(
                    Math.random() * 10000000000 + 99999999999
                );
            }
        },
        getBank() {
            axios.get("http://127.0.0.1:8000/form/getbank").then((res) => {
                this.banks = res.data;
                // console.log(res);
            });
        },
        getBranch(e) {
            var bank_id = e.target.value;
            axios
                .get(`http://127.0.0.1:8000/form/getrelatedbranch/${bank_id}`)
                .then((res) => {
                    this.branches = res.data;
                    // console.log(res);
                });
        },
        getData() {
            axios
                .get(`http://127.0.0.1:8000/form/account/${this.id}`)
                .then((res) => {
                    this.account_no = res.data.account_number;
                    this.account_type = res.data.account_type;
                    this.branch_id = res.data.branch_id;
                    axios
                        .get(
                            `http://127.0.0.1:8000/form/user/${res.data.user_id}`
                        )
                        .then((res) => {
                            this.user_name = res.data.name;
                            this.user_id = res.data.id;
                            this.email = res.data.email;
                            this.phone_no = res.data.phone_no;
                        });
                    axios
                        .get(
                            `http://127.0.0.1:8000/form/branch/${res.data.branch_id}`
                        )
                        .then((res) => {
                            this.bank_id = res.data.bank_id;
                            axios
                                .get(
                                    `http://127.0.0.1:8000/form/getrelatedbranch/${this.bank_id}`
                                )
                                .then((res) => {
                                    this.branches = res.data;
                                    // console.log(res);
                                });
                        });
                });
        },
    },
};
</script>
