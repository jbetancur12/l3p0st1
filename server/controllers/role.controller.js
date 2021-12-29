import Role from '../models/role.model';
import errorHandler from '../helpers/dbErrorHandler';

const create = async (req, res) => {
  console.log(req.body);
  const role = new Role(req.body);
  try {
    await role.save();
    // const provider_id = await Provider.findById(req.body.provider);
    // provider_id.roles.push(role);
    // await provider_id.save();
    return res.status(200).json({
      message: 'Successfully created!',
      payload: role,
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  try {
    let roles = await Role.find({})
    res.json(roles);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const roleByID = async (req, res, next, id) => {
  try {
    let role = await Role.findById(id).populate('users');
    if (!role)
      return res.status('400').json({
        error: 'role not found',
      });
    req.role = role;
    next();
  } catch (err) {
    return res.status('400').json({
      error: 'Could not retrieve role',
    });
  }
};

const roleName = async (req, res, next, name) => {
  try {
    let role = await Role.find({ name: name });
    if (!role)
      return res.status('400').json({
        error: 'role not found',
      });
    req.role = role;
    next();
  } catch (err) {
    return res.status('400').json({
      error: 'Could not retrieve role',
    });
  }
};

const read = async (req, res) => {
  try {
    const role_id = req.role;
    console.log(role_id);
    const role = await Role.findById(role_id).populate(
      'users', 'name'
    );
    res.json(role);
  } catch (error) {
    return res.status('400').json({
      error: 'Could not retrieve role',
    });
  }
};
const update = async (req, res) => {
  try {
    Role.findByIdAndUpdate(
      req.role._id,
      {
        $set: req.body,
      },
      { new: true },
      (error, data) => {
        if (error) {
          return next(error);
          console.log(error);
        } else {
          res.status(200).json({
            message: 'Role updated successfully !',
            payload: data,
          });
        }
      },
    );
  } catch (error) {
    return res.status('400').json({
      error: 'Could not retrieve role',
    });
  }
};

const remove = (req, res, next) => {
  Role.findByIdAndRemove(req.role._id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
};



export default {
  create,
  roleByID,
  list,
  read,
  roleName,
  update,
  remove,

};
