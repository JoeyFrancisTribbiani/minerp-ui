
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
          <el-form-item label="市场id" prop="marketplaceId"><el-input
            v-model="queryParams.marketplaceId"
            placeholder="请输入市场id"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="产品状态" prop="dxmState"><el-input
            v-model="queryParams.dxmState"
            placeholder="请输入产品状态"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="SKU" prop="sku"><el-input
            v-model="queryParams.sku"
            placeholder="请输入SKU"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="产品标题" prop="title"><el-input
            v-model="queryParams.title"
            placeholder="请输入产品标题"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="开始售出日期" prop="saleStartDate"><el-input
            v-model="queryParams.saleStartDate"
            placeholder="请输入开始售出日期"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="销售结束日期" prop="saleEndDate"><el-input
            v-model="queryParams.saleEndDate"
            placeholder="请输入销售结束日期"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="FNSKU" prop="fnsku"><el-input
            v-model="queryParams.fnsku"
            placeholder="请输入FNSKU"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="商品名称" prop="commodityName"><el-input
            v-model="queryParams.commodityName"
            placeholder="请输入商品名称"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="站点名称" prop="siteName"><el-input
            v-model="queryParams.siteName"
            placeholder="请输入站点名称"
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
              v-permisaction="['admin:specifics:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:specifics:edit']"
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
              v-permisaction="['admin:specifics:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="productList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                v-permisaction="['admin:specifics:edit']"
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
              >修改
              </el-button>
              <el-button
                v-permisaction="['admin:specifics:remove']"
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

            <el-form-item label="" prop="createdAt">
              <el-date-picker
                v-model="form.createdAt"
                type="datetime"
                placeholder="选择日期"
              />
            </el-form-item>
            <el-form-item label="" prop="updatedAt">
              <el-date-picker
                v-model="form.updatedAt"
                type="datetime"
                placeholder="选择日期"
              />
            </el-form-item>
            <el-form-item label="" prop="deletedAt">
              <el-date-picker
                v-model="form.deletedAt"
                type="datetime"
                placeholder="选择日期"
              />
            </el-form-item>
            <el-form-item label="" prop="createBy">
              <el-input
                v-model="form.createBy"
                placeholder=""
              />
            </el-form-item>
            <el-form-item label="" prop="updateBy">
              <el-input
                v-model="form.updateBy"
                placeholder=""
              />
            </el-form-item>
            <el-form-item label="父uid" prop="puid">
              <el-input
                v-model="form.puid"
                placeholder="父uid"
              />
            </el-form-item>
            <el-form-item label="店铺id" prop="shopId">
              <el-input
                v-model="form.shopId"
                placeholder="店铺id"
              />
            </el-form-item>
            <el-form-item label="市场id" prop="marketplaceId">
              <el-input
                v-model="form.marketplaceId"
                placeholder="市场id"
              />
            </el-form-item>
            <el-form-item label="FullCID" prop="fullCid">
              <el-input
                v-model="form.fullCid"
                placeholder="FullCID"
              />
            </el-form-item>
            <el-form-item label="父ID" prop="parentId">
              <el-input
                v-model="form.parentId"
                placeholder="父ID"
              />
            </el-form-item>
            <el-form-item label="产品状态" prop="dxmState">
              <el-input
                v-model="form.dxmState"
                placeholder="产品状态"
              />
            </el-form-item>
            <el-form-item label="产品发布状态" prop="dxmPublishState">
              <el-input
                v-model="form.dxmPublishState"
                placeholder="产品发布状态"
              />
            </el-form-item>
            <el-form-item label="错误信息" prop="errMsg">
              <el-input
                v-model="form.errMsg"
                placeholder="错误信息"
              />
            </el-form-item>
            <el-form-item label="ASIN" prop="asin">
              <el-input
                v-model="form.asin"
                placeholder="ASIN"
              />
            </el-form-item>
            <el-form-item label="Listing ID" prop="listingId">
              <el-input
                v-model="form.listingId"
                placeholder="Listing ID"
              />
            </el-form-item>
            <el-form-item label="父ASIN" prop="parentAsin">
              <el-input
                v-model="form.parentAsin"
                placeholder="父ASIN"
              />
            </el-form-item>
            <el-form-item label="子ASIN" prop="childAsins">
              <el-input
                v-model="form.childAsins"
                placeholder="子ASIN"
              />
            </el-form-item>
            <el-form-item label="是否变化" prop="isVariation">
              <el-input
                v-model="form.isVariation"
                placeholder="是否变化"
              />
            </el-form-item>
            <el-form-item label="SKU" prop="sku">
              <el-input
                v-model="form.sku"
                placeholder="SKU"
              />
            </el-form-item>
            <el-form-item label="标准产品类型" prop="standardProductType">
              <el-input
                v-model="form.standardProductType"
                placeholder="标准产品类型"
              />
            </el-form-item>
            <el-form-item label="标准产品ID" prop="standardProductId">
              <el-input
                v-model="form.standardProductId"
                placeholder="标准产品ID"
              />
            </el-form-item>
            <el-form-item label="产品标题" prop="title">
              <el-input
                v-model="form.title"
                placeholder="产品标题"
              />
            </el-form-item>
            <el-form-item label="品牌" prop="brand">
              <el-input
                v-model="form.brand"
                placeholder="品牌"
              />
            </el-form-item>
            <el-form-item label="制造商" prop="manufacturer">
              <el-input
                v-model="form.manufacturer"
                placeholder="制造商"
              />
            </el-form-item>
            <el-form-item label="描述" prop="description">
              <el-input
                v-model="form.description"
                placeholder="描述"
              />
            </el-form-item>
            <el-form-item label="重点" prop="bulletPoint">
              <el-input
                v-model="form.bulletPoint"
                placeholder="重点"
              />
            </el-form-item>
            <el-form-item label="条件类型" prop="conditionType">
              <el-input
                v-model="form.conditionType"
                placeholder="条件类型"
              />
            </el-form-item>
            <el-form-item label="条件值" prop="conditionValue">
              <el-input
                v-model="form.conditionValue"
                placeholder="条件值"
              />
            </el-form-item>
            <el-form-item label="标准价格" prop="standardPrice">
              <el-input
                v-model="form.standardPrice"
                placeholder="标准价格"
              />
            </el-form-item>
            <el-form-item label="价格" prop="listingPricing">
              <el-input
                v-model="form.listingPricing"
                placeholder="价格"
              />
            </el-form-item>
            <el-form-item label="配送转换" prop="switchFulfillmentTo">
              <el-input
                v-model="form.switchFulfillmentTo"
                placeholder="配送转换"
              />
            </el-form-item>
            <el-form-item label="配送渠道" prop="fulfillmentChannel">
              <el-input
                v-model="form.fulfillmentChannel"
                placeholder="配送渠道"
              />
            </el-form-item>
            <el-form-item label="产品型号" prop="partNumber">
              <el-input
                v-model="form.partNumber"
                placeholder="产品型号"
              />
            </el-form-item>
            <el-form-item label="主图" prop="mainImage">
              <el-input
                v-model="form.mainImage"
                placeholder="主图"
              />
            </el-form-item>
            <el-form-item label="开始售出日期" prop="saleStartDate">
              <el-input
                v-model="form.saleStartDate"
                placeholder="开始售出日期"
              />
            </el-form-item>
            <el-form-item label="销售结束日期" prop="saleEndDate">
              <el-input
                v-model="form.saleEndDate"
                placeholder="销售结束日期"
              />
            </el-form-item>
            <el-form-item label="售价" prop="saleSalePrice">
              <el-input
                v-model="form.saleSalePrice"
                placeholder="售价"
              />
            </el-form-item>
            <el-form-item label="数量" prop="quantity">
              <el-input
                v-model="form.quantity"
                placeholder="数量"
              />
            </el-form-item>
            <el-form-item label="开放时间" prop="openDate">
              <el-input
                v-model="form.openDate"
                placeholder="开放时间"
              />
            </el-form-item>
            <el-form-item label="产品体积" prop="itemDimensions">
              <el-input
                v-model="form.itemDimensions"
                placeholder="产品体积"
              />
            </el-form-item>
            <el-form-item label="包裹体积" prop="packageDimensions">
              <el-input
                v-model="form.packageDimensions"
                placeholder="包裹体积"
              />
            </el-form-item>
            <el-form-item label="标准价格币种" prop="standardPriceCurrency">
              <el-input
                v-model="form.standardPriceCurrency"
                placeholder="标准价格币种"
              />
            </el-form-item>
            <el-form-item label="详情" prop="specifics">
              <el-input
                v-model="form.specifics"
                placeholder="详情"
              />
            </el-form-item>
            <el-form-item label="变体？" prop="variationChildStr">
              <el-input
                v-model="form.variationChildStr"
                placeholder="变体？"
              />
            </el-form-item>
            <el-form-item label="在线状态" prop="onlineStatus">
              <el-input
                v-model="form.onlineStatus"
                placeholder="在线状态"
              />
            </el-form-item>
            <el-form-item label="销量" prop="saleNum">
              <el-input
                v-model="form.saleNum"
                placeholder="销量"
              />
            </el-form-item>
            <el-form-item label="FNSKU" prop="fnsku">
              <el-input
                v-model="form.fnsku"
                placeholder="FNSKU"
              />
            </el-form-item>
            <el-form-item label="库存" prop="warehousing">
              <el-input
                v-model="form.warehousing"
                placeholder="库存"
              />
            </el-form-item>
            <el-form-item label="不可售数量" prop="unsellable">
              <el-input
                v-model="form.unsellable"
                placeholder="不可售数量"
              />
            </el-form-item>
            <el-form-item label="预留数量" prop="reservedQty">
              <el-input
                v-model="form.reservedQty"
                placeholder="预留数量"
              />
            </el-form-item>
            <el-form-item label="购买成本" prop="purchaseCost">
              <el-input
                v-model="form.purchaseCost"
                placeholder="购买成本"
              />
            </el-form-item>
            <el-form-item label="头程费用" prop="headTripCost">
              <el-input
                v-model="form.headTripCost"
                placeholder="头程费用"
              />
            </el-form-item>
            <el-form-item label="运费" prop="shipCost">
              <el-input
                v-model="form.shipCost"
                placeholder="运费"
              />
            </el-form-item>
            <el-form-item label="价格推送状态" prop="priceFeedStatus">
              <el-input
                v-model="form.priceFeedStatus"
                placeholder="价格推送状态"
              />
            </el-form-item>
            <el-form-item label="库存推送状态" prop="inventoryFeedStatus">
              <el-input
                v-model="form.inventoryFeedStatus"
                placeholder="库存推送状态"
              />
            </el-form-item>
            <el-form-item label="更新标准价格" prop="updateStandardPrice">
              <el-input
                v-model="form.updateStandardPrice"
                placeholder="更新标准价格"
              />
            </el-form-item>
            <el-form-item label="更新数量" prop="updateQuantity">
              <el-input
                v-model="form.updateQuantity"
                placeholder="更新数量"
              />
            </el-form-item>
            <el-form-item label="Rating" prop="rating">
              <el-input
                v-model="form.rating"
                placeholder="Rating"
              />
            </el-form-item>
            <el-form-item label="Rating数" prop="ratingCount">
              <el-input
                v-model="form.ratingCount"
                placeholder="Rating数"
              />
            </el-form-item>
            <el-form-item label="排名" prop="rank">
              <el-input
                v-model="form.rank"
                placeholder="排名"
              />
            </el-form-item>
            <el-form-item label="BestSeller排名" prop="bsrRank">
              <el-input
                v-model="form.bsrRank"
                placeholder="BestSeller排名"
              />
            </el-form-item>
            <el-form-item label="商品id" prop="commodityId">
              <el-input
                v-model="form.commodityId"
                placeholder="商品id"
              />
            </el-form-item>
            <el-form-item label="开发者id" prop="devId">
              <el-input
                v-model="form.devId"
                placeholder="开发者id"
              />
            </el-form-item>
            <el-form-item label="创建id" prop="createId">
              <el-input
                v-model="form.createId"
                placeholder="创建id"
              />
            </el-form-item>
            <el-form-item label="更新id" prop="updateId">
              <el-input
                v-model="form.updateId"
                placeholder="更新id"
              />
            </el-form-item>
            <el-form-item label="l价格更新时间" prop="lpriceUpdateTime">
              <el-input
                v-model="form.lpriceUpdateTime"
                placeholder="l价格更新时间"
              />
            </el-form-item>
            <el-form-item label="l价格状态" prop="lpriceStatus">
              <el-input
                v-model="form.lpriceStatus"
                placeholder="l价格状态"
              />
            </el-form-item>
            <el-form-item label="子listing" prop="childList">
              <el-input
                v-model="form.childList"
                placeholder="子listing"
              />
            </el-form-item>
            <el-form-item label="销售额" prop="salePrices">
              <el-input
                v-model="form.salePrices"
                placeholder="销售额"
              />
            </el-form-item>
            <el-form-item label="广告费" prop="adCosts">
              <el-input
                v-model="form.adCosts"
                placeholder="广告费"
              />
            </el-form-item>
            <el-form-item label="币种" prop="currency">
              <el-input
                v-model="form.currency"
                placeholder="币种"
              />
            </el-form-item>
            <el-form-item label="广告费币种" prop="costCurrency">
              <el-input
                v-model="form.costCurrency"
                placeholder="广告费币种"
              />
            </el-form-item>
            <el-form-item label="商品SKU" prop="commoditySku">
              <el-input
                v-model="form.commoditySku"
                placeholder="商品SKU"
              />
            </el-form-item>
            <el-form-item label="商品名称" prop="commodityName">
              <el-input
                v-model="form.commodityName"
                placeholder="商品名称"
              />
            </el-form-item>
            <el-form-item label="店铺名称" prop="shopName">
              <el-input
                v-model="form.shopName"
                placeholder="店铺名称"
              />
            </el-form-item>
            <el-form-item label="站点名称" prop="siteName">
              <el-input
                v-model="form.siteName"
                placeholder="站点名称"
              />
            </el-form-item>
            <el-form-item label="区域域名" prop="domain">
              <el-input
                v-model="form.domain"
                placeholder="区域域名"
              />
            </el-form-item>
            <el-form-item label="子体数" prop="childNum">
              <el-input
                v-model="form.childNum"
                placeholder="子体数"
              />
            </el-form-item>
            <el-form-item label="业务员id" prop="devIds">
              <el-input
                v-model="form.devIds"
                placeholder="业务员id"
              />
            </el-form-item>
            <el-form-item label="业务员名称" prop="devName">
              <el-input
                v-model="form.devName"
                placeholder="业务员名称"
              />
            </el-form-item>
            <el-form-item label="变化映射" prop="variationStrMap">
              <el-input
                v-model="form.variationStrMap"
                placeholder="变化映射"
              />
            </el-form-item>
            <el-form-item label="Buy Box价格" prop="listingPrice">
              <el-input
                v-model="form.listingPrice"
                placeholder="Buy Box价格"
              />
            </el-form-item>
            <el-form-item label="运费" prop="shippingPrice">
              <el-input
                v-model="form.shippingPrice"
                placeholder="运费"
              />
            </el-form-item>
            <el-form-item label="Buy Box资格" prop="buyBoxWinner">
              <el-input
                v-model="form.buyBoxWinner"
                placeholder="Buy Box资格"
              />
            </el-form-item>
            <el-form-item label="Buy Box币种" prop="buyBoxCurrency">
              <el-input
                v-model="form.buyBoxCurrency"
                placeholder="Buy Box币种"
              />
            </el-form-item>
            <el-form-item label="总费用" prop="totalFee">
              <el-input
                v-model="form.totalFee"
                placeholder="总费用"
              />
            </el-form-item>
            <el-form-item label="销售佣金" prop="referralFee">
              <el-input
                v-model="form.referralFee"
                placeholder="销售佣金"
              />
            </el-form-item>
            <el-form-item label="交易手续费" prop="variableClosingFee">
              <el-input
                v-model="form.variableClosingFee"
                placeholder="交易手续费"
              />
            </el-form-item>
            <el-form-item label="计件费用" prop="perItemFee">
              <el-input
                v-model="form.perItemFee"
                placeholder="计件费用"
              />
            </el-form-item>
            <el-form-item label="FBA费用" prop="fbaFees">
              <el-input
                v-model="form.fbaFees"
                placeholder="FBA费用"
              />
            </el-form-item>
            <el-form-item label="费用币种" prop="feeCurrency">
              <el-input
                v-model="form.feeCurrency"
                placeholder="费用币种"
              />
            </el-form-item>
            <el-form-item label="变化字符" prop="vartationStr">
              <el-input
                v-model="form.vartationStr"
                placeholder="变化字符"
              />
            </el-form-item>
            <el-form-item label="BestSeller排名字符" prop="bsrRankStr">
              <el-input
                v-model="form.bsrRankStr"
                placeholder="BestSeller排名字符"
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
import { addErpProductSpecifics, delErpProductSpecifics, getErpProductSpecifics, listErpProductSpecifics, updateErpProductSpecifics } from '@/api/specifics'
import FileChoose from '@/components/FileChoose'

