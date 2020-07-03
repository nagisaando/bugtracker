<template>
  

        <div class="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">

            <div class="bg-blue-800 p-2 shadow text-xl text-white">
                <h3 class="font-bold pl-2">Summary</h3>
            </div>

            <div class="flex flex-wrap">
                <div class="w-full">
                    <!--Metric Card-->
                    <div class="bg-green-100 border-b-4 border-green-600 rounded-lg shadow-lg p-5">
                        <div class="flex flex-row items-center">
                            <div class="flex-shrink pr-4">
                                <div class="rounded-full p-5 bg-green-600"><i class="fa fa-wallet fa-2x fa-inverse"></i></div>
                            </div>
                            <div class="flex-1 text-right md:text-center">
                                <h5 class="font-bold uppercase text-gray-600">Total Projects</h5>
                                <h3 class="font-bold text-3xl">{{  totalProjects  }}<span class="text-green-500"><i class="fas fa-caret-up"></i></span></h3>
                            </div>
                        </div>
                    </div>
                    <!--/Metric Card-->
                </div>
                <div class="w-full">
                    <!--Metric Card-->
                    <div class="bg-orange-100 border-b-4 border-orange-500 rounded-lg shadow-lg p-5">
                        <div class="flex flex-row items-center">
                            <div class="flex-shrink pr-4">
                                <div class="rounded-full p-5 bg-orange-600"><i class="fas fa-users fa-2x fa-inverse"></i></div>
                            </div>
                            <div class="flex-1 text-right md:text-center">
                                <h5 class="font-bold uppercase text-gray-600">Total Bugs</h5>
                                <h3 class="font-bold text-3xl">{{  totalBugs  }}<span class="text-orange-500"><i class="fas fa-exchange-alt"></i></span></h3>
                            </div>
                        </div>
                    </div>
                    <!--/Metric Card-->
                </div>             
            </div>
        </div>
  

</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
export default {
  name: 'Home',
  data() {
      return {
          totalProjects: 0,
          totalBugs: 0,
          loading: false
      }
  },
  methods: {
    async countProjects () {
        try{
            const response = await axios.get(
                'http://bugtracker-springboot.herokuapp.com/projects'
            );
            console.log(response);
            if(response.data.length === 0) {
                return;
            } else {
                this.totalProjects = response.data.length;
            }
        } catch(err){
            alert(err.msg);
            console.log(err.response);
        }
    },
    async countBugs () {
        try{
            const response = await axios.get(
                'https://bugtracker-springboot.herokuapp.com/projects/bugs'
            );
            // console.log(response);
            // console.log('count bug is ' + response.data)
            if(response.data === undefined) {
                this.totalBugs = 0;
                return;
            } else {
                this.totalBugs = response.data.bug_count;
            }
        } catch(err){
            alert(err.msg);
            console.log(err.response);
        }
    }
  },
  mounted() {
      
      this.countProjects();
      this.countBugs();
      this.loading = false;
  }
}

</script>
