/*
 * @Author: liu jinwei kk2324982471@163.com
 * @Date: 2023-04-06 11:16:28
 * @LastEditors: liu jinwei kk2324982471@163.com
 * @LastEditTime: 2023-04-28 14:22:01
 * @FilePath: \doc_query_vue\src\api\login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "./index.js";

export const sendQuery = (query, hasDes = false, select, key_word) =>
  request({
    method: "POST",
    url: "/api/doc_query/query/" + select + "/",
    data: {
      res: query,
      has_des: hasDes,
      algorithm: select,
      key_word: key_word,
    },
  });

export const updateKeyWord = (class_code = "0", key_word, weight) =>
  request({
    method: "POST",
    url: "/api/doc_query/updateKeyWord/",
    data: {
      class_code: class_code,
      key_word: key_word,
      weight: weight,
    },
  });

export const searchallClasses = (word) =>
  request({
    method: "GET",
    url: "/api/doc_query/allClasses/",
    params: { name: word },
  });

export const searchStopWord = (word) =>
  request({
    method: "GET",
    url: "/api/doc_query/searchStopWord/",
    params: { pageNum: "1", pageSize: "1000", word: word },
  });

export const deleteStopWord = (word) =>
  request({
    method: "POST",
    url: "/api/doc_query/deleteStopWord/",
    data: {
      stop_word: word,
    },
  });

export const updateStopWord = (word) =>
  request({
    method: "POST",
    url: "/api/doc_query/updateStopWord/",
    data: {
      stop_word: word,
    },
  });

export const searchUserWord = (word) =>
  request({
    method: "GET",
    url: "/api/doc_query/searchUserWord/",
    params: { pageNum: "1", pageSize: "20", word: word },
  });

export const deleteUserWord = (word) =>
  request({
    method: "POST",
    url: "/api/doc_query/deleteUserWord/",
    data: {
      stop_word: word,
    },
  });

export const updateUserWord = (word) =>
  request({
    method: "POST",
    url: "/api/doc_query/updateUserWord/",
    data: {
      stop_word: word,
    },
  });

export const allConfig = () =>
  request({
    method: "GET",
    url: "/api/doc_query/searchUserWord/allConfig/",
    params: {},
  });

export const updateConfig = () =>
  request({
    method: "POST",
    url: "/api/doc_query/searchUserWord/updateConfig/",
    data: {
      key: "threshold",
      value: 0,
    },
  });
