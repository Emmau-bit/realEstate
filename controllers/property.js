const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Property = require('../models/property');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.propertyById = (req, res, next, id) => {
  Property.findById(id)
    .populate('status')
    .exec((err, property) => {
      if (err || !property) {
        return res.status(400).json({
          error: 'Property not found'
        });
      }
      req.property = property;
      next();
    });
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded'
      });
    }
    // check for all fields
    const {
      title,
      email,
      description,
      price,
      status,
      contact,
      address,
      city,
      hosted
    } = fields;

    if (
      !title ||
      !description ||
      !price ||
      !status ||
      !contact ||
      !email ||
      !address ||
      !city ||
      !hosted
    ) {
      return res.status(400).json({
        error: 'All fields are required'
      });
    }

    let property = new Property(fields);

    // 1kb = 1000
    // 1mb = 1000000

    if (files.photo) {
      // console.log("FILES PHOTO: ", files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: 'Image should be less than 1mb in size'
        });
      }
      property.photo.data = fs.readFileSync(files.photo.path);
      property.photo.contentType = files.photo.type;
    }

    property.save((err, result) => {
      if (err) {
        // console.log('PRoperty CREATE ERROR ', err);
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(result);
    });
  });
};

exports.read = (req, res) => {
  req.property.photo = undefined;
  return res.json(req.property);
};

exports.remove = (req, res) => {
  let property = req.property;
  property.remove(err => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({
      message: 'Property deleted successfully'
    });
  });
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded'
      });
    }

    let property = req.property;
    property = _.extend(property, fields);

    // 1kb = 1000
    // 1mb = 1000000

    if (files.photo) {
      // console.log("FILES PHOTO: ", files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: 'Image should be less than 1mb in size'
        });
      }
      property.photo.data = fs.readFileSync(files.photo.path);
      property.photo.contentType = files.photo.type;
    }

    property.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(result);
    });
  });
};

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : 1000000;

  Property.find()
    .select('-photo')
    .populate('status')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, propertys) => {
      if (err) {
        return res.status(400).json({
          error: 'Propertys not found'
        });
      }
      res.json(propertys);
    });
};

/**
 * it will find the propertys based on the req property status
 * other propertys that has the same status, will be returned
 */

exports.listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 1000000;

  Property.find({
    _id: {
      $ne: req.property
    },
    status: req.property.status
  })
    .limit(limit)
    .populate('status', '_id name')
    .exec((err, properties) => {
      if (err) {
        return res.status(400).json({
          error: 'Properties not found'
        });
      }
      res.json(properties);
    });
};

exports.listStatuses = (req, res) => {
  Property.distinct('status', {}, (err, statuses) => {
    if (err) {
      return res.status(400).json({
        error: 'Statuses not found'
      });
    }
    res.json(statuses);
  });
};

exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : 'desc';
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
  let limit = req.body.limit ? parseInt(req.body.limit) : 1000000;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Property.find(findArgs)
    .select('-photo')
    .populate('status')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: 'Properties not found'
        });
      }
      res.json({
        size: data.length,
        data
      });
    });
};

exports.photo = (req, res, next) => {
  if (req.property.photo.data) {
    res.set('Content-Type', req.property.photo.contentType);
    return res.send(req.property.photo.data);
  }
  next();
};

exports.listSearch = (req, res) => {
  // create query object to hold search value and status value
  const query = {};
  // assign search value to query.name
  if (req.query.search) {
    query.title = {
      $regex: req.query.search,
      $options: 'i'
    };
    // assigne status value to query.status
    if (req.query.status && req.query.status != 'All') {
      query.status = req.query.status;
    }
    // find the product based on query object with 2 properties
    // search and status
    Property.find(query, (err, properties) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(properties);
    }).select('-photo');
  }
};

exports.decreaseQuantity = (req, res, next) => {
  let bulkOps = req.body.order.propertys.map(item => {
    return {
      updateOne: {
        filter: {
          _id: item._id
        },
        update: {
          $inc: {
            quantity: -item.count,
            sold: +item.count
          }
        }
      }
    };
  });

  Property.bulkWrite(bulkOps, {}, (error, propertys) => {
    if (error) {
      return res.status(400).json({
        error: 'Could not update property'
      });
    }
    next();
  });
};
