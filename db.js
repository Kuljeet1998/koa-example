const config = require('./config.json')
const knex = require('knex')(config)

let validate = require('./token_validation.js');
const Router = require('koa-router');


const router = new Router({
    prefix: '/db'
});

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
    const guests = await knex('MyGuests').select('*');
    ctx.body = {
      data: guests
        };
    
    }
  } catch (err) {
    console.log(err)
  }
})

router.get("/:id", async (ctx) => {
  try {
    const guest = await knex('MyGuests').select('*').where({ id: parseInt(ctx.params.id) });
    let token = ctx.request.headers['authorization'];
    var check = await validate.fn(token)
    if(check!==true)
    {
        ctx.body=check
    }
    else
    {
    if(guest.length===0){
        ctx.body = {error:"Does not exist"}
    }
    else
    {
    ctx.body = {
      data: guest
        };
    }
    }
  } catch (err) {
    console.log(err)
  }
})

router.post("/", async (ctx) => {
  try {
    let token = ctx.request.headers['authorization'];
    var check = await validate.fn(token)
    if(check!==true)
    {
        ctx.body=check
    }
    else
    {
    if (
        !ctx.request.body.firstname ||
        !ctx.request.body.lastname ||
        !ctx.request.body.email
    ) {
        ctx.response.status = 400;
        ctx.body = 'Please enter the data';
    }
    else
    {
        var id = await knex('MyGuests').insert(ctx.request.body)
        var resp = await knex('MyGuests').select('*').where({ id: parseInt(id)});
        ctx.body = {data:resp}
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
        var id = await knex('MyGuests').update(ctx.request.body).where({ id: parseInt(ctx.params.id)})
        var resp = await knex('MyGuests').select('*').where({ id: parseInt(ctx.params.id)});
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
        var id = await knex('MyGuests').del().where({ id: parseInt(ctx.params.id)})
        var resp = await knex('MyGuests').select('*').where({ id: parseInt(ctx.params.id)});
        ctx.body = {data:resp}
    }
  } catch (err) {
    console.log(err)
  }
})