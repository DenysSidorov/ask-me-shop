/*
REST-сервис для юзеров на Koa.JS + Mongoose

User имеет уникальный email, а также даты создания и модификации и имя displayName.

**** GET /users/:id - получить юзера по id, например: /users/57ffe7300b863737ddfe9a39
**** GET /users - получить массив юзеров
**** DELETE /users/:id - удалить пользователя
**** POST /users - создать пользователя
  Метод POST позволяет указать только email и displayName (нельзя при создании юзера указать его _id)

PATCH /users/:id - модифицировать пользователя
  Метод PATCH позволяет поменять только email и displayName (нельзя при создании юзера указать его _id)


Если юзера с данным :id нет:
   метод возвращает 404

Если ошибка валидации (напр. не указан email) или уникальности:
  метод возвращает 400 и объект с ошибками вида { errors: { field: error } }
  пример:
    {
      errors: {
        email: 'Такой email уже есть'
      }
    }

Желательно, с тестами.
*/

const User = require('../models/user');
const mongoose = require('../connection/index');
var ObjectId = mongoose.Types.ObjectId;


module.exports.createUser = async (ctx, next) => {
  console.log(ctx.request.body);
  let email = ctx.request.body.email;
  let displayName = ctx.request.body.displayName;
  let password = ctx.request.body.password;
  if (!displayName || !email || !password) {
    ctx.throw(400, 'Set please email, password, displayName')
  }
  try {
    await User.create({email, displayName, password});
  } catch (er) {
    console.log(er);
    ctx.throw(400, er);
  }
  ctx.statusCode = 200;
  ctx.body = 'ok';
}

module.exports.changeUser = async (ctx, next) => {
  let id = ctx.params.id;
  let email = ctx.request.body.email;
  let displayName = ctx.request.body.displayName;
  if (!displayName || !email) {
  }
  try {
    let user = await User.findById(id);
    await User.findByIdAndUpdate(user.id, Object.assign(user, {email}, {displayName}));
  } catch (er) {
    ctx.throw(400, {errors: er.errors})
  }
  ctx.body = 'ok'
}

module.exports.getAll = async (ctx, next) => {

  let users = await User.find({}, {});
  ctx.body = users;

}

module.exports.deleteById = async (ctx, next) => {
  let id = ctx.params.id;

  if (!id) {
    ctx.throw(404)
    return;
  }

  if (!ObjectId.isValid(id)) {
    ctx.throw(404);
  }

  let user = await User.findByIdAndRemove({_id: id});
  ctx.body = user._id;
}

module.exports.getById = async (ctx, next) => {
  let id = ctx.params.id;

  if (!id) {
    ctx.throw(404)
    return;
  }

  if (!ObjectId.isValid(id)) {
    ctx.throw(404);
  }

  let user = await User.findById({_id: id});
  if (user) {
    ctx.body = user;
  } else {
    ctx.throw(404);
  }
}


module.exports.createTestUser = async (ctx, next) => {
  console.log(1111);
  const mary = new User({
    email: 'mary' + Math.random()*1+ 5 + '@mail.com'
  });
  mary.save(function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result);
    User.findOne({
      // email: 'mary@mail.com'
    }, function (err, users) {
      if (err) {
        console.log(err);
      }
      console.log(users);
      console.log(ctx);
      ctx.statusCode = 200;
      ctx.body = 'ok'
      // ... do more with mary
      // no unref!
      // mongoose.disconnect();
    });
  });
}