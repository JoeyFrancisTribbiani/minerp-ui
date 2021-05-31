
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">

          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:summary:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:summary:edit']"
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
              v-permisaction="['admin:summary:remove']"
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
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                v-permisaction="['admin:summary:edit']"
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
              >修改
              </el-button>
              <el-button
                v-permisaction="['admin:summary:remove']"
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
            <el-form-item label="null" prop="month">
              <el-input
                v-model="form.month"
                placeholder="null"
              />
            </el-form-item>
            <el-form-item label="店铺id" prop="shopId">
              <el-input
                v-model="form.shopId"
                placeholder="店铺id"
              />
            </el-form-item>
            <el-form-item label="店铺名称" prop="shopName">
              <el-input
                v-model="form.shopName"
                placeholder="店铺名称"
              />
            </el-form-item>
            <el-form-item label="市场id" prop="marketplaceId">
              <el-input
                v-model="form.marketplaceId"
                placeholder="市场id"
              />
            </el-form-item>
            <el-form-item label="市场" prop="marketplace">
              <el-input
                v-model="form.marketplace"
                placeholder="市场"
              />
            </el-form-item>
            <el-form-item label="销售数量" prop="sumSalesNum">
              <el-input
                v-model="form.sumSalesNum"
                placeholder="销售数量"
              />
            </el-form-item>
            <el-form-item label="亚马逊FBA销量" prop="fbaSalesNum">
              <el-input
                v-model="form.fbaSalesNum"
                placeholder="亚马逊FBA销量"
              />
            </el-form-item>
            <el-form-item label="亚马逊FBM销量" prop="fbmSalesNum">
              <el-input
                v-model="form.fbmSalesNum"
                placeholder="亚马逊FBM销量"
              />
            </el-form-item>
            <el-form-item label="亚马逊补发销量" prop="fbaReissueNum">
              <el-input
                v-model="form.fbaReissueNum"
                placeholder="亚马逊补发销量"
              />
            </el-form-item>
            <el-form-item label="多渠道销量" prop="multiChannelNum">
              <el-input
                v-model="form.multiChannelNum"
                placeholder="多渠道销量"
              />
            </el-form-item>
            <el-form-item label="退款量" prop="refundNum">
              <el-input
                v-model="form.refundNum"
                placeholder="退款量"
              />
            </el-form-item>
            <el-form-item label="退货量" prop="returnNum">
              <el-input
                v-model="form.returnNum"
                placeholder="退货量"
              />
            </el-form-item>
            <el-form-item label="赔偿量" prop="compensationNum">
              <el-input
                v-model="form.compensationNum"
                placeholder="赔偿量"
              />
            </el-form-item>
            <el-form-item label="销毁量" prop="disposedNum">
              <el-input
                v-model="form.disposedNum"
                placeholder="销毁量"
              />
            </el-form-item>
            <el-form-item label="移除量" prop="removalNum">
              <el-input
                v-model="form.removalNum"
                placeholder="移除量"
              />
            </el-form-item>
            <el-form-item label="订单收入" prop="sumOrderSales">
              <el-input
                v-model="form.sumOrderSales"
                placeholder="订单收入"
              />
            </el-form-item>
            <el-form-item label="销售额" prop="productSales">
              <el-input
                v-model="form.productSales"
                placeholder="销售额"
              />
            </el-form-item>
            <el-form-item label="买家运费" prop="shippingCredits">
              <el-input
                v-model="form.shippingCredits"
                placeholder="买家运费"
              />
            </el-form-item>
            <el-form-item label="促销折扣" prop="promotionalRebates">
              <el-input
                v-model="form.promotionalRebates"
                placeholder="促销折扣"
              />
            </el-form-item>
            <el-form-item label="退款" prop="refund">
              <el-input
                v-model="form.refund"
                placeholder="退款"
              />
            </el-form-item>
            <el-form-item label="赔偿收入" prop="compensation">
              <el-input
                v-model="form.compensation"
                placeholder="赔偿收入"
              />
            </el-form-item>
            <el-form-item label="库存调整赔偿" prop="adjCompensation">
              <el-input
                v-model="form.adjCompensation"
                placeholder="库存调整赔偿"
              />
            </el-form-item>
            <el-form-item label="订单费用" prop="sumOrderFee">
              <el-input
                v-model="form.sumOrderFee"
                placeholder="订单费用"
              />
            </el-form-item>
            <el-form-item label="销售订单" prop="saleOrderFee">
              <el-input
                v-model="form.saleOrderFee"
                placeholder="销售订单"
              />
            </el-form-item>
            <el-form-item label="平台费" prop="saleSellingFee">
              <el-input
                v-model="form.saleSellingFee"
                placeholder="平台费"
              />
            </el-form-item>
            <el-form-item label="FBA发货费" prop="saleFbaFee">
              <el-input
                v-model="form.saleFbaFee"
                placeholder="FBA发货费"
              />
            </el-form-item>
            <el-form-item label="FBM发货费" prop="saleFbmFee">
              <el-input
                v-model="form.saleFbmFee"
                placeholder="FBM发货费"
              />
            </el-form-item>
            <el-form-item label="其他费" prop="saleOtherFee">
              <el-input
                v-model="form.saleOtherFee"
                placeholder="其他费"
              />
            </el-form-item>
            <el-form-item label="多渠道订单" prop="multiChannelOrderFee">
              <el-input
                v-model="form.multiChannelOrderFee"
                placeholder="多渠道订单"
              />
            </el-form-item>
            <el-form-item label="FBA发货费" prop="mcFbaShipFee">
              <el-input
                v-model="form.mcFbaShipFee"
                placeholder="FBA发货费"
              />
            </el-form-item>
            <el-form-item label="退款订单" prop="refundOrderFees">
              <el-input
                v-model="form.refundOrderFees"
                placeholder="退款订单"
              />
            </el-form-item>
            <el-form-item label="平台费" prop="refundSellingFee">
              <el-input
                v-model="form.refundSellingFee"
                placeholder="平台费"
              />
            </el-form-item>
            <el-form-item label="FBA发货费" prop="refundFbaFee">
              <el-input
                v-model="form.refundFbaFee"
                placeholder="FBA发货费"
              />
            </el-form-item>
            <el-form-item label="其他费" prop="refundOtherFee">
              <el-input
                v-model="form.refundOtherFee"
                placeholder="其他费"
              />
            </el-form-item>
            <el-form-item label="仓储费用" prop="sumFbaStorageFee">
              <el-input
                v-model="form.sumFbaStorageFee"
                placeholder="仓储费用"
              />
            </el-form-item>
            <el-form-item label="店铺仓储费用" prop="sumShopFbaStorageFee">
              <el-input
                v-model="form.sumShopFbaStorageFee"
                placeholder="店铺仓储费用"
              />
            </el-form-item>
            <el-form-item label="FBA月仓储费" prop="fbaStorageFee">
              <el-input
                v-model="form.fbaStorageFee"
                placeholder="FBA月仓储费"
              />
            </el-form-item>
            <el-form-item label="FBA月仓储费差" prop="fbaStorageFeeDiff">
              <el-input
                v-model="form.fbaStorageFeeDiff"
                placeholder="FBA月仓储费差"
              />
            </el-form-item>
            <el-form-item label="0.00" prop="fbaLongStorageFee">
              <el-input
                v-model="form.fbaLongStorageFee"
                placeholder="0.00"
              />
            </el-form-item>
            <el-form-item label="店铺其他仓储费用汇总" prop="sumShopFbaStorageOtherFee">
              <el-input
                v-model="form.sumShopFbaStorageOtherFee"
                placeholder="店铺其他仓储费用汇总"
              />
            </el-form-item>
            <el-form-item label="库存调整费" prop="fbaAdjustmentFee">
              <el-input
                v-model="form.fbaAdjustmentFee"
                placeholder="库存调整费"
              />
            </el-form-item>
            <el-form-item label="FBA销毁费" prop="fbaDisposalFee">
              <el-input
                v-model="form.fbaDisposalFee"
                placeholder="FBA销毁费"
              />
            </el-form-item>
            <el-form-item label="FBA移除费" prop="fbaRemovalFee">
              <el-input
                v-model="form.fbaRemovalFee"
                placeholder="FBA移除费"
              />
            </el-form-item>
            <el-form-item label="退货入仓费" prop="fbaReturnFee">
              <el-input
                v-model="form.fbaReturnFee"
                placeholder="退货入仓费"
              />
            </el-form-item>
            <el-form-item label="亚马逊合作承运费" prop="fbaShipFee">
              <el-input
                v-model="form.fbaShipFee"
                placeholder="亚马逊合作承运费"
              />
            </el-form-item>
            <el-form-item label="其他费" prop="fbaStorageOtherFee">
              <el-input
                v-model="form.fbaStorageOtherFee"
                placeholder="其他费"
              />
            </el-form-item>
            <el-form-item label="库存配置费" prop="fbaInventoryPlacementFee">
              <el-input
                v-model="form.fbaInventoryPlacementFee"
                placeholder="库存配置费"
              />
            </el-form-item>
            <el-form-item label="广告费" prop="sumCpcCost">
              <el-input
                v-model="form.sumCpcCost"
                placeholder="广告费"
              />
            </el-form-item>
            <el-form-item label="CPC广告费" prop="cpcCost">
              <el-input
                v-model="form.cpcCost"
                placeholder="CPC广告费"
              />
            </el-form-item>
            <el-form-item label="CPC广告费差异" prop="cpcCostDiff">
              <el-input
                v-model="form.cpcCostDiff"
                placeholder="CPC广告费差异"
              />
            </el-form-item>
            <el-form-item label="推广费用" prop="sumPromoteFee">
              <el-input
                v-model="form.sumPromoteFee"
                placeholder="推广费用"
              />
            </el-form-item>
            <el-form-item label="LD费" prop="ldPromoteFee">
              <el-input
                v-model="form.ldPromoteFee"
                placeholder="LD费"
              />
            </el-form-item>
            <el-form-item label="优惠劵" prop="couponsPromoteFee">
              <el-input
                v-model="form.couponsPromoteFee"
                placeholder="优惠劵"
              />
            </el-form-item>
            <el-form-item label="早期评论人计划" prop="erpPromoteFee">
              <el-input
                v-model="form.erpPromoteFee"
                placeholder="早期评论人计划"
              />
            </el-form-item>
            <el-form-item label="税费" prop="sumTax">
              <el-input
                v-model="form.sumTax"
                placeholder="税费"
              />
            </el-form-item>
            <el-form-item label="税费" prop="tax">
              <el-input
                v-model="form.tax"
                placeholder="税费"
              />
            </el-form-item>
            <el-form-item label="商品成本" prop="sumProductCostFee">
              <el-input
                v-model="form.sumProductCostFee"
                placeholder="商品成本"
              />
            </el-form-item>
            <el-form-item label="总采购成本" prop="sumPurchaseFee">
              <el-input
                v-model="form.sumPurchaseFee"
                placeholder="总采购成本"
              />
            </el-form-item>
            <el-form-item label="总头程费用" prop="sumHeadTripFee">
              <el-input
                v-model="form.sumHeadTripFee"
                placeholder="总头程费用"
              />
            </el-form-item>
            <el-form-item label="售出商品" prop="salePcFee">
              <el-input
                v-model="form.salePcFee"
                placeholder="售出商品"
              />
            </el-form-item>
            <el-form-item label="采购成本" prop="purchasePcFee">
              <el-input
                v-model="form.purchasePcFee"
                placeholder="采购成本"
              />
            </el-form-item>
            <el-form-item label="头程费用" prop="headTripPcFee">
              <el-input
                v-model="form.headTripPcFee"
                placeholder="头程费用"
              />
            </el-form-item>
            <el-form-item label="销毁商品" prop="disposedPcFee">
              <el-input
                v-model="form.disposedPcFee"
                placeholder="销毁商品"
              />
            </el-form-item>
            <el-form-item label="采购成本（销毁）" prop="purchaseDpcFee">
              <el-input
                v-model="form.purchaseDpcFee"
                placeholder="采购成本（销毁）"
              />
            </el-form-item>
            <el-form-item label="头程费用（销毁）" prop="headTripDpcFee">
              <el-input
                v-model="form.headTripDpcFee"
                placeholder="头程费用（销毁）"
              />
            </el-form-item>
            <el-form-item label="退货成本" prop="returnPcFee">
              <el-input
                v-model="form.returnPcFee"
                placeholder="退货成本"
              />
            </el-form-item>
            <el-form-item label="采购成本（退货）" prop="purchaseRtpcFee">
              <el-input
                v-model="form.purchaseRtpcFee"
                placeholder="采购成本（退货）"
              />
            </el-form-item>
            <el-form-item label="头程费用（退货）" prop="headTripRtpcFee">
              <el-input
                v-model="form.headTripRtpcFee"
                placeholder="头程费用（退货）"
              />
            </el-form-item>
            <el-form-item label="FBA库存赔偿" prop="adjCompensationPcFee">
              <el-input
                v-model="form.adjCompensationPcFee"
                placeholder="FBA库存赔偿"
              />
            </el-form-item>
            <el-form-item label="采购成本（赔偿）" prop="purchaseAcpcFee">
              <el-input
                v-model="form.purchaseAcpcFee"
                placeholder="采购成本（赔偿）"
              />
            </el-form-item>
            <el-form-item label="头程费用（赔偿）" prop="headTripAcpcFee">
              <el-input
                v-model="form.headTripAcpcFee"
                placeholder="头程费用（赔偿）"
              />
            </el-form-item>
            <el-form-item label="多渠道订单商品" prop="multiChannelPcFee">
              <el-input
                v-model="form.multiChannelPcFee"
                placeholder="多渠道订单商品"
              />
            </el-form-item>
            <el-form-item label="采购成本" prop="purchaseMcpcFee">
              <el-input
                v-model="form.purchaseMcpcFee"
                placeholder="采购成本"
              />
            </el-form-item>
            <el-form-item label="头程费用" prop="headTripMcpcFee">
              <el-input
                v-model="form.headTripMcpcFee"
                placeholder="头程费用"
              />
            </el-form-item>
            <el-form-item label="补发成本" prop="reissuePcFee">
              <el-input
                v-model="form.reissuePcFee"
                placeholder="补发成本"
              />
            </el-form-item>
            <el-form-item label="采购成本" prop="purchaseRpcFee">
              <el-input
                v-model="form.purchaseRpcFee"
                placeholder="采购成本"
              />
            </el-form-item>
            <el-form-item label="头程费用" prop="headTripRpcFee">
              <el-input
                v-model="form.headTripRpcFee"
                placeholder="头程费用"
              />
            </el-form-item>
            <el-form-item label="批次商品成本合计" prop="sumBatchProductCostFee">
              <el-input
                v-model="form.sumBatchProductCostFee"
                placeholder="批次商品成本合计"
              />
            </el-form-item>
            <el-form-item label="批次采购成本合计" prop="sumBatchPurchaseFee">
              <el-input
                v-model="form.sumBatchPurchaseFee"
                placeholder="批次采购成本合计"
              />
            </el-form-item>
            <el-form-item label="批次头程费用合计" prop="sumBatchHeadTripFee">
              <el-input
                v-model="form.sumBatchHeadTripFee"
                placeholder="批次头程费用合计"
              />
            </el-form-item>
            <el-form-item label="批次采购其他成本合计" prop="sumBatchPurchaseOtherFee">
              <el-input
                v-model="form.sumBatchPurchaseOtherFee"
                placeholder="批次采购其他成本合计"
              />
            </el-form-item>
            <el-form-item label="批次头程其他费用合计" prop="sumBatchHeadTripOtherFee">
              <el-input
                v-model="form.sumBatchHeadTripOtherFee"
                placeholder="批次头程其他费用合计"
              />
            </el-form-item>
            <el-form-item label="批次售出商品" prop="batchSalePcFee">
              <el-input
                v-model="form.batchSalePcFee"
                placeholder="批次售出商品"
              />
            </el-form-item>
            <el-form-item label="批次采购成本" prop="batchPurchasePcFee">
              <el-input
                v-model="form.batchPurchasePcFee"
                placeholder="批次采购成本"
              />
            </el-form-item>
            <el-form-item label="批次头程费用" prop="batchTripPcFee">
              <el-input
                v-model="form.batchTripPcFee"
                placeholder="批次头程费用"
              />
            </el-form-item>
            <el-form-item label="批次退货成本" prop="batchCustomerReturnsPcFee">
              <el-input
                v-model="form.batchCustomerReturnsPcFee"
                placeholder="批次退货成本"
              />
            </el-form-item>
            <el-form-item label="批次采购成本（退货）" prop="batchPurchaseCrpcFee">
              <el-input
                v-model="form.batchPurchaseCrpcFee"
                placeholder="批次采购成本（退货）"
              />
            </el-form-item>
            <el-form-item label="批次头程费用（退货）" prop="batchTripCrpcFee">
              <el-input
                v-model="form.batchTripCrpcFee"
                placeholder="批次头程费用（退货）"
              />
            </el-form-item>
            <el-form-item label="批次FBA库存赔偿" prop="batchAdjustmentsPcFee">
              <el-input
                v-model="form.batchAdjustmentsPcFee"
                placeholder="批次FBA库存赔偿"
              />
            </el-form-item>
            <el-form-item label="批次采购成本（赔偿）" prop="batchPurchaseApcFee">
              <el-input
                v-model="form.batchPurchaseApcFee"
                placeholder="批次采购成本（赔偿）"
              />
            </el-form-item>
            <el-form-item label="批次头程费用（赔偿）" prop="batchTripApcFee">
              <el-input
                v-model="form.batchTripApcFee"
                placeholder="批次头程费用（赔偿）"
              />
            </el-form-item>
            <el-form-item label="批次供应商退货" prop="batchVendorReturnsPcFee">
              <el-input
                v-model="form.batchVendorReturnsPcFee"
                placeholder="批次供应商退货"
              />
            </el-form-item>
            <el-form-item label="批次采购成本（供应商退货）" prop="batchPurchaseVrpcFee">
              <el-input
                v-model="form.batchPurchaseVrpcFee"
                placeholder="批次采购成本（供应商退货）"
              />
            </el-form-item>
            <el-form-item label="批次头程费用（供应商退货）" prop="batchTripVrpcFee">
              <el-input
                v-model="form.batchTripVrpcFee"
                placeholder="批次头程费用（供应商退货）"
              />
            </el-form-item>
            <el-form-item label="批次差异" prop="batchDifferencePcFee">
              <el-input
                v-model="form.batchDifferencePcFee"
                placeholder="批次差异"
              />
            </el-form-item>
            <el-form-item label="批次采购成本（差异）" prop="batchPurchaseDfpcFee">
              <el-input
                v-model="form.batchPurchaseDfpcFee"
                placeholder="批次采购成本（差异）"
              />
            </el-form-item>
            <el-form-item label="批次头程费用（差异）" prop="batchTripDfpcFee">
              <el-input
                v-model="form.batchTripDfpcFee"
                placeholder="批次头程费用（差异）"
              />
            </el-form-item>
            <el-form-item label="平台其他费用" prop="sumOtherFee">
              <el-input
                v-model="form.sumOtherFee"
                placeholder="平台其他费用"
              />
            </el-form-item>
            <el-form-item label="订阅费" prop="subscriptionFee">
              <el-input
                v-model="form.subscriptionFee"
                placeholder="订阅费"
              />
            </el-form-item>
            <el-form-item label="其他费" prop="otherFee">
              <el-input
                v-model="form.otherFee"
                placeholder="其他费"
              />
            </el-form-item>
            <el-form-item label="自定义费用" prop="sumCustomizeFee">
              <el-input
                v-model="form.sumCustomizeFee"
                placeholder="自定义费用"
              />
            </el-form-item>
            <el-form-item label="测评费" prop="evaluationFee">
              <el-input
                v-model="form.evaluationFee"
                placeholder="测评费"
              />
            </el-form-item>
            <el-form-item label="测评本金" prop="evaluationCapital">
              <el-input
                v-model="form.evaluationCapital"
                placeholder="测评本金"
              />
            </el-form-item>
            <el-form-item label="测评佣金" prop="evaluationCommission">
              <el-input
                v-model="form.evaluationCommission"
                placeholder="测评佣金"
              />
            </el-form-item>
            <el-form-item label="店铺其他费" prop="shopOtherFee">
              <el-input
                v-model="form.shopOtherFee"
                placeholder="店铺其他费"
              />
            </el-form-item>
            <el-form-item label="ASIN其他费" prop="asinOtherFee">
              <el-input
                v-model="form.asinOtherFee"
                placeholder="ASIN其他费"
              />
            </el-form-item>
            <el-form-item label="固定费用" prop="fixedFee">
              <el-input
                v-model="form.fixedFee"
                placeholder="固定费用"
              />
            </el-form-item>
            <el-form-item label="毛利润" prop="grossProfit">
              <el-input
                v-model="form.grossProfit"
                placeholder="毛利润"
              />
            </el-form-item>
            <el-form-item label="毛利率" prop="grossProfitRate">
              <el-input
                v-model="form.grossProfitRate"
                placeholder="毛利率"
              />
            </el-form-item>
            <el-form-item label="ROI" prop="roi">
              <el-input
                v-model="form.roi"
                placeholder="ROI"
              />
            </el-form-item>
            <el-form-item label="ori_currency" prop="oriCurrency">
              <el-input
                v-model="form.oriCurrency"
                placeholder="ori_currency"
              />
            </el-form-item>
            <el-form-item label="币种" prop="currency">
              <el-input
                v-model="form.currency"
                placeholder="币种"
              />
            </el-form-item>
            <el-form-item label="店铺其他费用" prop="shopOtherFees">
              <el-input
                v-model="form.shopOtherFees"
                placeholder="店铺其他费用"
              />
            </el-form-item>
            <el-form-item label="坏数据项" prop="badDataItems">
              <el-input
                v-model="form.badDataItems"
                placeholder="坏数据项"
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
import { addErpFinanceSummary, delErpFinanceSummary, getErpFinanceSummary, listErpFinanceSummary, updateErpFinanceSummary } from '@/api/summary'
import FileChoose from '@/components/FileChoose'

