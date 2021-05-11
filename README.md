# pathetic_geek-bot

Decided to finally write a discord bot with atleast `some` good code

> This uses `pnpm` package manager.

## To run in dev

1. Add a `.env` file
```
BOT_TOKEN=<YOUR_BOT_TOKEN>
OWNER_ID=<YOUR_USER_ID>
PREFIX=<SOME_PREFIX>
```
2. Install dependencies `pnpm i`
3. Start dev server with `pnpm run dev`

## Adding bot to server

```
https://discord.com/oauth2/authorize?client_id=<CLIENT_ID>&permissions=<PERMISSIONS_CODE>&scope=bot
```

For my bot it is:
```
https://discord.com/oauth2/authorize?client_id=837994619437973534&permissions=2164263952&scope=bot
```
