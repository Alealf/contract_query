/*
 * @Author: liu jinwei kk2324982471@163.com
 * @Date: 2023-04-06 11:16:28
 * @LastEditors: liu jinwei kk2324982471@163.com
 * @LastEditTime: 2023-04-14 17:05:18
 * @FilePath: \doc_query_vue\src\api\login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from './index.js'

export const sendQuery = (query, hasDes=false, select, key_word) => request({
	method: 'POST',
	url: '/api/doc_query/query/',
	data: {
		res: query,
		has_des:hasDes,
		algorithm:select,
		key_word:key_word
	},
  });
