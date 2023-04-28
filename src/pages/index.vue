<!--
 * @Author: liu jinwei kk2324982471@163.com
 * @Date: 2023-04-06 11:00:28
 * @LastEditors: liu jinwei kk2324982471@163.com
 * @LastEditTime: 2023-04-28 14:41:27
 * @FilePath: \doc_query_vue\src\pages\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="contain">
    <div id="header" style="display: block">
      <div class="navigation-bar">
        <div class="navigation-bar-wrapper">
          <img class="logo" src="../image/logo.png" alt="" />
          <div class="navigation-wrapper">文档信息分类分析系统</div>
          <span
            class="icon-setting"
            @click="pageData.config_state = !pageData.config_state"
          ></span>
        </div>
      </div>
    </div>
    <div
      class="setting-options"
      style="display: block"
      v-show="pageData.config_state"
    >
      <span class="setting-options-arrow"
        ><em class="setting-arrow-inner"></em
      ></span>
      <table>
        <tbody>
          <tr class="zonedword-switch setting-checked">
            <td>
              <span class="check-label">使用自定义库</span>
            </td>
            <td>
              <el-switch
                v-model="resData.standard_use_custom"
                size="small"
                active-value="true"
                inactive-value="false"
              />
            </td>
          </tr>
          <tr>
            <td colspan="2"><hr class="split-line" /></td>
          </tr>
          <tr>
            <td>
              <span class="check-label">标准阈值</span>
            </td>
            <td>
              <el-slider v-model="resData.threshold" :step="10" show-stops />
            </td>
          </tr>
          <tr>
            <td>
              <span class="check-label">标准分词模式</span>
            </td>
            <td>
              <el-radio-group
                v-model="resData.cut_standard"
                class="sound-spd-items"
              >
                <el-radio label="search">search</el-radio>
                <el-radio label="cut_all">cut_all</el-radio>
              </el-radio-group>
            </td>
          </tr>
          <tr>
            <td>
              <span class="check-label">资料分词模式</span>
            </td>
            <td>
              <el-radio-group
                v-model="resData.cut_materials"
                class="sound-spd-items"
              >
                <el-radio label="default">default</el-radio>
                <el-radio label="cut_all">cut_all</el-radio>
              </el-radio-group>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="cont">
      <h2>请输入需要分类的文档信息文本</h2>
      <div>
        <span>请选择分类算法：</span>
        <el-select
          v-model="resData.select"
          class="m-2"
          placeholder="Select"
          size="large"
        >
          <el-option
            v-for="item in pageData.options"
            :key="item"
            :value="item"
          />
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
            placeholder="请输入需要分类的文本信息"
            class="input-with-select"
            @keyup.enter="send()"
          >
          </el-input>
        </el-col>
        <!-- 查询、新增按钮 -->
        <el-col :span="4">
          <button class="but" @click="send()">查询</button>
        </el-col>
      </el-row>
      <div style="height: 15px"></div>
      <el-scrollbar height="42px">
        <div
          v-for="(item, index) in resData.key_word"
          :key="index"
          class="keywordsDesc"
        >
          <el-button
            v-if="index + 1 === resData.key_word.length"
            @click="addpoint(item, index)"
            type="primary"
          >
            <span class="iconfont icon-zengjia"></span>
          </el-button>
          <div v-else style="width: 48px"></div>
          <el-input
            style="width: 40%; margin-left: 10px"
            v-model="resData.key_word[index].name"
            placeholder="请输入关键词"
          />
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
          <el-button
            v-if="index !== 0"
            @click="deletepoint(item, index)"
            type="danger"
            ><span class="iconfont icon-shanchu"></span
          ></el-button>
        </div>
      </el-scrollbar>
      <div style="height: 15px"></div>
      <el-checkbox v-model="resData.hasDes" label="返回分类描述"></el-checkbox>
      <el-card class="box-card">
        <div
          v-for="(res, index) in resData.result"
          :key="res"
          class="text item"
        >
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
    <div v-show="pageData.console_state">
      <div class="lang-panel">
        <div class="lang-show-lang-switch-container">
          <div style="display: flex">
            <el-input
              v-model="pageData.updatewords"
              placeholder="输入新增词汇"
            />
            <el-input
              v-model="pageData.updatewordsweight"
              placeholder="输入权重值"
              style="margin-left: 2px; margin-right: 2px"
            />
          </div>
          <div class="add-buttton-icon" @click="updatewords()">
            <span class="iconfont icon-zengjia"></span>
          </div>
        </div>
        <div id="from-cover-line"></div>
        <div class="often-list">
          <h3>{{ resData.wordsTopic }}</h3>
        </div>
        <div class="search-container">
          <div class="search-wrapper">
            <input
              placeholder="搜索关键词"
              class="search-input"
              type="text"
              v-model="resData.wordsContent"
              @keyup.enter="sendwords()"
            />
          </div>
        </div>
        <!-- 内容库 -->
        <div
          style="
            position: relative;
            overflow: hidden;
            width: 100%;
            height: 600px;
          "
        >
          <div
            style="
              position: absolute;
              inset: 0px;
              overflow: scroll;
              margin-right: -15px;
              margin-bottom: -15px;
            "
          >
            <div
              class="letter-block"
              v-for="letter in pageData.letters"
              :key="letter"
            >
              <p class="letter-title">{{ letter }}</p>
              <el-tag
                v-for="item in pageData.Words[letter]"
                :key="item"
                class="lang-item"
                size="large"
                closable
                color="#fff"
                @close="deletewords(item)"
                >{{ item }}</el-tag
              >
            </div>
          </div>
        </div>
        <ol class="letter-index-ol">
          <li
            class="letter-index"
            v-for="letter in pageData.letters"
            :key="letter"
          >
            {{ letter }}
          </li>
        </ol>
      </div>
    </div>
    <div id="footer">
      <div class="clearfix">
        <div class="footer-container">
          <div class="products-list">
            <div
              class="products-item"
              v-for="index in pageData.console_data"
              :key="index"
              @click="openWordConsole(index.topic)"
            >
              <div
                class="products-icon"
                :style="{ backgroundImage: index.img }"
              ></div>
              <p style="font-size: 16px">{{ index.topic }}</p>
              <span>{{ index.describe }}</span>
            </div>
          </div>
        </div>
        <div class="copyright"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import {
  sendQuery,
  searchStopWord,
  deleteStopWord,
  updateStopWord,
  searchUserWord,
  searchallClasses,
} from "/src/api/send";
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
  wordsOperate: "查询",
  updateWordsOperate: "增加",
  wordsContent: "",
  wordsTopic: "",
  standard_use_custom: false,
  threshold: 0,
  cut_materials: "search",
  cut_standard: "default",
});
const pageData = reactive({
  type_list: ["", "success", "info", "danger", "warning"],
  options: ["BM25", "TFIDF"],
  console_data: [
    {
      topic: "核心词库",
      describe: "文档分类的核心权重词汇",
      img: "url(https://iconfont.alicdn.com/p/illus_3d/file/NlKK3XkjWiGH/ecadf494-4e78-4679-ba10-b67e6f5798a2.png?image_process=resize,l_1000)",
    },
    {
      topic: "专家词库",
      describe: "文档分类的权重依据",
      img: "url(https://iconfont.alicdn.com/p/illus_3d/file/NlKK3XkjWiGH/db8027cf-4b6d-48ab-9537-4f7102a4bf68.png)",
    },
    {
      topic: "停用词库",
      describe: "文档分类的屏蔽搜索词汇",
      img: "url(https://iconfont.alicdn.com/p/illus_3d/file/NlKK3XkjWiGH/055a8937-9a2f-4f03-b6f4-23847c456783.png)",
    },
  ],
  console_state: false,
  config_state: false,
  updatewords: "",
  updatewordsweight: "",
  letters: ["EN", "CN", "SC"],
  a_Z_Words: [],
  chinese_Words: [],
  teshuzifu_Words: [],
  Words: {},
});
const send = async () => {
  resData.result = [{ name: "加载中。。。" }];
  sendQuery(resData.query, resData.hasDes, resData.select, resData.key_word)
    .then((res) => {
      // 获取数据
      resData.result = res.data.data;
      localStorage.setItem("accesstoken", res.data.access_token);
    })
    .catch((e) => {
      if (e.response) {
        //请求已发出，服务器返回状态码不是2xx。
        console.info(e.response.data);
      } else {
        //发送请求时异常，捕捉到错误
        console.info("error", e.message);
      }
    });
};
const sendwords = async () => {
  pageData.a_Z_Words = [];
  pageData.chinese_Words = [];
  pageData.teshuzifu_Words = [];
  if (resData.wordsTopic == "停用词库") {
    searchStopWord(resData.wordsContent)
      .then((res) => {
        // 获取数据
        console.log(res.data.data);
        const ResWords = res.data.data;
        const str = ResWords.stopWords;
        const len = str.length;
        for (let i = 0; i < len; i++) {
          const charCode = str[i].charCodeAt(0);
          if (
            (charCode >= 65 && charCode <= 90) ||
            (charCode >= 97 && charCode <= 122)
          ) {
            pageData.a_Z_Words.push(str[i]);
          } else if (charCode >= 19968 && charCode <= 40869) {
            pageData.chinese_Words.push(str[i]);
          } else {
            pageData.teshuzifu_Words.push(str[i]);
          }
        }
        pageData.Words = {
          EN: pageData.a_Z_Words,
          CN: pageData.chinese_Words,
          SC: pageData.teshuzifu_Words,
        };
      })
      .catch((e) => {
        if (e.response) {
          //请求已发出，服务器返回状态码不是2xx。
          console.info(e.response.data);
        } else {
          //发送请求时异常，捕捉到错误
          console.info("error", e.message);
        }
      });
  } else if (resData.wordsTopic == "专家词库") {
    searchUserWord(resData.wordsContent)
      .then((res) => {
        // 获取数据
        console.log(res.data.data);
        const ResWords = res.data.data;
        const str = ResWords.userWords;
        const len = str.length;
        for (let i = 0; i < len; i++) {
          const charCode = str[i].charCodeAt(0);
          if (
            (charCode >= 65 && charCode <= 90) ||
            (charCode >= 97 && charCode <= 122)
          ) {
            pageData.a_Z_Words.push(str[i]);
          } else if (charCode >= 19968 && charCode <= 40869) {
            pageData.chinese_Words.push(str[i]);
          } else {
            pageData.teshuzifu_Words.push(str[i]);
          }
        }
        pageData.Words = {
          EN: pageData.a_Z_Words,
          CN: pageData.chinese_Words,
          SC: pageData.teshuzifu_Words,
        };
      })
      .catch((e) => {
        if (e.response) {
          //请求已发出，服务器返回状态码不是2xx。
          console.info(e.response.data);
        } else {
          //发送请求时异常，捕捉到错误
          console.info("error", e.message);
        }
      });
  } else {
    searchallClasses(resData.wordsContent)
      .then((res) => {
        // 获取数据
        console.log(res.data.data);
        const ResWords = res.data.data;
        const str = ResWords;
        const len = str.length;
        for (let i = 0; i < len; i++) {
          const charCode = str[i]["name"].charCodeAt(0);
          if (
            (charCode >= 65 && charCode <= 90) ||
            (charCode >= 97 && charCode <= 122)
          ) {
            pageData.a_Z_Words.push(str[i]["name"].substr(0, 3));
          } else if (charCode >= 19968 && charCode <= 40869) {
            pageData.chinese_Words.push(str[i]["name"].substr(0, 3));
          } else {
            pageData.teshuzifu_Words.push(str[i]["name"].substr(0, 3));
          }
        }
        pageData.Words = {
          EN: pageData.a_Z_Words,
          CN: pageData.chinese_Words,
          SC: pageData.teshuzifu_Words,
        };
      })
      .catch((e) => {
        if (e.response) {
          //请求已发出，服务器返回状态码不是2xx。
          console.info(e.response.data);
        } else {
          //发送请求时异常，捕捉到错误
          console.info("error", e.message);
        }
      });
  }
};
const deletewords = async (word) => {
  if (resData.wordsTopic == "停用词库") {
    deleteStopWord(word)
      .then((res) => {
        // 获取数据
        console.log(res);
      })
      .catch((e) => {
        console.info("error", e.message);
      });
  }
  sendwords();
  this.$forceUpdate();
};

