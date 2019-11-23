<template>
    <div class="hello">
        <el-row class="tac">
            <el-button size="mini" class="right" @click="onCreateCategory" type="success">+ ДОБАВИТЬ</el-button>

            <el-dialog title="Добавить" :visible.sync="createDialog" custom-class="dialog_self" center>

                <el-form>
                    <el-form-item label="Zones" :label-width="formLabelWidth">
                        <el-col> <el-input v-model="payloads.firstName" style="margin-left: -71px; width: 50%"
                                      size="mini" placeholder="firstName"/>
                            <el-input v-model="payloads.lastName"
                                      style="margin-left: 25px; ; width: 50%"

                                      size="mini" placeholder="lastName"/>
                        </el-col>
                    </el-form-item>
                    <el-form-item :label-width="formLabelWidth"
                                  v-for="(input, k) in addresses" :key="k">
                        <el-col>
                            <el-col>
                            <el-input v-model="input.value" size="mini" placeholder="Addresses"/>
                            </el-col>
                            <el-col>
                                <el-select size="small" v-model="input.label" placeholder="select"
                                style="margin-left: 25px"
                                >
                                    <el-option
                                            v-for="item in CityOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                    ></el-option>
                                </el-select>
                                <el-col>
                                    <span style="margin-left: 40%">
                        <i class="el-icon-remove" @click="removeAddres(k)" v-show="k || (!k && addresses.length > 1)"></i>
                        <i class="el-icon-circle-plus" @click="addAddres(k)"></i>
                        </span></el-col>
                            </el-col>
                            </el-col>
                    </el-form-item>


                    <el-form-item :label-width="formLabelWidth"
                                  v-for="(phone, i) in phones" :key="'A' + i">
                        <el-col>
                            <el-col>

                                <el-input v-model="phone.value"
                                          size="mini" placeholder="Phone"/>
                            </el-col>


                            <el-col>

                                <el-select size="small" v-model="phone.label" placeholder="select"
                                           style="margin-left: 25px"
                                >
                                    <el-option

                                            v-for="item in CityOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                    ></el-option>
                                </el-select>

                                <el-col>
                                    <span style="margin-left: 40%">
                        <i class="el-icon-remove" @click="removePhone(i)" v-show="i || (!i && phones.length > 1)"></i>
                        <i class="el-icon-circle-plus" @click="addPhone(i)"></i>
                        </span></el-col>

                            </el-col>


                        </el-col>


                    </el-form-item>

                    <el-form-item :label-width="formLabelWidth"
                                  v-for="(email, i) in emails" :key="'B' + i">
                        <el-col>
                            <el-col>

                                <el-input v-model="email.value"
                                          size="mini" placeholder="Email"/>
                            </el-col>


                            <el-col>

                                <el-select size="small" v-model="email.label" placeholder="select"
                                           style="margin-left: 25px"
                                >
                                    <el-option

                                            v-for="item in CityOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                    ></el-option>
                                </el-select>

                                <el-col>
                                    <span style="margin-left: 40%">
                        <i class="el-icon-remove" @click="removeEmail(i)" v-show="i || (!i && emails.length > 1)"></i>
                        <i class="el-icon-circle-plus" @click="addEmail(i)"></i>
                        </span></el-col>

                            </el-col>


                        </el-col>


                    </el-form-item>



                </el-form>
                <span slot="footer" class="dialog-footer">
    <el-button @click="createDialog = false">Cancel</el-button>
    <el-button type="primary" @click="addForm()">Confirm</el-button>
  </span>

            </el-dialog>


            <el-col :span="16">
            </el-col>
            <el-table
                    lang="ru"

                    :data="tableData.filter(data=> !search || data.firstName.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%">
                <el-table-column

                        label="FirstName"
                        prop="firstName">
                </el-table-column>


                <el-table-column
                        label="LastName"
                        prop="lastName">
                </el-table-column>

                <el-table-column><template slot="header" slot-scope="scope">
                <input
                        class="el-input"
                            style="width: 70%; margin-left: 30%; outline: none; border-radius: 5px;"
                            v-model="search"
                            lang="ru"
                            placeholder="  search"/>

                </template>
                </el-table-column>

                <el-table-column
                        align="right">
                    <template slot-scope="scope">

                        <el-button
                                size="mini" type="primary" icon="el-icon-edit"
                                @click="handleSee(scope.$index, scope.row)">See
                        </el-button>


                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">Edit
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">Delete
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>



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
    import {mapActions, mapState} from "vuex";
    export default {
        data() {
            return {
                modalopen:false,
                labels: ['Home', 'Work', 'Other'],
                payloads:{
                    firstName:'',
                    lastName:'',
                    email:'',
                    phone:'',
                    address:''
                },

                newAddressId: 0,
                newPhoneId: 0,
                newEmailId: 0,
                addresses: [{id: 0, value: '', label: ''}],
                phones: [{id: 0, value: '', label: ''}],
                emails: [{id: 0, value: '', label: ''}],

                CityOptions: [

                {
                        value: "Home",
                        label: "Home"
                    },

                    {
                        value: "Work",
                        label: "Work"
                    },

                    {
                        value: "Other",
                        label: "Other"
                    }
                ],


                formLabelWidth: '120px',
                createDialog: false,
                dialogFormVisible: false,
                isCollapse: true,
                tableData: [],
                search: '',
            };
        },

        computed: {

            ...mapState('ContactModule', [
                'listStatus', 'table'
            ])
        },
        methods: {
            ...mapActions('ContactModule', [
                'PushLocalStore', 'PushCreate'
            ]),

            handleEdit(index, row) {

                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            handleSee(index, row) {
              debugger
                console.log(index, row);
              this.payloads = row;
                this.modalopen = true;
                console.log(this.payloads)
            },


            onCreateCategory() {
                (this.createDialog = true), (this.Category = {});
            },


            addAddres(index) {

                this.addresses.push({
                    id: ++this.newAddressId,
                    value: '',
                    label: ''
                })

                console.log(this.addresses)
            },

            addPhone(index) {

                this.phones.push({
                    id: ++this.newPhoneId,
                    value: '',
                    label: ''
                });

                console.log(this.phones)
            },
            addEmail(index) {

                this.emails.push({
                    id: ++this.newEmailId,
                    value: '',
                    label: ''
                });

            },


            removeAddres(index) {
                this.addresses.splice(index, 1);
            },

            removePhone(index) {
                this.phones.splice(index, 1);
            },
            removeEmail(index) {
                this.emails.splice(index, 1);
            },

            addForm(){
                this.createDialog = false;
                this.payloads.address= this.addresses;
                this.payloads.phone = this.phones;
                this.payloads.email = this.emails;
                console.log(this.payloads);
                debugger
                this.PushLocalStore(this.payloads);
                this.PushCreate();

            }


        },
        mounted() {
            this.tableData = this.$store.state.ContactModule.table;

                    },

        created() {
            this.PushCreate();
        }

    }
</script>

<style lang="scss" scoped>




    .el-select>.el-input {
        display: block;
        margin-left: 31%;
    }

    [class*=el-col-] {
        display: flex;
    }



    .el-input[data-v-469af010][data-v-469af010][data-v-469af010] {
        margin-left: -72px;
        width: 150%;

    }




    .el-input[data-v-469af010][data-v-469af010] {
        margin-left: -72px;
        width: 75%;
        height: 30px;
    }
    .el-input--suffix .el-input__inner {
        width: 100px;

    }

</style>