export default {
  name: 'ErpProductSpecifics',
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
      productList: [],

      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        shopId: undefined,
        marketplaceId: undefined,
        dxmState: undefined,
        sku: undefined,
        title: undefined,
        saleStartDate: undefined,
        saleEndDate: undefined,
        fnsku: undefined,
        commodityName: undefined,
        siteName: undefined

      },
      // 表单参数
      form: {
      },
      // 表单校验
      rules: { shopId:
                [
                  { required: true, message: '店铺id不能为空', trigger: 'blur' }
                ],
      marketplaceId:
                [
                  { required: true, message: '市场id不能为空', trigger: 'blur' }
                ],
      dxmState:
                [
                  { required: true, message: '产品状态不能为空', trigger: 'blur' }
                ],
      sku:
                [
                  { required: true, message: 'SKU不能为空', trigger: 'blur' }
                ],
      title:
                [
                  { required: true, message: '产品标题不能为空', trigger: 'blur' }
                ],
      saleStartDate:
                [
                  { required: true, message: '开始售出日期不能为空', trigger: 'blur' }
                ],
      saleEndDate:
                [
                  { required: true, message: '销售结束日期不能为空', trigger: 'blur' }
                ],
      fnsku:
                [
                  { required: true, message: 'FNSKU不能为空', trigger: 'blur' }
                ],
      commodityName:
                [
                  { required: true, message: '商品名称不能为空', trigger: 'blur' }
                ],
      siteName:
                [
                  { required: true, message: '站点名称不能为空', trigger: 'blur' }
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
      listErpProductSpecifics(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.productList = response.data.list
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
        puid: undefined,
        shopId: undefined,
        marketplaceId: undefined,
        fullCid: undefined,
        parentId: undefined,
        dxmState: undefined,
        dxmPublishState: undefined,
        errMsg: undefined,
        asin: undefined,
        listingId: undefined,
        parentAsin: undefined,
        childAsins: undefined,
        isVariation: undefined,
        sku: undefined,
        standardProductType: undefined,
        standardProductId: undefined,
        title: undefined,
        brand: undefined,
        manufacturer: undefined,
        description: undefined,
        bulletPoint: undefined,
        conditionType: undefined,
        conditionValue: undefined,
        standardPrice: undefined,
        listingPricing: undefined,
        switchFulfillmentTo: undefined,
        fulfillmentChannel: undefined,
        partNumber: undefined,
        mainImage: undefined,
        saleStartDate: undefined,
        saleEndDate: undefined,
        saleSalePrice: undefined,
        quantity: undefined,
        openDate: undefined,
        itemDimensions: undefined,
        packageDimensions: undefined,
        standardPriceCurrency: undefined,
        specifics: undefined,
        variationChildStr: undefined,
        onlineStatus: undefined,
        saleNum: undefined,
        fnsku: undefined,
        warehousing: undefined,
        unsellable: undefined,
        reservedQty: undefined,
        purchaseCost: undefined,
        headTripCost: undefined,
        shipCost: undefined,
        priceFeedStatus: undefined,
        inventoryFeedStatus: undefined,
        updateStandardPrice: undefined,
        updateQuantity: undefined,
        rating: undefined,
        ratingCount: undefined,
        rank: undefined,
        bsrRank: undefined,
        commodityId: undefined,
        devId: undefined,
        createId: undefined,
        updateId: undefined,
        lpriceUpdateTime: undefined,
        lpriceStatus: undefined,
        childList: undefined,
        salePrices: undefined,
        adCosts: undefined,
        currency: undefined,
        costCurrency: undefined,
        commoditySku: undefined,
        commodityName: undefined,
        shopName: undefined,
        siteName: undefined,
        domain: undefined,
        childNum: undefined,
        devIds: undefined,
        devName: undefined,
        variationStrMap: undefined,
        listingPrice: undefined,
        shippingPrice: undefined,
        buyBoxWinner: undefined,
        buyBoxCurrency: undefined,
        totalFee: undefined,
        referralFee: undefined,
        variableClosingFee: undefined,
        perItemFee: undefined,
        fbaFees: undefined,
        feeCurrency: undefined,
        vartationStr: undefined,
        bsrRankStr: undefined
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
      this.title = '添加在线产品'
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
      getErpProductSpecifics(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改在线产品'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateErpProductSpecifics(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('修改成功')
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addErpProductSpecifics(this.form).then(response => {
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
        return delErpProductSpecifics({ 'ids': Ids })
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(function() {
      })
    }
  }
}
</script>
