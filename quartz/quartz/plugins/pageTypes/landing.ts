import { QuartzPageTypePlugin } from "../types"
import LandingContent from "../../components/pages/LandingContent"

export const LandingPageType: QuartzPageTypePlugin = () => ({
  name: "landing",
  priority: 100,
  match: ({ slug }) => slug === "index",
  layout: "landing",
  frame: "garden",
  body: LandingContent,
})
