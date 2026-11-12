import { page, photo, sectionTypes } from "./page";
import { workItem } from "./workItem";

export const schemaTypes = [workItem, photo, ...sectionTypes, page];
