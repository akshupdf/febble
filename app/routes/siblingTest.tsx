import ChocolateHamperApp from "~/components/qna/qna";
import type { Route } from "./+types/home";
import { SiblingEquationTest } from "~/components/siblingEquationTest/siblingEquation";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <ChocolateHamperApp />;
}