<template>
  <div id="app">

      <el-container style="height: 500px; border: 1px solid #eee">
          <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
              <el-menu :default-openeds="['1', '3']">

                  <el-submenu index="2">
                      <template slot="title"><i class="el-icon-menu"></i>Demo</template>
                          <el-menu-item ><a href="https://github.com/Xikmatilla44/contact_master/tree/master">Github</a></el-menu-item>
                  </el-submenu>
                  <el-submenu index="3">
                      <template slot="title"><i class="el-icon-setting"></i>Dev</template>
                      <el-menu-item-group>
                          <el-menu-item index="3-1">Xikmailla446@gmail.com</el-menu-item>
                      </el-menu-item-group>
                  </el-submenu>
              </el-menu>
          </el-aside>


          <el-container>
              <el-header>
                  <app-navbar/>
              </el-header>

              <router-view/>




          </el-container>
      </el-container>






  </div>
</template>

<script>

    import Navbar from './components/Navabar'
export default {
  name: 'app',
    components:{
      'app-navbar':Navbar,
    },

    data() {
        const item = {
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles'
        };
        return {
            tableData: Array(20).fill(item)
        }
    }


}
</script>

<style>

    element{
        background-color: black;
    }

    .el-header {
        background-color: black;
        padding: 0 20px;

    }


    .el-aside {
        color: #333;
    }


</style>
