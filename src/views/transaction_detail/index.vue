
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="店铺id" prop="shopId"><el-input
            v-model="queryParams.shopId"
            placeholder="请输入店铺id"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="店铺名字" prop="shopName"><el-input
            v-model="queryParams.shopName"
            placeholder="请输入店铺名字"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="交易类型" prop="type"><el-input
            v-model="queryParams.type"
            placeholder="请输入交易类型"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="MSKU" prop="sku"><el-input
            v-model="queryParams.sku"
            placeholder="请输入MSKU"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="销售市场" prop="marketplace"><el-input
            v-model="queryParams.marketplace"
            placeholder="请输入销售市场"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:transaction_detail:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:transaction_detail:edit']"
              type="success"
              icon="el-icon-edit"
              size="mini"
              :disabled="single"
              @click="handleUpdate"
            >修改
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:transaction_detail:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="financeList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" /><el-table-column
            label="结算日期"
            align="center"
            prop="paymentTime"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="发货日期"
            align="center"
            prop="earliestShipDate"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="图片"
            align="center"
            prop="mainImage"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="ASIN"
            align="center"
            prop="asin"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="品名"
            align="center"
            prop="commodityName"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="商品SKU"
            align="center"
            prop="commoditySku"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="采购成本"
            align="center"
            prop="purchaseCost"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="头程费用"
            align="center"
            prop="headTripCost"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="毛利润"
            align="center"
            prop="grossProfit"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="币种"
            align="center"
            prop="currency"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="店铺id"
            align="center"
            prop="shopId"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="店铺名字"
            align="center"
            prop="shopName"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="市场ID"
            align="center"
            prop="marketPlaceId"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="结算ID"
            align="center"
            prop="settlementId"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="交易类型"
            align="center"
            prop="type"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="描述"
            align="center"
            prop="description"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="订单号"
            align="center"
            prop="orderId"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="类型"
            align="center"
            prop="accountType"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="MSKU"
            align="center"
            prop="sku"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="销售市场"
            align="center"
            prop="marketplace"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="发货方式"
            align="center"
            prop="fulfillment"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="数量"
            align="center"
            prop="quantity"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="销售价格"
            align="center"
            prop="productSales"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="运费"
            align="center"
            prop="shippingCredits"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="礼品包装费"
            align="center"
            prop="giftWrapCredits"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="促销返点"
            align="center"
            prop="promotionalRebates"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="销售税"
            align="center"
            prop="productSalesTax"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="市场税"
            align="center"
            prop="marketplaceWithheldTax"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="平台佣金"
            align="center"
            prop="sellingFees"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="FBA Fees"
            align="center"
            prop="fbaFees"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="其他交易费"
            align="center"
            prop="otherTransactionFees"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="其他费"
            align="center"
            prop="other"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="亚马逊结算小计"
            align="center"
            prop="total"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="积分"
            align="center"
            prop="integral"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="订单其他佣金"
            align="center"
            prop="orderOtherFee"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="评估费用"
            align="center"
            prop="evaluationFee"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="FBM 运费"
            align="center"
            prop="fbmShipCost"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                v-permisaction="['admin:transaction_detail:edit']"
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
              >修改
              </el-button>
              <el-button
                v-permisaction="['admin:transaction_detail:remove']"
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageIndex"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />

        <!-- 添加或修改对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="500px">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">

            <el-form-item label="结算日期" prop="paymentTime">
              <el-input
                v-model="form.paymentTime"
                placeholder="结算日期"
              />
            </el-form-item>
            <el-form-item label="发货日期" prop="earliestShipDate">
              <el-input
                v-model="form.earliestShipDate"
                placeholder="发货日期"
              />
            </el-form-item>
            <el-form-item label="图片" prop="mainImage">
              <el-input
                v-model="form.mainImage"
                placeholder="图片"
              />
            </el-form-item>
            <el-form-item label="ASIN" prop="asin">
              <el-input
                v-model="form.asin"
                placeholder="ASIN"
              />
            </el-form-item>
            <el-form-item label="品名" prop="commodityName">
              <el-input
                v-model="form.commodityName"
                placeholder="品名"
              />
            </el-form-item>
            <el-form-item label="商品SKU" prop="commoditySku">
              <el-input
                v-model="form.commoditySku"
                placeholder="商品SKU"
              />
            </el-form-item>
            <el-form-item label="采购成本" prop="purchaseCost">
              <el-input
                v-model="form.purchaseCost"
                placeholder="采购成本"
              />
            </el-form-item>
            <el-form-item label="头程费用" prop="headTripCost">
              <el-input
                v-model="form.headTripCost"
                placeholder="头程费用"
              />
            </el-form-item>
            <el-form-item label="毛利润" prop="grossProfit">
              <el-input
                v-model="form.grossProfit"
                placeholder="毛利润"
              />
            </el-form-item>
            <el-form-item label="币种" prop="currency">
              <el-input
                v-model="form.currency"
                placeholder="币种"
              />
            </el-form-item>
            <el-form-item label="domain" prop="domain">
              <el-input
                v-model="form.domain"
                placeholder="domain"
              />
            </el-form-item>
            <el-form-item label="店铺id" prop="shopId">
              <el-input
                v-model="form.shopId"
                placeholder="店铺id"
              />
            </el-form-item>
            <el-form-item label="店铺名字" prop="shopName">
              <el-input
                v-model="form.shopName"
                placeholder="店铺名字"
              />
            </el-form-item>
            <el-form-item label="市场ID" prop="marketPlaceId">
              <el-input
                v-model="form.marketPlaceId"
                placeholder="市场ID"
              />
            </el-form-item>
            <el-form-item label="结算ID" prop="settlementId">
              <el-input
                v-model="form.settlementId"
                placeholder="结算ID"
              />
            </el-form-item>
            <el-form-item label="交易类型" prop="type">
              <el-input
                v-model="form.type"
                placeholder="交易类型"
              />
            </el-form-item>
            <el-form-item label="描述" prop="description">
              <el-input
                v-model="form.description"
                placeholder="描述"
              />
            </el-form-item>
            <el-form-item label="订单号" prop="orderId">
              <el-input
                v-model="form.orderId"
                placeholder="订单号"
              />
            </el-form-item>
            <el-form-item label="类型" prop="accountType">
              <el-input
                v-model="form.accountType"
                placeholder="类型"
              />
            </el-form-item>
            <el-form-item label="MSKU" prop="sku">
              <el-input
                v-model="form.sku"
                placeholder="MSKU"
              />
            </el-form-item>
            <el-form-item label="销售市场" prop="marketplace">
              <el-input
                v-model="form.marketplace"
                placeholder="销售市场"
              />
            </el-form-item>
            <el-form-item label="发货方式" prop="fulfillment">
              <el-input
                v-model="form.fulfillment"
                placeholder="发货方式"
              />
            </el-form-item>
            <el-form-item label="数量" prop="quantity">
              <el-input
                v-model="form.quantity"
                placeholder="数量"
              />
            </el-form-item>
            <el-form-item label="销售价格" prop="productSales">
              <el-input
                v-model="form.productSales"
                placeholder="销售价格"
              />
            </el-form-item>
            <el-form-item label="运费" prop="shippingCredits">
              <el-input
                v-model="form.shippingCredits"
                placeholder="运费"
              />
            </el-form-item>
            <el-form-item label="礼品包装费" prop="giftWrapCredits">
              <el-input
                v-model="form.giftWrapCredits"
                placeholder="礼品包装费"
              />
            </el-form-item>
            <el-form-item label="促销返点" prop="promotionalRebates">
              <el-input
                v-model="form.promotionalRebates"
                placeholder="促销返点"
              />
            </el-form-item>
            <el-form-item label="销售税" prop="productSalesTax">
              <el-input
                v-model="form.productSalesTax"
                placeholder="销售税"
              />
            </el-form-item>
            <el-form-item label="市场税" prop="marketplaceWithheldTax">
              <el-input
                v-model="form.marketplaceWithheldTax"
                placeholder="市场税"
              />
            </el-form-item>
            <el-form-item label="平台佣金" prop="sellingFees">
              <el-input
                v-model="form.sellingFees"
                placeholder="平台佣金"
              />
            </el-form-item>
            <el-form-item label="FBA Fees" prop="fbaFees">
              <el-input
                v-model="form.fbaFees"
                placeholder="FBA Fees"
              />
            </el-form-item>
            <el-form-item label="其他交易费" prop="otherTransactionFees">
              <el-input
                v-model="form.otherTransactionFees"
                placeholder="其他交易费"
              />
            </el-form-item>
            <el-form-item label="其他费" prop="other">
              <el-input
                v-model="form.other"
                placeholder="其他费"
              />
            </el-form-item>
            <el-form-item label="亚马逊结算小计" prop="total">
              <el-input
                v-model="form.total"
                placeholder="亚马逊结算小计"
              />
            </el-form-item>
            <el-form-item label="积分" prop="integral">
              <el-input
                v-model="form.integral"
                placeholder="积分"
              />
            </el-form-item>
            <el-form-item label="订单其他佣金" prop="orderOtherFee">
              <el-input
                v-model="form.orderOtherFee"
                placeholder="订单其他佣金"
              />
            </el-form-item>
            <el-form-item label="评估费用" prop="evaluationFee">
              <el-input
                v-model="form.evaluationFee"
                placeholder="评估费用"
              />
            </el-form-item>
            <el-form-item label="FBM 运费" prop="fbmShipCost">
              <el-input
                v-model="form.fbmShipCost"
                placeholder="FBM 运费"
              />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog>
        <FileChoose ref="fileChoose" :dialog-form-visible="fileOpen" @confirm="getImgList" @close="fileClose" />
      </el-card>
    </template>
  </BasicLayout>
