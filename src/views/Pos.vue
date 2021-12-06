<template>
    <div class="pos">
        <el-container>
            <el-aside width="500px">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="点餐" name="first">
                        <el-table
                            :data="tableData"
                            style="width: 100%;" 
                            :header-cell-style="{textAlign: 'center'}"
                            :cell-style="{ textAlign: 'center' }" 
                            border>
                            <el-table-column prop="goodsName" label="商品名称">
                            </el-table-column>
                            <el-table-column prop="count" label="数量">
                            </el-table-column>
                            <el-table-column prop="price" label="金额">
                            </el-table-column>
                            <el-table-column label="操作" fixed="right">
                                <template scope="scope">
                                    <el-button type="text" size="small" @click="reduseOrderList(scope.row)">删除</el-button>
                                    <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div style="padding:10px;background-color:#fff;padding:10px;">
                            数量：<span style="color:hotpink">{{totalCount}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            金额：<span style="color:hotpink">{{totalMoney}}</span>元
                        </div>
                        <div style="margin:10px 0;">
                            <el-button type="primary">挂单</el-button>
                            <el-button type="danger" @click="deletAll">删除</el-button>
                            <el-button type="success" @click="checkOut">结账</el-button>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="挂单" name="second">挂单</el-tab-pane>
                    <el-tab-pane label="外卖" name="third">外卖</el-tab-pane>
                </el-tabs>
            </el-aside>
            <el-container>
                <el-main>
                    <div class="title">热门产品</div>
                    <el-tag
                    v-for="oftenGood in oftenGoods"
                    :key="oftenGood.goodsId"
                    @click='addOrderList(oftenGood)'
                    >
                    {{`${oftenGood.goodsName} ￥${oftenGood.price}`}}
                    </el-tag>
                </el-main>
                <el-footer>
                    <el-tabs v-model="activeName1">
                        <el-tab-pane label="汉堡" name="first">
                            <div class="foods">
                                <ul>
                                    <li v-for="type0Good in type0Goods" :key="type0Good.goodsId" @click='addOrderList(type0Good)'>
                                        <img :src="type0Good.goodsImg" alt="">
                                        <span>{{type0Good.goodsName}}</span>
                                        <span>￥{{type0Good.price}}元</span>
                                    </li>
                                </ul>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="小食" name="second">
                            <div class="foods">
                                <ul>
                                    <li v-for="type1Good in type1Goods" :key="type1Good.goodsId" @click='addOrderList(type1Good)'>
                                        <img :src="type1Good.goodsImg" alt="">
                                        <span>{{type1Good.goodsName}}</span>
                                        <span>￥{{type1Good.price}}元</span>
                                    </li>
                                </ul>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="饮品" name="third">
                            <div class="foods">
                                <ul>
                                    <li v-for="type2Good in type2Goods" :key="type2Good.goodsId" @click='addOrderList(type2Good)'>
                                        <img :src="type2Good.goodsImg" alt="">
                                        <span>{{type2Good.goodsName}}</span>
                                        <span>￥{{type2Good.price}}元</span>
                                    </li>
                                </ul>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="全家桶" name="fourth">
                            <div class="foods">
                                <ul>
                                    <li v-for="type3Good in type3Goods" :key="type3Good.goodsId" @click='addOrderList(type3Good)'>
                                        <img :src="type3Good.goodsImg" alt="">
                                        <span>{{type3Good.goodsName}}</span>
                                        <span>￥{{type3Good.price}}元</span>
                                    </li>
                                </ul>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'Pos',
    data() {
      return {
        activeName: 'first',
        activeName1: 'first',
        tableData:[],
        oftenGoods: [],
        type0Goods:[],
        type1Goods:[],
        type2Goods:[],
        type3Goods:[],
        // totalCount:0,
        // totalMoney:0
      };
    },
    methods: {
        addOrderList(goods){
            let isHave = false;
            // this.totalCount++;
            // this.totalMoney+=goods.price;
            for(let i=0;i<this.tableData.length;i++){
                if(this.tableData[i].goodsName === goods.goodsName){
                    isHave = true;
                }
            }
            if(isHave){
                let arr = this.tableData.filter(obj=>obj.goodsName === goods.goodsName);
                arr[0].count++;
            }else{
                let newGoods = {goodsId:goods.goodsId,goodsName:goods.goodsName,price:goods.price,count:1};
                this.tableData.push(newGoods);
            }
        },
        reduseOrderList(goods){
            if(goods.count>1){
                goods.count--;
            }else{
                let arr = this.tableData.filter(obj=>obj.goodsName === goods.goodsName);
                this.tableData.splice(arr,1);
            }
        },
        deletAll(){
            this.tableData = [];
        },
        checkOut(){
            if(this.totalMoney>0){
                this.$message({
                message:"结账完成，欢迎下次光临",
                type:"success"
            });
            this.deletAll()
            }else{
                this.$message.error('没钱结尼玛的账呢')
            }
        }
    },
    computed:{
        totalCount(){
            let count=0;
            for(let i=0;i<this.tableData.length;i++){
                count+=this.tableData[i].count;
            }
            return count;
        },
        totalMoney(){
            let money = 0;
            for(let i=0;i<this.tableData.length;i++){
                money+=(this.tableData[i].count)*(this.tableData[i].price)
            }
            return money;
        }
    },
    created() {
        axios.get('https://www.fastmock.site/mock/0bf6a5bae7eab8507e44b56191ddff36/vuepos/oftenGoods')
        .then(res=>{
            this.oftenGoods = res.data.oftenGoods;
        })
        .catch(err=>{
            console.log(err)
        })
        axios.get('https://www.fastmock.site/mock/0bf6a5bae7eab8507e44b56191ddff36/vuepos/typeGoods')
        .then(res=>{
            this.type0Goods = res.data.data[0]
            this.type1Goods = res.data.data[1]
            this.type2Goods = res.data.data[2]
            this.type3Goods = res.data.data[3]
        })
        .catch(err=>{
            console.log(err)
        })
    },
}
</script>

<style scoped>
  .el-container>.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: 30vh!important;
  }
  .el-container>.el-main .title{
      font-size: 20px;
      margin-bottom: 10px;
  }
  .el-container>.el-main .el-tag{
      font-size: 16px;
      margin: 10px;
      cursor: pointer;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    height: 100vh;
  }
  .el-tabs{
      margin: 5px 10px;
  }
  .el-container>.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    height: 70vh!important;
  }
  .el-tab-pane .foods ul{
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
  }
  .el-tab-pane .foods ul li{
      width: 150px;
      height: 150px;
      margin-bottom: 20px;
      margin-right: 20px;
      background-color: whitesmoke;
  }
  .el-tab-pane .foods ul li img{
      width: 100%;
      height: 100px;

  }
  .el-tab-pane .foods ul li span{
      display: block;
  }
  .el-tab-pane .foods ul li span:nth-of-type(1){
      color: #FF6461;
      margin-bottom: 5px;
  }
</style>