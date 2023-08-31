import { ALGOLIA_ADMIN_API_KEY, ALGOLIA_APP_ID } from "@env";
import algoliasearch from "algoliasearch";

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY);

export const usersIndex = client.initIndex("users");
usersIndex.setSettings({
  searchableAttributes: ["username"],
  typoTolerance: true,
});
