import { QuartzPageTypePlugin } from "../types"
import VermietungContent from "../../components/pages/VermietungContent"

export const VermietungBuchungPageType: QuartzPageTypePlugin = () => ({
  name: "vermietung-buchung",
  priority: 100,
  match: ({ slug }) => slug === "vermietung/buchung",
  layout: "landing",
  frame: "garden",
  body: VermietungContent,
})
