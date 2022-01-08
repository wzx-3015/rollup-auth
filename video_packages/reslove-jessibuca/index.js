/*
 * @Description: 加载jessibuca文件
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2022-01-08 15:47:56
 * @LastEditTime: 2022-01-08 16:07:58
 * @LastEditors: @Xin (834529118@qq.com)
 */
const path = require('path');
const fs = require('fs');

export default function resloveJessibuca () {
  return {
    name: 'reslove-jessibuca', // this name will show up in warnings and errors
    resolveId(source, importer) {
      const someData = ['jessibuca.js', 'decoder.js'].some(v => source.endsWith(v))

      if (someData) {
        return path.resolve(path.dirname(importer), source);
      }
    },
    load ( id ) {
      const someData = ['jessibuca.js', 'decoder.js'].some(v => id.endsWith(v))

      if (someData) {
        const referenceId = this.emitFile({
          type: 'asset',
          name: path.basename(id),
          source: fs.readFileSync(id)
        });

        return `export default import.meta.ROLLUP_FILE_URL_${referenceId};`;
      }
    }
  }
}
