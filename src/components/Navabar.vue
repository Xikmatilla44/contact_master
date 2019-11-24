<template>
    <div style="background-color: black">

        <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelectNavabar"
                style="background-color: black"
                text-color="#fff"
                active-text-color="#ffda55">

            <el-menu-item index="2"><a  target="_blank">Home</a></el-menu-item>
            <el-autocomplete
                    popper-class="my-autocomplete"
                    v-model="state"
                    :fetch-suggestions="querySearch"
                    placeholder="Please input"
                    @select="handleSelect">
                <i
                        class="el-icon-edit el-input__icon"
                        slot="suffix"
                        @click="handleIconClick">
                </i>
                <template slot-scope="{ item }">
                    <div class="value">{{ item.firstName}}</div>
                    <span class="link">{{ item.lastName }}</span>
                </template>
            </el-autocomplete>

        </el-menu>


        <el-dialog :title="titleNAme" :visible.sync="modalopen" custom-class="dialog_self" center>
            <table style="margin-left: 30%">
                <tr>
                    <ul v-for="phone in payloads.phone">
                        <li>Phone:&nbsp; {{phone.value}}  -  {{phone.label }} </li>
                    </ul>
                    <ul v-for="email in payloads.email">
                        <li>Email:&nbsp; {{email.value}}  -  {{email.label  }}</li>
                    </ul>
                    <ul v-for="adres in payloads.address">
                        <li>Adress:&nbsp;{{adres.value}}  -  {{adres.label }} </li>
                    </ul>
                </tr>
            </table>
            <el-button @click="modalopen= false">Cancel</el-button>
        </el-dialog>




    </div>
</template>

<script>
    export default {

        data() {
            return {
                titleNAme:'',
                modalopen:false,
                payloads:{
                    firstName:'',
                    lastName:'',
                    email:'',
                    phone:'',
                    address:''
                },

                activeIndex2: '1',
                links: [],
                state: ''
            };
        },
        methods: {
            handleSelectNavabar(key, keyPath) {
                console.log(key, keyPath);
            },

            querySearch(queryString, cb) {
                var links = this.links;
                var results = queryString ? links.filter(this.createFilter(queryString)) : links;
                // call callback function to return suggestion objects
                cb(results);
            },
            createFilter(queryString) {
                return (link) => {
                    return (link.firstName.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },

            loadAll() {
                return this.$store.state.ContactModule.table;
            },

            handleSelect(item) {
                console.log(item);
                this.titleNAme = item.lastName + " " + item.firstName;
                this.payloads = item;
                this.modalopen = true;

            },
            handleIconClick(ev) {
                console.log(ev);
            }
        },
        mounted() {
            this.links = this.loadAll();
        },
        created() {
            this.loadAll();
        }


    }
</script>

<style  lang="scss" scoped>


    .el-menu-demo el-menu--horizontal el-menu{
        background-color: black;
    }

    .el-input {

        margin-left: 78px;

    }

    .el-autocomplete {
        margin-left: 68px;
        top: 10px;

    }
    .my-autocomplete {
    li {
        line-height: normal;
        padding: 7px;

    .value {
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .link {
        font-size: 12px;
        color: black;
    }
    }
    }




</style>
