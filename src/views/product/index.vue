
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="product title" prop="title"><el-input
            v-model="queryParams.title"
            placeholder="请输入product title"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="null" prop="brand"><el-input
            v-model="queryParams.brand"
            placeholder="请输入null"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="null" prop="manufacturer"><el-input
            v-model="queryParams.manufacturer"
            placeholder="请输入null"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="null" prop="description"><el-input
            v-model="queryParams.description"
            placeholder="请输入null"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="14.99" prop="listingPricing"><el-input
            v-model="queryParams.listingPricing"
            placeholder="请输入14.99"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="AFN" prop="switchFulfillmentTo"><el-input
            v-model="queryParams.switchFulfillmentTo"
            placeholder="请输入AFN"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="null" prop="partNumber"><el-input
            v-model="queryParams.partNumber"
            placeholder="请输入null"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="https://m.media-amazon.com/images/I/613gR7poDQL._SL75_.jpg" prop="mainImage"><el-input
            v-model="queryParams.mainImage"
            placeholder="请输入https://m.media-amazon.com/images/I/613gR7poDQL._SL75_.jpg"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="null" prop="saleStartDate"><el-input
            v-model="queryParams.saleStartDate"
            placeholder="请输入null"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="null" prop="saleEndDate"><el-input
            v-model="queryParams.saleEndDate"
            placeholder="请输入null"
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
              v-permisaction="['admin:product:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:product:edit']"
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
              v-permisaction="['admin:product:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="erpList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" /><el-table-column
            label="product title"
            align="center"
            prop="title"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="null"
            align="center"
            prop="brand"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="null"
            align="center"
            prop="manufacturer"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="null"
            align="center"
            prop="description"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="null"
            align="center"
            prop="bulletPoint"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="null"
            align="center"
            prop="conditionType"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="null"
            align="center"
            prop="conditionValue"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="14.99"
            align="center"
            prop="standardPrice"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="14.99"
            align="center"
            prop="listingPricing"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="AFN"
            align="center"
            prop="switchFulfillmentTo"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="null"
            align="center"
            prop="fulfillmentChannel"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="null"
            align="center"
            prop="partNumber"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="null"
            align="center"
            prop="saleStartDate"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="null"
            align="center"
            prop="saleEndDate"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                v-permisaction="['admin:product:edit']"
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
              >修改
              </el-button>
              <el-button
                v-permisaction="['admin:product:remove']"
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
            <el-form-item label="data_id" prop="dataId">
              <el-input
                v-model="form.dataId"
                placeholder="data_id"
              />
            </el-form-item>
            <el-form-item label="null" prop="puid">
              <el-input
                v-model="form.puid"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="4462" prop="shopId">
              <el-input
                v-model="form.shopId"
                placeholder="4462"
              />
            </el-form-item>
            <el-form-item label="ATVPDKIKX0DER" prop="marketplaceId">
              <el-input
                v-model="form.marketplaceId"
                placeholder="ATVPDKIKX0DER"
              />
            </el-form-item>
            <el-form-item label="" prop="fullCid">
              <el-input
                v-model="form.fullCid"
                placeholder=""
              />
            </el-form-item>
            <el-form-item label="4762270" prop="parentId">
              <el-input
                v-model="form.parentId"
                placeholder="4762270"
              />
            </el-form-item>
            <el-form-item label="online_amazon" prop="dxmState">
              <el-input
                v-model="form.dxmState"
                placeholder="online_amazon"
              />
            </el-form-item>
            <el-form-item label="null" prop="dxmPublishState">
              <el-input
                v-model="form.dxmPublishState"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="null" prop="errMsg">
              <el-input
                v-model="form.errMsg"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="B08KGSXPZS" prop="asin">
              <el-input
                v-model="form.asin"
                placeholder="B08KGSXPZS"
              />
            </el-form-item>
            <el-form-item label="0324YYDEASD" prop="listingId">
              <el-input
                v-model="form.listingId"
                placeholder="0324YYDEASD"
              />
            </el-form-item>
            <el-form-item label="null" prop="parentAsin">
              <el-input
                v-model="form.parentAsin"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="null" prop="childAsins">
              <el-input
                v-model="form.childAsins"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="0" prop="isVariation">
              <el-input
                v-model="form.isVariation"
                placeholder="0"
              />
            </el-form-item>
            <el-form-item label="K7-PQU4-OE8V" prop="sku">
              <el-input
                v-model="form.sku"
                placeholder="K7-PQU4-OE8V"
              />
            </el-form-item>
            <el-form-item label="null" prop="standardProductType">
              <el-input
                v-model="form.standardProductType"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="null" prop="standardProductId">
              <el-input
                v-model="form.standardProductId"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="product title" prop="title">
              <el-input
                v-model="form.title"
                placeholder="product title"
              />
            </el-form-item>
            <el-form-item label="null" prop="brand">
              <el-input
                v-model="form.brand"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="null" prop="manufacturer">
              <el-input
                v-model="form.manufacturer"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="null" prop="description">
              <el-input
                v-model="form.description"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="null" prop="bulletPoint">
              <el-input
                v-model="form.bulletPoint"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="null" prop="conditionType">
              <el-input
                v-model="form.conditionType"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="null" prop="conditionValue">
              <el-input
                v-model="form.conditionValue"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="14.99" prop="standardPrice">
              <el-input
                v-model="form.standardPrice"
                placeholder="14.99"
              />
            </el-form-item>
            <el-form-item label="14.99" prop="listingPricing">
              <el-input
                v-model="form.listingPricing"
                placeholder="14.99"
              />
            </el-form-item>
            <el-form-item label="AFN" prop="switchFulfillmentTo">
              <el-input
                v-model="form.switchFulfillmentTo"
                placeholder="AFN"
              />
            </el-form-item>
            <el-form-item label="null" prop="fulfillmentChannel">
              <el-input
                v-model="form.fulfillmentChannel"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="null" prop="partNumber">
              <el-input
                v-model="form.partNumber"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="https://m.media-amazon.com/images/I/613gR7poDQL._SL75_.jpg" prop="mainImage">
              <el-input
                v-model="form.mainImage"
                placeholder="https://m.media-amazon.com/images/I/613gR7poDQL._SL75_.jpg"
              />
            </el-form-item>
            <el-form-item label="null" prop="saleStartDate">
              <el-input
                v-model="form.saleStartDate"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="null" prop="saleEndDate">
              <el-input
                v-model="form.saleEndDate"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="null" prop="saleSalePrice">
              <el-input
                v-model="form.saleSalePrice"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="0" prop="quantity">
              <el-input
                v-model="form.quantity"
                placeholder="0"
              />
            </el-form-item>
            <el-form-item label="2021-03-23 19:09:08" prop="openDate">
              <el-input
                v-model="form.openDate"
                placeholder="2021-03-23 19:09:08"
              />
            </el-form-item>
            <el-form-item label="null" prop="itemDimensions">
              <el-input
                v-model="form.itemDimensions"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="null" prop="packageDimensions">
              <el-input
                v-model="form.packageDimensions"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="USD" prop="standardPriceCurrency">
              <el-input
                v-model="form.standardPriceCurrency"
                placeholder="USD"
              />
            </el-form-item>
            <el-form-item label="null" prop="specifics">
              <el-input
                v-model="form.specifics"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="null" prop="variationChildStr">
              <el-input
                v-model="form.variationChildStr"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="Active" prop="onlineStatus">
              <el-input
                v-model="form.onlineStatus"
                placeholder="Active"
              />
            </el-form-item>
            <el-form-item label="54" prop="saleNum">
              <el-input
                v-model="form.saleNum"
                placeholder="54"
              />
            </el-form-item>
            <el-form-item label="X002UH0IRH" prop="fnsku">
              <el-input
                v-model="form.fnsku"
                placeholder="X002UH0IRH"
              />
            </el-form-item>
            <el-form-item label="542" prop="warehousing">
              <el-input
                v-model="form.warehousing"
                placeholder="542"
              />
            </el-form-item>
            <el-form-item label="0" prop="unsellable">
              <el-input
                v-model="form.unsellable"
                placeholder="0"
              />
            </el-form-item>
            <el-form-item label="17" prop="reservedQty">
              <el-input
                v-model="form.reservedQty"
                placeholder="17"
              />
            </el-form-item>
            <el-form-item label="0" prop="purchaseCost">
              <el-input
                v-model="form.purchaseCost"
                placeholder="0"
              />
            </el-form-item>
            <el-form-item label="0" prop="headTripCost">
              <el-input
                v-model="form.headTripCost"
                placeholder="0"
              />
            </el-form-item>
            <el-form-item label="null" prop="shipCost">
              <el-input
                v-model="form.shipCost"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="null" prop="priceFeedStatus">
              <el-input
                v-model="form.priceFeedStatus"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="null" prop="inventoryFeedStatus">
              <el-input
                v-model="form.inventoryFeedStatus"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="null" prop="updateStandardPrice">
              <el-input
                v-model="form.updateStandardPrice"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="null" prop="updateQuantity">
              <el-input
                v-model="form.updateQuantity"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="null" prop="rating">
              <el-input
                v-model="form.rating"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="null" prop="ratingCount">
              <el-input
                v-model="form.ratingCount"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="null" prop="rank">
              <el-input
                v-model="form.rank"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="fuck" prop="bsrRank">
              <el-input
                v-model="form.bsrRank"
                placeholder="fuck"
              />
            </el-form-item>
            <el-form-item label="null" prop="commodityId">
              <el-input
                v-model="form.commodityId"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="" prop="devId">
              <el-input
                v-model="form.devId"
                placeholder=""
              />
            </el-form-item>
            <el-form-item label="null" prop="createId">
              <el-input
                v-model="form.createId"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="null" prop="updateId">
              <el-input
                v-model="form.updateId"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="null" prop="lpriceUpdateTime">
              <el-input
                v-model="form.lpriceUpdateTime"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="null" prop="lpriceStatus">
              <el-input
                v-model="form.lpriceStatus"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="null" prop="childList">
              <el-input
                v-model="form.childList"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="809.46" prop="salePrices">
              <el-input
                v-model="form.salePrices"
                placeholder="809.46"
              />
            </el-form-item>
            <el-form-item label="130.33" prop="adCosts">
              <el-input
                v-model="form.adCosts"
                placeholder="130.33"
              />
            </el-form-item>
            <el-form-item label="USD" prop="currency">
              <el-input
                v-model="form.currency"
                placeholder="USD"
              />
            </el-form-item>
            <el-form-item label="null" prop="costCurrency">
              <el-input
                v-model="form.costCurrency"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="null" prop="commoditySku">
              <el-input
                v-model="form.commoditySku"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="null" prop="commodityName">
              <el-input
                v-model="form.commodityName"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="A3LR0SXN8QVIE0-na-US" prop="shopName">
              <el-input
                v-model="form.shopName"
                placeholder="A3LR0SXN8QVIE0-na-US"
              />
            </el-form-item>
            <el-form-item label="美国" prop="siteName">
              <el-input
                v-model="form.siteName"
                placeholder="美国"
              />
            </el-form-item>
            <el-form-item label="www.amazon.com" prop="domain">
              <el-input
                v-model="form.domain"
                placeholder="www.amazon.com"
              />
            </el-form-item>
            <el-form-item label="null" prop="childNum">
              <el-input
                v-model="form.childNum"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="null" prop="devIds">
              <el-input
                v-model="form.devIds"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="null" prop="devName">
              <el-input
                v-model="form.devName"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="null" prop="variationStrMap">
              <el-input
                v-model="form.variationStrMap"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="14.99" prop="listingPrice">
              <el-input
                v-model="form.listingPrice"
                placeholder="14.99"
              />
            </el-form-item>
            <el-form-item label="0" prop="shippingPrice">
              <el-input
                v-model="form.shippingPrice"
                placeholder="0"
              />
            </el-form-item>
            <el-form-item label="false" prop="buyBoxWinner">
              <el-input
                v-model="form.buyBoxWinner"
                placeholder="false"
              />
            </el-form-item>
            <el-form-item label="USD" prop="buyBoxCurrency">
              <el-input
                v-model="form.buyBoxCurrency"
                placeholder="USD"
              />
            </el-form-item>
            <el-form-item label="7.15" prop="totalFee">
              <el-input
                v-model="form.totalFee"
                placeholder="7.15"
              />
            </el-form-item>
            <el-form-item label="2.25" prop="referralFee">
              <el-input
                v-model="form.referralFee"
                placeholder="2.25"
              />
            </el-form-item>
            <el-form-item label="0" prop="variableClosingFee">
              <el-input
                v-model="form.variableClosingFee"
                placeholder="0"
              />
            </el-form-item>
            <el-form-item label="0" prop="perItemFee">
              <el-input
                v-model="form.perItemFee"
                placeholder="0"
              />
            </el-form-item>
            <el-form-item label="4.9" prop="fbaFees">
              <el-input
                v-model="form.fbaFees"
                placeholder="4.9"
              />
            </el-form-item>
            <el-form-item label="USD" prop="feeCurrency">
              <el-input
                v-model="form.feeCurrency"
                placeholder="USD"
              />
            </el-form-item>
            <el-form-item label="" prop="vartationStr">
              <el-input
                v-model="form.vartationStr"
                placeholder=""
              />
            </el-form-item>
            <el-form-item label="null" prop="bsrRankStr">
              <el-input
                v-model="form.bsrRankStr"
                placeholder="null"
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
import { addProduct, delProduct, getProduct, listProduct, updateProduct } from '@/api/product'
import FileChoose from '@/components/FileChoose'

