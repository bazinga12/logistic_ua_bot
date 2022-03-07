


import  { Telegraf } from 'telegraf';
const token = '5272576721:AAEcPSROdOwNBBR0UIrqcZo7tEyEU6nqbhE';
const bot = new Telegraf(token);
console.log('BOT STARTED')
bot.command('start', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Вас вітає Logistic.UA', {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Я водій",
                        callback_data: 'driver'
                    }
                ],
                [
                    {
                        text: "Я шукаю водія",
                        callback_data: 'user'
                    }
                ]
            ],
        }
    })
})




bot.action('driver', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Share your contact', {
        "reply_markup": {
            "one_time_keyboard": true,
            "keyboard": [[{
                text: "My phone number",
                request_contact: true
            }]]
        }
    })
    
})

bot.command('contact', ctx => console.log('CONTACT context', ctx))

bot.on('contact', (ctx) => {
    console.log('ON CONTACT')
    console.log(ctx.contact)
    console.log('=========')
    console.log(ctx.update.message.contact)
})

bot.action('contact', ctx => console.log('ACTION CONTACT', ctx))

bot.hears('animals', ctx => {
    console.log(ctx.from)
    let animalMessage = `great, here are pictures of animals you would love`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, animalMessage, {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "dog",
                        callback_data: 'dog'
                    }
                ],
                [
                    {
                        text: "cat",
                        callback_data: 'cat'
                    }
                ]
            ],
        }
    })
})

bot.action('dog', ctx => {
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: "res/dog.jpeg"
    })
})

//method that returns image of a cat 

bot.action('cat', ctx => {
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: "res/cat.jpeg"
    })
})

//method for requesting user's phone number

bot.hears('phone', (ctx, next) => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Can we get access to your phone number?', requestPhoneKeyboard);

})

//method for requesting user's location

bot.hears("location", (ctx) => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Can we access your location?', requestLocationKeyboard);
})

//constructor for providing phone number to the bot

const requestPhoneKeyboard = {
    "reply_markup": {
        "one_time_keyboard": true,
        "keyboard": [
            [{
                text: "My phone number",
                request_contact: true,
                one_time_keyboard: true
            }],
            ["Cancel"]
        ]
    }
};
//constructor for proving location to the bot

const requestLocationKeyboard = {
    "reply_markup": {
        "one_time_keyboard": true,
        "keyboard": [
            [{
                text: "My location",
                request_location: true,
                one_time_keyboard: true
            }],
            ["Cancel"]
        ]
    }

}

bot.launch();


