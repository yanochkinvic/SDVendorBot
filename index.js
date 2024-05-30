require('dotenv').config()

const { Bot, GrammyError, HttpError } = require('grammy')

const bot = new Bot(process.env.TOKEN)

bot.api.setMyCommands([
  {
    command: 'start',
    description: 'Запуск бота'
  },
  {
    command: 'set_name',
    description: 'Ввести свои ФИО'
  },
  {
    command: 'start_work',
    description: 'Отметиться на работе'
  }
])

bot.command('start',
  async (ctx) => await ctx.reply('Привет! Я - бот!'))

bot.command('set_name',
  async (ctx) => await ctx.reply('Введите свои ФИО в формате: Иванов Иван Иванович'))

// bot.on('message',
//   async (ctx) => await console.log(ctx.msg))

bot.hears(['id', 'ID'],
  async (ctx) => await ctx.reply(`Ваш ID: ${ctx.from.id}`)
)

bot.catch((err) => {
  const ctx = err.ctx
  console.error(`Error while handling update ${ctx.update.update_id}`)
  const e = err.error

  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description)
  } else if
    (e instanceof HttpError) {
    console.error("Could not comtact Telegram:", e)
  } else {
    console.error("Unknown error:", e)
  }
})

bot.start()