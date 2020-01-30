'use strict';


class dataModel {

  constructor() {
    this.database = [];
  }


get(id){
  if(id){
    return this.schema.findOne( {id} );
  }
  else return this.schema.find({});
}

post(record){
  let newObject = new this.schema(record);
  return newObject.save();
}


put(id, record){
  if(id && record){
    return this.schema.findByIdAndUpdate(id, record, {new: true});
  }
  else {
    return undefined;
  }
}

delete(id){
  if(id){
    return this.schema.findByIdAndDelete(id);
  }
  else {
    return 'could not find record...';
  }
 }
}

module.exports = dataModel;