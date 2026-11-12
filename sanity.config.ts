"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "navisol",
  title: "Navisol",
  basePath: "/studio",
  projectId: projectId || "missing-project-id",
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool()],
  // apiVersion wordt door de client gebruikt; hier alleen ter referentie.
  document: { productionUrl: undefined },
});
void apiVersion;
