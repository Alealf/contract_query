<!--
 * @Author: liu jinwei kk2324982471@163.com
 * @Date: 2023-04-06 11:00:28
 * @LastEditors: liu jinwei kk2324982471@163.com
 * @LastEditTime: 2023-04-17 14:43:45
 * @FilePath: \doc_query_vue\src\pages\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="contain">
    <div class="cont">
      <h2>请输入需要分类的贷款合同文本</h2>
      <div>
        <span>请选择分类算法：</span>
        <el-select
          v-model="resData.select"
          class="m-2"
          placeholder="Select"
          size="large"
        >
          <el-option v-for="item in pageData.options" :key="item" :value="item" />
        </el-select>
      </div>
      <el-row style="margin-top: 10px">
        <!-- span指定列的宽度 -->
        <el-col :span="20">
          <!-- 搜索框 -->
          <!-- 通过v-model做数据绑定 -->
          <el-input
            v-model="resData.query"
            :autosize="{ minRows: 3, maxRows: 3 }"
            type="textarea"
            placeholder="请输入需要分类的贷款合同文本"
            class="input-with-select"
            @keyup.enter="enterSearch"
          >
          </el-input>
        </el-col>
        <!-- 查询、新增按钮 -->
        <el-col :span="4">
          <button class="but" @click="send()">查询</button>
        </el-col>
      </el-row>
      <div style="height: 15px"></div>
      <div v-for="(item, index) in resData.key_word" :key="index">
        <el-row :gutter="20" style="height: 40px">
          <el-col :span="12">
            <el-input
              v-model="resData.key_word[index].name"
              placeholder="请输入关键词"
            />
          </el-col>
          <el-col :span="6">
            <div class="slider-demo-block">
              <span class="demonstration">关联程度（-20 ~ 20）: </span>
              <el-input-number
                v-model="resData.key_word[index].scale"
                :step="0.1"
                :min="-20"
                :max="20"
                step-strictly
              />
            </div>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button
                v-if="index + 1 === resData.key_word.length"
                @click="addpoint(item, index)"
                type="primary"
              >
                增加
              </el-button>
              <el-button
                v-if="index !== 0"
                @click="deletepoint(item, index)"
                type="danger"
                >删除</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div style="height: 15px"></div>
      <el-checkbox v-model="resData.hasDes" label="返回分类描述" border></el-checkbox>
      <el-card class="box-card">
        <div v-for="(res, index) in resData.result" :key="res" class="text item">
          <h4>{{ index + 1 + "." + res.name }}</h4>
          <div style="margin: 5px">匹配得分：{{ res.score }}</div>
          <el-tag
            v-for="(item, index) in res.keywords"
            :key="item.name"
            :type="pageData.type_list[index % 5]"
            class="restap"
            :style="{ backgroundColor: getTransparentColor(item.score) }"
            style="color: #000"
          >
            {{ item.name }} :
            {{ item.score }}
          </el-tag>
          <div style="margin: 5px" v-if="resData.hasDes">{{ res.des }}</div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import { sendQuery } from "/src/api/send";
const resData = reactive({
  query: "",
  hasDes: false,
  select: "BM25",
  key_word: [
    {
      name: "",
      scale: 0,
    },
  ],
  result: [],
});
const pageData = reactive({
  type_list: ["", "success", "info", "danger", "warning"],
  options: ["BM25", "TFIDF"],
})
const send = async () => {
  resData.result = [{ name: "加载中。。。" }];
  sendQuery(resData.query, resData.hasDes, resData.select, resData.key_word)
    .then((res) => {
      // 获取数据
      resData.result = res.data.data;
      console.log(res.data.data);
      localStorage.setItem("accesstoken", res.data.access_token);
    })
    .catch((e) => {
      if (e.response) {
        //请求已发出，服务器返回状态码不是2xx。
        console.info(e.response.data);
        console.info(e.response.status);
        console.info(e.response.headers);
      } else {
        //发送请求时异常，捕捉到错误
        console.info("error", e.message);
      }
    });
};
const addpoint = (item, index) => {
  resData.key_word.push({
    name: "",
    scale: 0,
  });
};
const deletepoint = (item, index) => {
  resData.key_word.splice(index, 1);
};
const getTransparentColor = (percentage) => {
  // 定义透明度值
  var alpha = 0.01 * percentage;
  return "rgba(255, 168, 0, " + alpha + ")";
};
</script>
<style scoped>
.contain {
  width: 100%;
  height: 100%;
}
.cont {
  width: 80%;
  margin: 80px auto;
}
.el-button {
  margin-left: 15px;
}

.text {
  font-size: 18px;
}

.item {
  padding: 18px 0;
}

.box-card {
  margin-top: 20px;
  width: 91%;
  min-height: 400px;
  max-height: 900px;
  overflow-y: auto;
}
.but {
  width: 40%;
  font-size: 18px;
  height: 100%;
  margin-left: 10px;
  color: #fff;
  border-radius: 5px;
  background-color: #409eff;
}
.slider-demo-block {
  display: flex;
  align-items: center;
}

.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 2px;
}
.slider-demo-block .demonstration {
  margin-left: 10px;
  margin-right: 5px;
  font-size: 14px;
  color: var(--el-text-color-secondary);
}
.slider-demo-block .demonstration + .el-slider {
  flex: 0 0 70%;
}
.restap {
  margin: 5px;
}
</style>
