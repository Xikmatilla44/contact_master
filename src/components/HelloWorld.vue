<template>
    <div class="hello">
        <el-row class="tac">
            <div class="demo-input-suffix">
                <el-input style="width: 30%; margin-left: 30%; margin-top: 10px"
                        placeholder="Type something"
                        v-model="search">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>

                <el-button size="mini"

                           style="margin-left: 90%;"
                           class="el-icon-circle-plus" @click="onCreateContact" type="success"></el-button>

            </div>


            <el-dialog title="Добавить" :visible.sync="createDialog" custom-class="dialog_self" center>

                <el-form>
                    <el-form-item label="Zones" :label-width="formLabelWidth">
                        <el-col> <el-input v-model="payloads.firstName" style="margin-left: -71px; width: 50%"
                                      size="mini" placeholder="firstName"/>
                            <el-input v-model="payloads.lastName"
                                      style="margin-left: 25px; ; width: 50%"

                                      size="mini" placeholder="lastName"/>
                        </el-col>
                        <div v-show="textTtrue" class="valdatsiya">
                        <span >{{Valedatsiya}}</span></div>

                        <div v-show="textTtrue2" class="valdatsiya2">
                            <span >{{Valedatsiya2}}</span></div>
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

                                          placeholder="+998 (__) ___-__-__"
                                          size="mini" />
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
    <el-button @click="createDialog = false"
               type="warning"
               icon="el-icon-upload el-icon-right" circle>


        </el-button>
                <el-button type="success" icon="el-icon-check"
                           @click="addForm()"
                           circle></el-button>


  </span>

            </el-dialog>


            <el-col :span="16">
            </el-col>
            <el-table
                    lang="ru"

                    :data="tableData"
                    style="width: 100%">
                <el-table-column

                        label="FirstName"
                        prop="firstName">
                </el-table-column>


                <el-table-column
                        label="LastName"
                        prop="lastName">
                </el-table-column>


                <el-table-column
                        align="right">
                    <template slot-scope="scope">

                        <el-button
                                type="info"
                                icon="el-icon-info el-icon-right" circle
                                @click="handleSee(scope.$index, scope.row)">
                        </el-button>


                        <el-button
                                type="primary" icon="el-icon-edit" circle

                                @click="handleEdit(scope.$index, scope.row)">
                        </el-button>
                        <el-button
                                type="danger" icon="el-icon-delete" circle

                                @click="handleDelete(scope.$index, scope.row)"
                        >
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>



        <el-dialog :title="titleNAme" :visible.sync="modalopen" custom-class="dialog_self" center>
            <table style="margin-left: 30%">
                <tr>
                    <ul v-for="phone in payloads.phone">
                        <li>Phone:&nbsp; {{phone.value}}  -  {{phone.label }} </li>
                    </ul>
                    <ul v-for="email in payloads.email">
                        <li>Email: &nbsp;{{email.value}}  -  {{email.label  }}</li>
                    </ul>
                    <ul v-for="adres in payloads.address">
                        <li>Adress: &nbsp; {{adres.value}}  -  {{adres.label }} </li>
                    </ul>

                </tr>

            </table>


            <el-button @click="modalopen= false">Cancel</el-button>


        </el-dialog>



        <el-dialog
                title="Delete"
                :visible.sync="deleteDialog"
                width="35%"
                center>
               <el-button type="primary" style="margin-left: 10%" @click="deleteDialog = false">No <i class="el-icon-upload el-icon-right"></i></el-button>


            <el-button style="margin-left: 40%" type="primary" @click="deletePost()">Yes <i class="el-icon-delete el-icon-right"></i></el-button>


        </el-dialog>

    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";
    import ElSlPanel from "element-ui/packages/color-picker/src/components/sv-panel";
    export default {
        components: {ElSlPanel},
        data() {
            return {

                titleNAme:'',
                Valedatsiya:'',
                Valedatsiya2:'',
                textTtrue: false,
                textTtrue2:false,
                deleteDialog:false,
                modalopen:false,
                IdKey:null,
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
                'PushLocalStore', 'PushCreate', 'EditeLocalStore', 'DeleteLocalStore', 'SeachLocalStore'
            ]),


            handleEdit(index, row) {
                this.payloads.firstName = row.firstName;
                // debugger
                this.payloads.lastName = row.lastName;
                this.addresses = row.address;
                this.phones = row.phone;
                this.emails = row.email;
                this.IdKey = index;
                this.createDialog = true;

                console.log(index, row);
            },

            handleDelete(index, row) {
                this.IdKey = index;
                console.log(index, row);
                this.deleteDialog = true;


            },



            deletePost(){
                this.DeleteLocalStore(this.IdKey);
                setTimeout(()=>{
                    // debugger
                    this.tableData = this.table;
                    this.IdKey = null;
                    this.deleteDialog = false;

                },200);

            },




            handleSee(index, row) {
              // debugger
                this.titleNAme = row.lastName + " " + row.firstName;
                console.log(index, row);
              this.payloads = row;
                this.modalopen = true;
                console.log(this.payloads)
            },


            onCreateContact() {
                this.createDialog = true;
                this.payloads.firstName = '';
                this.payloads.lastName= '';
                this.payloads.email= '';
                this.payloads.phone= '';
                this.payloads.address= '';
                this.newAddressId = 0;
                this.newPhoneId = 0;
                this.newEmailId =0;
                this.addresses= [{id: 0, value: '', label: ''}];
                this.phones = [{id: 0, value: '', label: ''}];
                this.emails = [{id: 0, value: '', label: ''}];
                this.IdKey =    null;
                this.textTtrue = false;
                this.textTtrue2 = false;




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

            async  addForm(){
                if (this.IdKey === null){

                this.payloads.address= this.addresses;
                this.payloads.phone = this.phones;
                this.payloads.email = this.emails;
                console.log(this.payloads);
                // debugger
                this.PushLocalStore(this.payloads);
                this.createDialog = false;

                }else {
                    this.payloads.address= this.addresses;
                    this.payloads.phone = this.phones;
                    this.payloads.email = this.emails;
                    // debugger
                    console.log(this.payloads);
                    this.createDialog = false;
                    // debugger
                    this.EditeLocalStore({index: this.IdKey, payload: this.payloads});
                }


                setTimeout(()=>{
                    // debugger
                    this.tableData = this.$store.state.ContactModule.table;
                },200);


            },



        },
        mounted() {
            this.tableData = this.$store.state.ContactModule.table;

                    },

        created() {
            this.PushCreate();
        },

        watch: {
            'payloads.lastName': {
                handler(newValue) {
                   if (newValue === ''){
                       // debugger
                       this.textTtrue2 = true;
                       this.Valedatsiya2 = 'Familiya kiritish majburiy'
                   }else {
                       this.textTtrue2 = false;
                       this.Valedatsiya2 = ''
                   }
                }
            },


            'payloads.firstName': {
                handler(newValue) {
                    if (newValue === ''){
                        // debugger
                        this.textTtrue = true;
                        this.Valedatsiya = 'Ism kiritish majburiy'
                    }else {
                        this.textTtrue = false;
                        this.Valedatsiya = ''
                    }
                }
            },

            "search": {
                handler(newValue) {

                        this.SeachLocalStore(newValue);
                        setTimeout(()=>{
                            // debugger
                            this.tableData = this.table;
                        },200);
                    }
                }


        }

    }
