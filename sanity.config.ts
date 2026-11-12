"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "navisol",
  title: "Navisol",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Inhoud")
          .items([
            S.listItem()
              .title("Pagina's")
              .schemaType("page")
              .child(S.documentTypeList("page").title("Pagina's").defaultOrdering([{ field: "title", direction: "asc" }])),
            S.listItem()
              .title("Projecten (Ons werk)")
              .schemaType("workItem")
              .child(S.documentTypeList("workItem").title("Projecten").defaultOrdering([{ field: "order", direction: "asc" }])),
          ]),
    }),
  ],
});
