# Notion mailing scheduler

This project help us to schedule sending an email every week from a notion database.

## Prerequisites

1. A notion database with a random tab
2. Gmail accounts (sending)

- Disable 2FA, allow low-secure BOT for your sending account

3. A github account

## Setup

1. Fork this project into your account
2. Add secret to your project (it will be "secret")

   - `SENDING_EMAIL`: Sending account.
   - `SENDING_PASSWORD`: Password of the sending account.
   - `DESTINATION_EMAIL`: Your email that will be received email automatically.
   - `NOTION_DB_ID`: Notion database ID.
   - `NOTION_API_KEY`: Notion API key.

3. Modify the cronjob (optional)

4. Enjoy and learn!