</script>

<style lang="scss" scoped>

  .valdatsiya{
      color: red;
      position: absolute;
      margin-top: 6%;

  }
  .valdatsiya2{
      color: red;
      position: absolute;
      margin-top: 6%;
      margin-left: 55%;

  }


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

  @media (max-width: 550px) {

      .valdatsiya{
          color: red;
          position: absolute;
          margin-top: 30%;
          margin-left: -80%;

      }
      .valdatsiya2{
          display: none;
      }

  }


  @media (max-width: 1215px) {

      .valdatsiya{
          color: red;
          position: absolute;
          margin-top: 9%;
          margin-left: 20%;

      }
      .valdatsiya2{
          display: none;
      }



  }

  @media (max-width: 871px) {

      .valdatsiya{
          color: red;
          position: absolute;
          margin-top: 12%;
          margin-left: 15%;

      }
      .valdatsiya2{
          display: none;
      }



  }


  @media (max-width: 693px) {

      .valdatsiya {
          color: red;
          position: absolute;
          margin-top: 20%;
          margin-left: 5%;

      }
      .valdatsiya2 {
          display: none;
      }
  }

  @media (max-width: 553px) {

      .valdatsiya {
          color: red;
          position: absolute;
          margin-top: 30%;
          margin-left: 5%;

      }
      .valdatsiya2 {
          display: none;
      }
  }

  @media (max-width: 450px) {

      .valdatsiya {
          display: none;
      }
      .valdatsiya2 {
          display: none;
      }
  }



</style>
