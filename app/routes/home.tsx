import IntroAnimation from "~/components/reusable/IntroAnimation";
import type { Route } from "./+types/home";
import StartJourney from "~/components/startJourney/startJourney";
import ChocolateHamperApp from "~/components/qna/qna";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Fabelle" },
    { name: "description", content: "Welcome to Fabelle!" },
  ];
}

export default function Home() {
  return <div>
    {/* <IntroAnimation /> */}
    <ChocolateHamperApp />;
  </div>


}
