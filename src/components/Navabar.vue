<template>
    <div>

        <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelectNavabar"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
            <el-menu-item index="1"><i class="el-icon-s-fold"></i>
            </el-menu-item>
            <el-menu-item index="2"><a  target="_blank">Orders</a></el-menu-item>
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


        <el-dialog title="See" :visible.sync="modalopen" custom-class="dialog_self" center>
            <table>
                <tr>
                    <td>{{payloads.firstName}}</td>
                    <td>{{payloads.lastName}}</td>
                    <ul v-for="phone in payloads.phone">
                        <li>{{phone.value}}  -  {{phone.label }} </li>
                    </ul>
                    <ul v-for="email in payloads.email">
                        <li> {{email.value}}  -  {{email.label  }}</li>
                    </ul>
                    <ul v-for="adres in payloads.address">
                        <li>{{adres.value}}  -  {{adres.label }} </li>
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
        color: #b4b4b4;
    }
    }
    }


</style>
