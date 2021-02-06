/*
 * @Author: shenjianfei
 * @Date: 2021-02-02 14:39:58
 * @LastEditors: shenjianfei
 * @LastEditTime: 2021-02-02 14:47:10
 */
var log4js = require('log4js');
log4js.configure({
    appenders:{ cheese:{type:'file',filename:'cheese.log'}},
    categories:{default:{appenders:['cheese'],level:'error'}}
})
var logger = log4js.getLogger();
logger.trace('Entering cheese testing');
logger.debug('Got cheese.');
logger.info('Cheese is Gouda.');
logger.warn('Cheese is quite smelly.');
logger.error('Cheese is too ripe!');
logger.fatal('Cheese was breeding ground for listeria.');