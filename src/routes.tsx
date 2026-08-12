import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Itinerary } from "./pages/Itinerary";
import { FoodExplorer } from "./pages/FoodExplorer";
import { SavedPlaces } from "./pages/SavedPlaces";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "itinerary", Component: Itinerary },
      { path: "food", Component: FoodExplorer },
      { path: "saved", Component: SavedPlaces },
    ],
  },
]);
