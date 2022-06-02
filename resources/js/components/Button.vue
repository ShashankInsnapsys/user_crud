<template>
    <div class="btn-group">
        <div class="col-md-6 me-1">
            <button
                type="button"
                class="btn btn-warning"
                @click="onBtnClickEdit(this.row.id)"
            >
                <font-awesome-icon icon="pen-to-square" />
            </button>
        </div>
        <div class="col-md-6">
            <button
                type="button"
                class="btn btn-danger"
                @click="onBtnClickDelete(this.row.id)"
            >
                <font-awesome-icon icon="trash-can" />
            </button>
        </div>
    </div>
</template>
<script>
export default {
    name: "buttons",
    props: {
        row: Object,
        column: Object,
    },
    methods: {},
};
</script>
