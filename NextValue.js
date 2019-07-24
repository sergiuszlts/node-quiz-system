function NextValue(sequenceName, callback = null) {

  const MongoClient = require('mongodb').MongoClient;
  const url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbo = db.db("mydb");
    dbo.collection("counters").findAndModify({ "_id": sequenceName }, [['_id', 'asc']],
      { "$inc": { sequence_value: 1 } },
      { new: true },
      (err, doc) => {
        db.close();
        if (callback) {
          if (doc.sequence_value == undefined) callback(doc.value.sequence_value);
          else callback(doc.sequence_value);
        }
        if (doc.sequence_value == undefined) return doc.value.sequence_value;
        return doc.sequence_value;
      });
  });
}

module.exports = NextValue;
