const express = require('express');
const crypto = require('crypto');
const url = require('url');
const querystring = require('query-string');
const got = require('got');

const router = express.Router();

// 心知天气 API 密钥
const secret = 'S9vsQyNoexWUItyi5'; // 私钥
const publicKey = 'Ppwrwh_xedZXIa2aD'; // 公钥

// 签名生成函数
function signature(urlString, paramsObj) {
  if (!urlString) {
    return;
  }
  const obj = url.parse(urlString, true, true);
  const params = Object.assign({}, paramsObj, obj.query);
  let result = querystring.stringify(params, { encode: false });
  let encodeResult = querystring.stringify(params, { encode: true });

  const sig = crypto
    .createHmac('sha1', secret)
    .update(result, 'utf8')
    .digest('base64');

  result += `&sig=${encodeURIComponent(sig)}`;
  encodeResult += `&sig=${encodeURIComponent(sig)}`;

  return result;
}

// 获取实时天气数据
router.get('/current-weather', async (req, res) => {
  const ts = Math.round(Date.now() / 1000); // 时间戳（秒）
  const ttl = 600; // 过期时间（秒）
  const city = req.query.city || '北京'; // 从请求获取城市名

  const apiUrl = 'https://api.seniverse.com/v4/weather/now.json';
  const query = signature(apiUrl, {
    ttl,
    ts,
    public_key: publicKey,
    location: city,
    language: 'zh-Hans',
    unit: 'c',
  });

  try {
    const response = await got.get(apiUrl, {
      responseType: 'json',
      searchParams: query,
    });
    res.json(response.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '请求天气数据失败' });
  }
});

// 获取未来天气列表（如：降水、台风等）
router.get('/weather-forecast', async (req, res) => {
  const ts = Math.round(Date.now() / 1000);
  const ttl = 600;
  const year = req.query.year || 2021; // 默认台风查询年份
  const active = req.query.active || 1; // 默认查询活跃台风

  const apiUrl = 'https://api.seniverse.com/v4';
  const query = signature(apiUrl, {
    ttl,
    ts,
    public_key: publicKey,
    fields: 'typhoon_list', // 请求字段
    year,
    active,
  });

  try {
    const response = await got.get(apiUrl, {
      responseType: 'json',
      searchParams: query,
    });
    res.json(response.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '请求天气预报数据失败' });
  }
});

// 导出路由
module.exports = router;
