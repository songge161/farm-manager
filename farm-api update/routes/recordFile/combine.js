var express = require('express');
var router = express.Router();
const { Method,Record } = require('../../models')
const { Op, condition } = require('sequelize')
//本页面用户最基本的获取操作与记录的信息
//面向前端展示方面

//固定的record格式
const recordFormat = {
        include: [{
          model: Method,
          as: 'methods', // 使用你在关联中定义的别名
          attributes: { exclude: ['createdAt', 'updatedAt',"rid"] 
       
          } // 可选：排除不需要的字段
          ,where: { state: true } 
        }],
        where: { state: true }, // 只查询state为true的记录
        attributes: { exclude: ['createdAt', 'updatedAt'] } // 可选：排除不需要的字段
}



// 获取单个Record及其关联的Methods
router.get('/:id', async (req, res) => {
  try {
    const recordId = req.params.id;
    
    // 查询Record及其关联的Methods
    const record = await Record.findByPk(recordId,recordFormat)

    //如果state为false则不返回数据
   
    if (!record||record.state === false) {

      return res.status(404).json({ error: 'Record not found' });
    }

    // 将Sequelize实例转换为普通JSON对象
    const recordData = record.get({ plain: true });
    // 重组数据结构
    const response = {
      id: recordData.id,
      block: recordData.block,
      batch: recordData.batch,
      area: recordData.area,
      crop: recordData.crop,
      newRecordDate: recordData.newRecordDate,
      state: recordData.state,
      methods: recordData.methods // 关联的methods数组会自动包含在这里
    };
    //处理newRecordDate的数据，如果newRecordDate与最新method的时间相同，则不修改newRecordDate，否则修改为最新method的时间
    if (recordData.methods.length > 0) {
      const latestMethod = recordData.methods.reduce((latest, current) => {
        return current.time > latest.time ? current : latest;
      });
      if (recordData.newRecordDate !== latestMethod.time) {
        response.newRecordDate = latestMethod.time;
      }
    }

    res.json(response);
    
  } catch (error) {
    console.error('Error fetching record:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//获取所有的记录
//获取所有的记录，包含分页功能
router.get('/', async (req, res) => {
    try {
      const { page=1 , pageSize=2  } = req.query;
      const offset = (page - 1) * pageSize;
      const { count, rows: records } = await Record.findAndCountAll({...recordFormat, 
        distinct: true, // 确保 count 只计算唯一的 Record（避免关联查询影响计数）
        
        limit: Number(pageSize),
        offset: Number(offset),
        order: [
          ['newRecordDate', 'DESC'],
          [{model: Method, as: 'methods'}, 'time', 'DESC']]
      
      });

      
      
      const result = {
        
        count: count,
        page: Number(page),
        pageSize: Number(pageSize),
        totalPages: Math.ceil(count / pageSize),
        rows: records.map(record => ({
          id: record.id,
          block: record.block,
          batch: record.batch,
          area: record.area,
          crop: record.crop,
          newRecordDate: record.newRecordDate,
          methods: record.methods
        }))
      };
      if(result.rows.length > 0) {
        res.json({
          body: {
            errCode: res.statusCode,
            status: true,
            message: '获取成功',       
            data: result,
            query: req.query
          }
        });
      }else{
        res.status(404).json({ 
            body: {
                errCode: res.statusCode,
                status: false,
                message: '获取失败',
    
              }

         });
      }
      
    } catch (error) {
      console.error('Error fetching records:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  
module.exports = router;
