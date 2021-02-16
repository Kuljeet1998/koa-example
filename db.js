const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'root',
    password : '1234',
    database : 'test123'
  }
});

const Router = require('koa-router');


const router = new Router({
    prefix: '/db'
});

module.exports = router;

router.get("/", async (ctx) => {
  try {
    const guests = await knex('MyGuests').select('*');
    ctx.body = {
      data: guests
    };
  } catch (err) {
    console.log(err)
  }
})

router.get("/:id", async (ctx) => {
  try {
    const guest = await knex('MyGuests').select('*').where({ id: parseInt(ctx.params.id) });

    if(guest.length===0){
        ctx.body = {error:"Does not exist"}
    }
    else
    {
    ctx.body = {
      data: guest
        };
    }
  } catch (err) {
    console.log(err)
  }
})

router.post("/", async (ctx) => {
  try {
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
  } catch (err) {
    console.log(err)
  }
})

router.put('/:id', async (ctx) => {
  try {
        var id = await knex('MyGuests').update(ctx.request.body).where({ id: parseInt(ctx.params.id)})
        var resp = await knex('MyGuests').select('*').where({ id: parseInt(ctx.params.id)});
        ctx.body = {data:resp}
    
  } catch (err) {
    console.log(err)
  }
})

router.delete('/:id', async (ctx) => {
  try {
        var id = await knex('MyGuests').del().where({ id: parseInt(ctx.params.id)})
        var resp = await knex('MyGuests').select('*').where({ id: parseInt(ctx.params.id)});
        ctx.body = {data:resp}
    
  } catch (err) {
    console.log(err)
  }
})