const updatewords = async () => {
  if (resData.wordsTopic == "停用词库") {
    updateStopWord(pageData.updatewords)
      .then((res) => {
        // 获取数据
        console.log(res);
        pageData.a_Z_Words = [];
        pageData.chinese_Words = [];
        pageData.teshuzifu_Words = [];
      })
      .catch((e) => {
        console.info("error", e.message);
      });
  }
  sendwords();
  this.$forceUpdate();
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
const openWordConsole = (name) => {
  if (resData.wordsTopic !== name) {
    pageData.console_state = true;
    resData.wordsTopic = name;
    sendwords();
  } else {
    pageData.console_state = false;
    resData.wordsTopic = "";
  }
};
</script>
<style scoped>
.contain {
  width: 100%;
  height: 100%;
}
.navigation-bar {
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0 3px 12px rgba(98, 107, 181, 0.25);
  height: 72px;
  width: 100%;
}
.navigation-bar-wrapper {
  align-items: center;
  display: flex;
  height: 100%;
  width: 80%;
  justify-content: flex-start;
  margin: 0 auto;
}
.logo {
  margin-right: 30px;
  cursor: pointer;
  width: 80px;
  zoom: 1;
  float: left;
  height: auto !important;
}
.navigation-wrapper {
  align-items: center;
  display: flex;
  flex: 1;
  height: 100%;
  justify-content: space-between;
  font-size: xx-large;
}
.cont {
  width: 80%;
  margin: 20px auto;
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
  height: 400px;
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
.keywordsDesc {
  display: flex;
  width: 91%;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  margin-top: 5px;
  margin-bottom: 5px;
}
.slider-demo-block {
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
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

.clearfix {
  width: 80%;
  margin: 0 auto;
  font: 12px Arial, PingFang SC, Hiragino Sans GB, STHeiti, Microsoft YaHei,
    WenQuanYi Micro Hei, sans-serif;
}
.footer-container {
  width: 90%;
  margin: 0;
  padding: 0;
  box-sizing: content-box;
}

.products-list {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 56px;
  margin-top: 56px;
  position: relative;
}
.products-item {
  background-color: #fff;
  flex-shrink: 0;
  height: 80px;
  padding-left: 60px;
  position: relative;
  text-decoration: none;
}
.products-icon {
  background-size: 100% 100%;
  border-radius: 5px;
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  height: 50px;
  left: 0;
  margin-top: -25px;
  position: absolute;
  top: 50%;
  width: 50px;
}
.copyright {
  float: left;
  margin: 30px 0;
  position: relative;
}

.lang-panel {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(98, 107, 181, 0.2);
  display: block;
  left: 0;
  padding: 20px 10px 20px 20px;
  position: absolute;
  right: 0;
  top: 90px;
  width: 80%;
  margin: 0 auto;
  z-index: 1000;
}
.lang-show-lang-switch-container {
  padding: 5px;
  position: absolute;
  right: 52px;
  top: 36px;
  border: 0.5px solid #c0c4cc;
  border-radius: 10px;
}
.lang-item.selected {
  border-bottom: 2px solid #4395ff;
  color: #4395ff;
}

.often-list {
  margin-bottom: 16px;
  display: flex;
}
ol,
ul {
  list-style: none;
}
.search-container {
  background-image: url(https://fanyi-cdn.cdn.bcebos.com/webStatic/translation/asset/search.08d919e5.jpg);
  background-position: left 4px;
  background-repeat: no-repeat;
  background-size: 12px 14px;
  border-bottom: 1px solid #eee;
  height: 36px;
  margin-bottom: 10px;
  position: relative;
}
.search-wrapper {
  left: 27px;
  position: absolute;
  right: 0;
  top: 0;
}
.search-input {
  border-style: none;
  color: #000;
  display: block;
  font-size: 14px;
  line-height: 22px;
  outline: none;
  width: 100%;
}
.letter-index-ol {
  display: flex;
  flex-direction: column;
  height: 488.425px;
  justify-content: space-between;
  position: absolute;
  right: 30px;
  top: 124px;
}
.letter-index {
  color: #999;
  cursor: pointer;
  font-size: 12px;
  line-height: 1;
  opacity: 0.5;
}
.letter-block {
  margin-bottom: 5px;
}
.letter-title {
  color: #999;
  font-size: 12px;
  line-height: 1;
  margin-bottom: 3px;
}
.lang-item {
  color: #333;
  cursor: pointer;
  display: inline-block;
  font-size: 13.5px;
  line-height: 22px;
  margin-bottom: 9px;
  vertical-align: top;
  width: 140px;
}

.setting-options {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(169, 173, 204, 0.3);
  box-sizing: border-box;
  display: none;
  padding: 20px;
  position: absolute;
  right: 10px;
  top: 80px;
  width: 300px;
  z-index: 10;
}
.setting-options-arrow {
  border-color: transparent transparent #cdcdcd;
  right: 27px;
  top: -17px;
}
.zonedword-switch {
  cursor: pointer;
}
.setting-checked .check-option {
  background-position: 0 -755px;
}

.icon-setting {
  background-image: -webkit-image-set(url(https://fanyi-cdn.cdn.bcebos.com/webStatic/translation/asset/new_icons.c2dc378e.png) 1x,url(https://fanyi-cdn.cdn.bcebos.com/webStatic/translation/asset/new_icons_2x.fea9cb67.png) 2x);
  background-position: 0 -228px;
  background-repeat: no-repeat;
  height: 24px;
  margin-top: 6px;
  width: 24px;
}
.add-buttton-icon {
  float: right;
  height: 18px;
  width: 18px;
  color: #409eff;
}
.icon-setting:hover {
  background-position: 0 -250px;
  height: 24px;
  width: 24px;
}
::v-deep(.el-tag) {
  color: #000;
  border-width: 0px;
  border-style: none;
}
.check-label {
  font-size: 14px;
}

.sound-spd-items {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
}
</style>
