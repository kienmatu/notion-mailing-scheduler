const { Client } = require("@notionhq/client");
const fs = require("fs");
const path = require("path");
const template = fs.readFileSync(
  path.resolve(__dirname, "template.html"),
  "utf8"
);
const Handlebars = require("handlebars");

require("dotenv").config();

const databaseId = process.env.NOTION_DB_ID;
const notion = new Client({ auth: process.env.NOTION_API_KEY });

if (!notion || !databaseId) {
  console.error("You must provide notion database id and notion API Key");
  process.exit(1);
}

const randomFetch = async function () {
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: "Rand",
        direction: "ascending",
      },
    ],
    page_size: 15,
  });
  return response;
};

/**
 * Build an email content from database content's records.
 * https://developers.notion.com/reference/post-database-query
 */
const buildEmailContent = function (response) {
  if (!response || !response?.results) {
    process.exit(1);
    return "Something gone wrong with your data";
  }

  const rows = response.results;

  const vocabularies = rows.map(({ properties }) => {
    const vocab = {
      name: getPlainText(properties["Name"]),
      description: getPlainText(properties["Short description"]),
      example: getPlainText(properties["Example"]),
      pronunciation: getPlainText(properties["IPA"]),
    };
    return vocab;
  });

  const hbTemplate = Handlebars.compile(template);
  const html = hbTemplate({ vocabularies: vocabularies });

  return html;
};

const getPlainText = function (property) {
  if (property.type == "rich_text") {
    const rows = property?.rich_text?.map((r) => r.plain_text);
    return rows?.join("");
  }
  if (property.type == "title") {
    const rows = property?.title?.map((r) => r.plain_text);
    return rows?.join("");
  }
  return "";
};
module.exports = { randomFetch, buildEmailContent };
