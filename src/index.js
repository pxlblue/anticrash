require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client({
  disableMentions: 'everyone',
})

const BLACKLISTED_CHARACTERS = ['\u200b', '\u200e']

client.on('ready', () => console.log('Bot ready on', client.user.tag))

client.on('message', async (msg) => {
  try {
    if (!msg.deletable) return
    let ref = await msg.channel.messages.fetch(msg.reference.messageID)
    console.log(ref.content.charCodeAt(0))
    if (BLACKLISTED_CHARACTERS.some((char) => ref.content.includes(char))) {
      // Contains LTR mark, delete
      await msg.delete({
        reason: 'Reply to message with blacklisted character',
      })
      msg.author.send(
        'Please refrain from replying to images with links that show, there is an invisible character that crashes iOS Discord when they are replied to.'
      )
    }
  } catch (err) {
    // noop best error handler
  }
})

client.login(process.env.TOKEN)
