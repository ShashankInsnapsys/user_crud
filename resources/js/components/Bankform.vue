<template>
    <div class="container">
        <center>
            <p class="h3 text-secondary heading">
                {{ $route.params.id ? "Edit Bank" : "Create Bank" }}
            </p>
        </center>
        <label for="exampleInputEmail1" class="form-label">Bank Name</label>
        <input
            class="form-control mb-2"
            type="text"
            placeholder=""
            v-model="name"
            @focus="show = false"
            aria-label="default input example"
        />
        <div class="text-danger" v-text="this.error.name"></div>
        <!-- <label for="exampleInputEmail1" class="form-label">Branch</label>
        <input
            class="form-control mb-2"
            type="text"
            placeholder=""
            v-model="branch"
            aria-label="default input example"
        />
        <div class="text-danger" v-text="this.error.branch"></div>
        <label for="exampleInputEmail1" class="form-label">IFSC</label>
        <input
            class="form-control mb-2"
            type="text"
            placeholder=""
            v-model="ifsc"
            aria-label="default input example"
        />
        <div class="text-danger" v-text="this.error.ifsc"></div> -->
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
            @click="addBank()"
            class="btn btn-primary me-2"
            v-if="$route.params.id == ''"
        >
            Submit
        </button>
        <button
            type="submit"
            @click="editBank()"
            class="btn btn-primary me-2"
            v-else
        >
            Update
        </button>
        <button @click="$router.back()" class="btn btn-link">Cancel</button>
    </div>
</template>
<script>
import { useRoute } from "vue-router";
export default {
    data() {
        const route = useRoute();
        return {
            successmsg: "",
            id: route.params.id,
            error: {
                name: "",
                branch: "",
                ifsc: "",
            },
            name: "",
            branch: "",
            ifsc: "",
            show: false,
        };
    },
    mounted() {
        if (this.id) {
            this.getData();
        }
    },
    methods: {
        // This is a method that is used to validate the form.
        validate(name, branch, ifsc) {
            let count = 0;
            const ifscregex = new RegExp("[1-9][0-9]{5}");
            if (name === "") {
                this.error.name = "please enter valid bank name";
                count++;
                this.show = false;
            } else {
                this.error.name = "";
            }
            // if (branch === "") {
            //     this.error.branch = "please enter valid branch name";
            //     count++;
            //     this.show = false;
            // } else {
            //     this.error.branch = "";
            // }
            // if (!ifscregex.test(ifsc)) {
            //     this.error.ifsc = "please enter valid ifsc";
            //     count++;
            //     this.show = false;
            // } else {
            //     this.error.ifsc = "";
            // }
            if (count > 0) {
                return false;
            }
            return true;
        },
        // This is the method that is called when the user clicks on the update button.
        editBank() {
            if (this.validate(this.name, this.branch, this.ifsc)) {
                axios
                    .put(`http://127.0.0.1:8000/form/bank/${this.id}`, {
                        bank_name: this.name,
                        // branch_name: this.branch,
                        // ifsc: this.ifsc,
                    })
                    .then(() => {
                        this.show = true;
                        this.successmsg = "Update Successful";
                    });
            }
        },
        // This is the method that is called when the user clicks on the submit button.
        addBank() {
            if (this.validate(this.name, this.branch, this.ifsc)) {
                axios
                    .post("http://127.0.0.1:8000/form/bank", {
                        bank_name: this.name,
                        // branch_name: this.branch,
                        // ifsc: this.ifsc,
                    })
                    .then(() => {
                        this.show = true;
                        this.name = "";
                        // this.branch = "";
                        // this.ifsc = "";
                        this.successmsg = "Bank added successfuly";
                    });
            }
        },
        // Getting the data from the database and displaying it in the form.
        getData() {
            axios
                .get(`http://127.0.0.1:8000/form/bank/${this.id}`)
                .then((res) => {
                    this.name = res.data.bank_name;
                    // this.branch = res.data.branch_name;
                    // this.ifsc = res.data.ifsc;
                });
        },
    },
};
</script>
