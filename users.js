const config = require('./config.json')
const knex = require('knex')(config)

const Router = require('koa-router');
const bcrypt = require('bcryptjs');

const router = new Router({
    prefix: '/users'
});

let validate = require('./token_validation.js');

module.exports = router;

router.get("/", async (ctx) => {
  try {
    let token = ctx.request.headers['authorization'];
    var check = await validate.fn(token)
    if(check!==true)
    {
        ctx.body=check
    }
    else
    {
    const users = await knex('User').select('*');
    ctx.body = {
      data: users
    };
    }
  } catch (err) {
    console.log(err)
  }
})


router.post("/", async (ctx) => {
  try {
    if (
        !ctx.request.body.username ||
        !ctx.request.body.password
    ) {
        ctx.response.status = 400;
        ctx.body = 'Please enter the data';
    }
    else
    {   
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(ctx.request.body.password, salt);
        var id = await knex('User').insert(ctx.request.body)
        console.log(id)
        var resp = await knex('User').select('*').where({ id: parseInt(id)});
        var token = await knex('Token').insert({token:hash,user_id:id});
        ctx.body = {data:resp}
    }
  } catch (err) {
    console.log(err)
  }
})

router.get("/:id", async (ctx) => {
  try {
    let token = ctx.request.headers['authorization'];
    var check = await validate.fn(token)
    if(check!==true)
    {
        ctx.body=check
    }
    else
    {
    const user = await knex('User').select('*').where({ id: parseInt(ctx.params.id) });

    if(user.length===0){
        ctx.body = {error:"Does not exist"}
    }
    else
    {
    ctx.body = {
      data: user
        };
    }
    }
  } catch (err) {
    console.log(err)
  }
})


router.put('/:id', async (ctx) => {
  try {
    let token = ctx.request.headers['authorization'];
    var check = await validate.fn(token)
    if(check!==true)
    {
        ctx.body=check
    }
    else
    {
        var id = await knex('User').update(ctx.request.body).where({ id: parseInt(ctx.params.id)})
        var resp = await knex('User').select('*').where({ id: parseInt(ctx.params.id)});
        ctx.body = {data:resp}
    }
  } catch (err) {
    console.log(err)
  }
})

router.delete('/:id', async (ctx) => {
  try {
    let token = ctx.request.headers['authorization'];
    var check = await validate.fn(token)
    if(check!==true)
    {
        ctx.body=check
    }
    else
    {
        var id = await knex('User').del().where({ id: parseInt(ctx.params.id)})
        var resp = await knex('User').select('*').where({ id: parseInt(ctx.params.id)});
        ctx.body = {data:resp}
    }
  } catch (err) {
    console.log(err)
  }
})