export default {
  name: 'ErpFinanceSummary',
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
        pageSize: 10

      },
      // 表单参数
      form: {
      },
      // 表单校验
      rules: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询参数列表 */
    getList() {
      this.loading = true
      listErpFinanceSummary(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
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
        month: undefined,
        shopId: undefined,
        shopName: undefined,
        marketplaceId: undefined,
        marketplace: undefined,
        sumSalesNum: undefined,
        fbaSalesNum: undefined,
        fbmSalesNum: undefined,
        fbaReissueNum: undefined,
        multiChannelNum: undefined,
        refundNum: undefined,
        returnNum: undefined,
        compensationNum: undefined,
        disposedNum: undefined,
        removalNum: undefined,
        sumOrderSales: undefined,
        productSales: undefined,
        shippingCredits: undefined,
        promotionalRebates: undefined,
        refund: undefined,
        compensation: undefined,
        adjCompensation: undefined,
        sumOrderFee: undefined,
        saleOrderFee: undefined,
        saleSellingFee: undefined,
        saleFbaFee: undefined,
        saleFbmFee: undefined,
        saleOtherFee: undefined,
        multiChannelOrderFee: undefined,
        mcFbaShipFee: undefined,
        refundOrderFees: undefined,
        refundSellingFee: undefined,
        refundFbaFee: undefined,
        refundOtherFee: undefined,
        sumFbaStorageFee: undefined,
        sumShopFbaStorageFee: undefined,
        fbaStorageFee: undefined,
        fbaStorageFeeDiff: undefined,
        fbaLongStorageFee: undefined,
        sumShopFbaStorageOtherFee: undefined,
        fbaAdjustmentFee: undefined,
        fbaDisposalFee: undefined,
        fbaRemovalFee: undefined,
        fbaReturnFee: undefined,
        fbaShipFee: undefined,
        fbaStorageOtherFee: undefined,
        fbaInventoryPlacementFee: undefined,
        sumCpcCost: undefined,
        cpcCost: undefined,
        cpcCostDiff: undefined,
        sumPromoteFee: undefined,
        ldPromoteFee: undefined,
        couponsPromoteFee: undefined,
        erpPromoteFee: undefined,
        sumTax: undefined,
        tax: undefined,
        sumProductCostFee: undefined,
        sumPurchaseFee: undefined,
        sumHeadTripFee: undefined,
        salePcFee: undefined,
        purchasePcFee: undefined,
        headTripPcFee: undefined,
        disposedPcFee: undefined,
        purchaseDpcFee: undefined,
        headTripDpcFee: undefined,
        returnPcFee: undefined,
        purchaseRtpcFee: undefined,
        headTripRtpcFee: undefined,
        adjCompensationPcFee: undefined,
        purchaseAcpcFee: undefined,
        headTripAcpcFee: undefined,
        multiChannelPcFee: undefined,
        purchaseMcpcFee: undefined,
        headTripMcpcFee: undefined,
        reissuePcFee: undefined,
        purchaseRpcFee: undefined,
        headTripRpcFee: undefined,
        sumBatchProductCostFee: undefined,
        sumBatchPurchaseFee: undefined,
        sumBatchHeadTripFee: undefined,
        sumBatchPurchaseOtherFee: undefined,
        sumBatchHeadTripOtherFee: undefined,
        batchSalePcFee: undefined,
        batchPurchasePcFee: undefined,
        batchTripPcFee: undefined,
        batchCustomerReturnsPcFee: undefined,
        batchPurchaseCrpcFee: undefined,
        batchTripCrpcFee: undefined,
        batchAdjustmentsPcFee: undefined,
        batchPurchaseApcFee: undefined,
        batchTripApcFee: undefined,
        batchVendorReturnsPcFee: undefined,
        batchPurchaseVrpcFee: undefined,
        batchTripVrpcFee: undefined,
        batchDifferencePcFee: undefined,
        batchPurchaseDfpcFee: undefined,
        batchTripDfpcFee: undefined,
        sumOtherFee: undefined,
        subscriptionFee: undefined,
        otherFee: undefined,
        sumCustomizeFee: undefined,
        evaluationFee: undefined,
        evaluationCapital: undefined,
        evaluationCommission: undefined,
        shopOtherFee: undefined,
        asinOtherFee: undefined,
        fixedFee: undefined,
        grossProfit: undefined,
        grossProfitRate: undefined,
        roi: undefined,
        oriCurrency: undefined,
        currency: undefined,
        shopOtherFees: undefined,
        badDataItems: undefined
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
      this.title = '添加店铺汇总'
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
      getErpFinanceSummary(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改店铺汇总'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateErpFinanceSummary(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('修改成功')
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addErpFinanceSummary(this.form).then(response => {
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
        return delErpFinanceSummary({ 'ids': Ids })
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(function() {
      })
    }
  }
}
</script>
