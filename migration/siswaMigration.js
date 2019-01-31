let client = require('../config/connection');
module.exports={
    create: function(req,res){
      let result={
        success: false,
        msg:'',
        level: null
      }
      let query = 'CREATE TABLE siswa (id uuid,'+
                                       'nama varchar,'+
                                       'umur varchar,'+
                                       'createdAt timestamp,'+
                                       'updatedAt timestamp, PRIMARY KEY (id));'
      client.execute(query)
      .then(level=>{
        result.success= true
        result.msg='Create table Level success'
        result.level=level
        res.json(result)
      })
      .catch(err=>{
        console.log(err);
        result.msg= err.message
        res.json(result)
      })
    },
    indexColumn: function(req,res){
        let result={
          success: false,
          msg:''
        }
        let indexNama= 'CREATE INDEX ON siswa(nama)'
        let indexUmur= 'CREATE INDEX ON siswa(umur)'
  
        client.execute(indexNama)
        .then(nama=>{
          return client.execute(indexUmur)
        })
        .then(umur=>{
          result.success=true
          result.msg='indexing user table success :)'
          res.json(result)
        })
        .catch(err=>{
          console.log(err);
          result.msg=err.message
          res.status(500).json(result)
        })
      }
}
