const { Client } = require("@notionhq/client");

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
        property: "rand",
        direction: "ascending",
      },
    ],
    page_size: 10,
  });
  return response;
};

/**
 * Build an email content from database content's records.
 * https://developers.notion.com/reference/post-database-query
 */
const buildEmailContent = function (response) {
  if (!response || !response?.results) {
    return [];
  }

  const rows = response.results;
};
module.exports = { randomFetch };
