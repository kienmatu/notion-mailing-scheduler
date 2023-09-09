# Notion mailing scheduler

This project help us to schedule sending an email every week from a notion database.

## Prerequisites

1. A notion database to store vocab with fields:
   - `Name`, `Short description`, `IPA`, `Example`.
   - And `Rand` is the random number with formula:
   ```
   (((((toNumber(substring(replaceAll(id(), "[a-z]", ""), 0, 8)) * 100011979) + 500067713) % 900066731) * (((timestamp(now()) * 800067089) + 800068411) % 800053967)) + 900067309) % 900066571
   ```
   - See my notion template: [English template](https://devgiangho.notion.site/English-template-6674b46733b744b8819d039c9df51913?pvs=4)
2. Create an integration at [notion integration](https://www.notion.so/my-integrations)
3. Share the database with an integration.
4. Prepare email accounts for sending.

   - Disable 2FA, allow low-secure BOT.
   - Recommend to use **a not-important** account.

5. A github account

## Setup

1. Fork this project into your account
2. Add secret to your project (it will be "secret")

   - `SENDING_EMAIL`: Sending account.
   - `SENDING_PASSWORD`: Password of the sending account.
   - `DESTINATION_EMAIL`: Your email that will be received email automatically.
   - `NOTION_DB_ID`: Notion database ID.
   - `NOTION_API_KEY`: Notion API key.

3. Modify the cronjob (optional)

   - How to modify the cronjob? See [Crontab.guru](https://crontab.guru/#*_*_*_*_*)

4. Enjoy and ready to learn!
