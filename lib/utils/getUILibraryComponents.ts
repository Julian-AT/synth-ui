import { UILibrary } from "@/lib/types";
import shadcnUIComponentsDump from "@/public/assets/content/external/components/shadcn/dump.json";
import nextUIComponentsDump from "@/public/assets/content/external/components/nextui/dump.json";
import flowbiteComponentsDump from "@/public/assets/content/external/components/flowbite/dump.json";

/**
 *
 * @param uiLibrary - The UI library to get the components for.
 * @returns The components for the UI library.
 *
 */
export function getUILibraryComponents(uiLibrary: UILibrary) {
  let uiLibraryComponents;

  switch (uiLibrary) {
    case "nextui":
      uiLibraryComponents = nextUIComponentsDump;
      break;
    case "flowbite":
      uiLibraryComponents = flowbiteComponentsDump;
      break;
    case "shadcn":
    default:
      uiLibraryComponents = shadcnUIComponentsDump;
      break;
  }

  return uiLibraryComponents;
}