</template>

<script>
import { addTransactionDetail, delTransactionDetail, getTransactionDetail, listTransactionDetail, updateTransactionDetail } from '@/api/transaction_detail'
import FileChoose from '@/components/FileChoose'

export default {
  name: 'TransactionDetail',
  components: {
    FileChoose
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      isEdit: false,
      fileOpen: false,
      fileIndex: undefined,
      // 类型数据字典
      typeOptions: [],
      financeList: [],

      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        shopId: undefined,
        shopName: undefined,
        type: undefined,
        sku: undefined,
        marketplace: undefined

      },
      // 表单参数
      form: {
      },
      // 表单校验
      rules: { shopId:
                [
                  { required: true, message: '店铺id不能为空', trigger: 'blur' }
                ],
      shopName:
                [
                  { required: true, message: '店铺名字不能为空', trigger: 'blur' }
                ],
      type:
                [
                  { required: true, message: '交易类型不能为空', trigger: 'blur' }
                ],
      sku:
                [
                  { required: true, message: 'MSKU不能为空', trigger: 'blur' }
                ],
      marketplace:
                [
                  { required: true, message: '销售市场不能为空', trigger: 'blur' }
                ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询参数列表 */
    getList() {
      this.loading = true
      listTransactionDetail(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.financeList = response.data.list
        this.total = response.data.count
        this.loading = false
      }
      )
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {

        id: undefined,
        paymentTime: undefined,
        earliestShipDate: undefined,
        mainImage: undefined,
        asin: undefined,
        commodityName: undefined,
        commoditySku: undefined,
        purchaseCost: undefined,
        headTripCost: undefined,
        grossProfit: undefined,
        currency: undefined,
        domain: undefined,
        shopId: undefined,
        shopName: undefined,
        marketPlaceId: undefined,
        settlementId: undefined,
        type: undefined,
        description: undefined,
        orderId: undefined,
        accountType: undefined,
        sku: undefined,
        marketplace: undefined,
        fulfillment: undefined,
        quantity: undefined,
        productSales: undefined,
        shippingCredits: undefined,
        giftWrapCredits: undefined,
        promotionalRebates: undefined,
        productSalesTax: undefined,
        marketplaceWithheldTax: undefined,
        sellingFees: undefined,
        fbaFees: undefined,
        otherTransactionFees: undefined,
        other: undefined,
        total: undefined,
        integral: undefined,
        orderOtherFee: undefined,
        evaluationFee: undefined,
        fbmShipCost: undefined
      }
      this.resetForm('form')
    },
    getImgList: function() {
      this.form[this.fileIndex] = this.$refs['fileChoose'].resultList[0].fullUrl
    },
    fileClose: function() {
      this.fileOpen = false
    },
    // 关系
    // 文件
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageIndex = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.resetForm('queryForm')
      this.handleQuery()
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加结算明细'
      this.isEdit = false
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id =
                row.id || this.ids
      getTransactionDetail(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改结算明细'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateTransactionDetail(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('修改成功')
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addTransactionDetail(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('新增成功')
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      var Ids = (row.id && [row.id]) || this.ids

      this.$confirm('是否确认删除编号为"' + Ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delTransactionDetail({ 'ids': Ids })
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(function() {
      })
    }
  }
}
</script>
