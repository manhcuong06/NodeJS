var DbConnection = require('./db');
var ObjectId = require('mongodb').ObjectID;

exports.tao_id = function (id) {
    var object_id = ObjectId(id);
    return object_id;
}

exports.ds_doi_tuong = async function(ten_collection) {
    try {
        let db = await DbConnection.Get();
        // let result = await db.collection('hoc_sinh', await function(err, collection){
        //   return collection.find({}).toArray(function(err, data){
        //     //console.log(data);
        //     return data;
        //   });
        // })
  
        //console.log(result);
  
        let result = await db.collection(ten_collection).find({}).toArray();
  
        //let result = DbConnection.ds_hoc_sinh();
  
        //console.log(result);
  
        // return result;
  
        return result;
       
    } catch (e) {
        console.log(e);
    }
}

exports.them_doi_tuong = async function(ten_collection, thong_tin_doi_tuong){
    try {
        let db = await DbConnection.Get();
  
        let result = await db.collection(ten_collection).insert(thong_tin_doi_tuong);
  
        return result;
       
    } catch (e) {
        console.log(e);
    }
}

exports.cap_nhat_doi_tuong = async function(ten_collection, bieu_thuc_dieu_kien, thong_tin_doi_tuong){
    try {
        let db = await DbConnection.Get();
  
        let result = await db.collection(ten_collection).update(bieu_thuc_dieu_kien, thong_tin_doi_tuong);
        //console.log(result);
        return result;
       
    } catch (e) {
        console.log(e);
    }
}

exports.xoa_doi_tuong = async function(ten_collection, bieu_thuc_dieu_kien){
    try {
        let db = await DbConnection.Get();
  
        let result = await db.collection(ten_collection).remove(bieu_thuc_dieu_kien);
  
        return result;
       
    } catch (e) {
        console.log(e);
    }
}
