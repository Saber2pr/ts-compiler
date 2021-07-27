import { key1 } from "./keys";
const p = require('path')
import { parse } from 'path'

const path = ''

export default {
  en: {
    dp_switch_off: 'Off',
    dp_switch_on: 'Open',
    confirm: 'Ok',
    timer: 'Timer',
    cancel: 'Cancel',
    dp_switch_1: 'Switch',
    dp_dpcodestring: 'String',
    dp_dpcodevalue: 'Number',
    dp_dpcodeenum: 'Enum',
    dp_dpcodeenum_12km_h: '12km',
    dp_timer_on: 'on',
    dp_timer_off: key1,
  },
  zh: {
    dp_switch_off: '关闭',
    dp_switch_on: '打开',
    confirm: '确定',
    timer: '云定时',
    cancel: '取消',
    dp_switch_1: '开关',
    dp_dpcodestring: '字符型',
    dp_dpcodevalue: '数值型',
    dp_dpcodeenum: '枚举型',
    dp_dpcodeenum_12km_h: parse('./b'),
    dp_timer_on: p.parse('./a'),
    dp_timer_off: key1,
  },
};
