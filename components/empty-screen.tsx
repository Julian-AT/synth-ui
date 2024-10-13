import PromptForm from "@/components/prompt-form";
import ExamplePrompts from "@/components/example-prompts";
import Balancer from "react-wrap-balancer";

export default function EmptyScreen() {
  return (
    <div className="relative z-20 flex h-full w-full flex-col items-center justify-between gap-3 overflow-hidden md:justify-center">
      <div className="flex h-full flex-col items-center justify-center md:h-auto">
        <div className="z-20 flex flex-col items-center justify-center gap-3 py-5 md:py-0">
          <h1 className="text-center text-4xl font-medium">
            <Balancer>What can I help you build today?</Balancer>
          </h1>
          <span className="text-muted-foreground">
            <Balancer>
              Generate, Preview & Ship beautiful User Interfaces
            </Balancer>
          </span>
        </div>
        <ExamplePrompts className="flex py-12 md:hidden md:py-0" />
      </div>
      <div className="relative z-10 w-full md:mt-4">
        <PromptForm />
      </div>
      <ExamplePrompts className="hidden md:flex" />
    </div>
  );
}
