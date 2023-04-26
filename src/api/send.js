/*
 * @Author: liu jinwei kk2324982471@163.com
 * @Date: 2023-04-06 11:16:28
 * @LastEditors: liu jinwei kk2324982471@163.com
 * @LastEditTime: 2023-04-25 18:42:40
 * @FilePath: \doc_query_vue\src\api\login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from './index.js'

export const sendQuery = (query, hasDes=false, select, key_word) => request({
	method: 'POST',
	url: '/api/doc_query/query/bm25/',
	data: {
		res: query,
		has_des:hasDes,
		algorithm:select,
		key_word:key_word
	},
  });

  export const searchStopWord = (word) => request({
	method: 'GET',
	url: '/api/doc_query/searchStopWord/',
	params: {pageNum: '2', pageSize: '100', word: word},
  });

