const client = require('../config/connection');
const errors = require('../module/error');
require('dotenv').config();

async function createSiswa(req, res) {
  let result = {
      success : false
    }

  if (req.body.nama && req.body.umur) {
  var query = 'INSERT INTO siswa (id, nama, umur, createdat, updatedat) VALUES (uuid(),\''+req.body.nama+'\', \''+req.body.umur+'\', totimestamp(now()), totimestamp(now()))'
  client.execute(query, {prepare:true})
      .then(validate => {
          result.success = true
          result.msg = "berhasil"
          result.hasil = validate
          res.json(result)
      }).catch(err => {
        result.success = true
        errors.errorsHandling(400, '', err,result, res)
      })
  }else {
      errors.errorsHandling(400, "required param", '',result, res)
  }    
}

module.exports.createSiswa = createSiswa;

async function getData(){
  let globalData = {}
  let listData = 'SELECT * FROM siswa ALLOW FILTERING'
  let siswaRequest = await client.execute(listData, {prepare:true})
  globalData = siswaRequest.rows
  return globalData
}

async function dataSiswa(req, res){
  let result = {
    success : false
  }

  getData()
  .then(validate => {
    result.success = true
    //result.msg = "berhasil"
    result.siswaRequest = validate
    res.json(result)
  }).catch(err => {
    console.log(err);
  })
}

module.exports.dataSiswa = dataSiswa;

async function updateData(req, res) {
  let result = {
    success : false
  }

  if (req.body.id) {
    let query = 'UPDATE siswa SET '+
              (typeof req.body.nama !== 'undefined' ? 'nama = \''+req.body.nama+'\', ':'')+
              (typeof req.body.umur !== 'undefined' ? 'umur = \''+req.body.umur+'\', ':'')+
              'updatedat = totimestamp(now()) WHERE id = '+req.body.id
    //console.log(query);
    client.execute(query, {prepare:true})
    .then(validate => {
      result.success = true
      result.msg = "berhasil"
      res.json(result)
    }).catch(err => {
      console.log(err);
      
    })
  }else {
    result.msg = 'param must required'
    res.status(422).json(result)
  }
}

module.exports.updateData = updateData;
