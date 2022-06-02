<template>
    <div class="container">
        <center>
            <p class="h3 text-secondary heading">
                {{ $route.params.id ? "Edit Branch" : "Create Branch" }}
            </p>
        </center>
        <label for="exampleInputEmail1" class="form-label">Bank Name</label>
        <select
            class="form-select"
            @focus="show = false"
            @change="onChange($event)"
            aria-label="Default select example"
        >
            <option value="select" selected disabled>Select Bank</option>
            <option
                :value="bank.id"
                v-for="bank in this.banks"
                :key="bank.id"
                :selected="bank.id == this.bank_id ? true : false"
            >
                {{ bank.bank_name }}
            </option>
        </select>
        <div class="text-danger" v-text="this.error.name"></div>
        <label for="exampleInputEmail1" class="form-label">Branch Name</label>
        <input
            @focus="show = false"
            class="form-control mb-2"
            type="text"
            placeholder=""
            v-model="branch"
            aria-label="default input example"
        />
        <div class="text-danger" v-text="this.error.branch"></div>
        <label for="exampleInputEmail1" class="form-label">IFSC</label>
        <input
            @focus="show = false"
            class="form-control mb-2"
            type="text"
            placeholder=""
            v-model="ifsc"
            aria-label="default input example"
        />
        <div class="text-danger" v-text="this.error.ifsc"></div>
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
            @click="addBranch()"
            class="btn btn-primary me-2"
            v-if="$route.params.id == ''"
        >
            Submit
        </button>
        <button
            type="submit"
            @click="editBranch()"
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
var b_name;
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
            bank_id: b_name,
            branch: "",
            ifsc: "",
            show: false,
            banks: {},
        };
    },
    mounted() {
        if (this.id) {
            this.getData();
        }
        this.getBank();
        this.bank_id = "";
    },

    methods: {
        onChange(e) {
            b_name = e.target.value;
        },
        // This is a method that is used to validate the form.
        validate(branch, ifsc) {
            let bank_name = document.querySelector(".form-select").value;
            let count = 0;
            const ifscregex = new RegExp("[A-Z]+[0-9]+");
            const branchregex = new RegExp("[A-Z]+");
            if (bank_name === "select") {
                this.error.name = "Please select valid bank";
                this.show = false;
                count++;
            } else {
                this.error.name = "";
            }
            if (!branchregex.test(branch)) {
                this.show = false;
                this.error.branch = "Please enter valid branch";
                count++;
            } else {
                this.error.branch = "";
            }
            if (!ifscregex.test(ifsc)) {
                this.show = false;
                this.error.ifsc = "Please enter valid ifsc";
                count++;
            } else {
                this.error.ifsc = "";
            }
            if (count > 0) {
                return false;
            }
            // console.log(bank_name);
            return true;
        },
        // This is the method that is called when the user clicks on the update button.
        editBranch() {
            if (this.validate(this.branch, this.ifsc)) {
                axios
                    .put(`http://127.0.0.1:8000/form/branch/${this.id}`, {
                        branch_name: this.branch,
                        ifsc: this.ifsc,
                        bank_id: b_name,
                    })
                    .then(() => {
                        this.show = true;
                        this.successmsg = "Update Successful";
                    });
            }
        },
        // This is the method that is called when the user clicks on the submit button.
        addBranch() {
            if (this.validate(this.branch, this.ifsc)) {
                axios
                    .post("http://127.0.0.1:8000/form/branch", {
                        branch_name: this.branch,
                        ifsc: this.ifsc,
                        bank_id: b_name,
                    })
                    .then(() => {
                        this.show = true;
                        this.name = "";
                        this.branch = "";
                        this.ifsc = "";
                        this.successmsg = "Bank added successfuly";
                    });
            }
            this.bank_id = "";
        },
        // Getting the data from the database and displaying it in the form.
        getData() {
            axios
                .get(`http://127.0.0.1:8000/form/branch/${this.id}`)
                .then((res) => {
                    this.branch = res.data.branch_name;
                    this.ifsc = res.data.ifsc;
                    this.bank_id = res.data.bank_id;
                });
        },
        // Getting the data from the database and displaying it in the form.
        getBank() {
            axios.get("http://127.0.0.1:8000/form/getbank").then((res) => {
                this.banks = res.data;
                // console.log(this.banks);
                // console.log("in getbanks");
            });
        },
    },
};
</script>
