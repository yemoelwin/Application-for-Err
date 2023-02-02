const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title : {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Post', postSchema);


// const fs = require('fs');
// const path = require('path');

// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   'data',
//   'errors.json'
// );

// const getErrorsFromFile = cb => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

// module.exports = class Error {
//   constructor(title, category, description, image) {
//     this.title = title;
//     this.category = category;
//     this.description = description;
//     this.image = image;
//   }

//   save() {
//     this.id = Math.random().toString();
//     getErrorsFromFile(errors => {
//       errors.push(this);
//       fs.writeFile(p, JSON.stringify(errors), err => {
//         console.log(err);
//       });
//     });
//   }

//   static fetchAll(cb) {
//     getErrorsFromFile(cb);
//   }

//   static findById(id, cb) {
//     getErrorsFromFile(errors => {
//       const error = errors.find(p => p.id === id);
//       cb(error);
//     });
//   }
// };