export default {
  name: 'Product',
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
      erpList: [],

      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        title: undefined,
        brand: undefined,
        manufacturer: undefined,
        description: undefined,
        listingPricing: undefined,
        switchFulfillmentTo: undefined,
        partNumber: undefined,
        mainImage: undefined,
        saleStartDate: undefined,
        saleEndDate: undefined

      },
      // 表单参数
      form: {
      },
      // 表单校验
      rules: { title:
                [
                  { required: true, message: 'product title不能为空', trigger: 'blur' }
                ],
      brand:
                [
                  { required: true, message: 'null不能为空', trigger: 'blur' }
                ],
      manufacturer:
                [
                  { required: true, message: 'null不能为空', trigger: 'blur' }
                ],
      description:
                [
                  { required: true, message: 'null不能为空', trigger: 'blur' }
                ],
      listingPricing:
                [
                  { required: true, message: '14.99不能为空', trigger: 'blur' }
                ],
      switchFulfillmentTo:
                [
                  { required: true, message: 'AFN不能为空', trigger: 'blur' }
                ],
      partNumber:
                [
                  { required: true, message: 'null不能为空', trigger: 'blur' }
                ],
      mainImage:
                [
                  { required: true, message: 'https://m.media-amazon.com/images/I/613gR7poDQL._SL75_.jpg不能为空', trigger: 'blur' }
                ],
      saleStartDate:
                [
                  { required: true, message: 'null不能为空', trigger: 'blur' }
                ],
      saleEndDate:
                [
                  { required: true, message: 'null不能为空', trigger: 'blur' }
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
      listProduct(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.erpList = response.data.list
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
        dataId: undefined,
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
      this.title = '添加产品'
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
      getProduct(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改产品'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateProduct(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('修改成功')
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addProduct(this.form).then(response => {
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
        return delProduct({ 'ids': Ids })
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(function() {
      })
    }
  }
}
</script>
