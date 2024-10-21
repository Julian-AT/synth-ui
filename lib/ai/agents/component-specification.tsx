import {
  componentSpecificationSchema,
  ComponentSpecificationSchema,
  PartialComponentSpecificationSchema,
} from "@/lib/schema/component/specification";
import { getModel } from "@/lib/utils/getModel";
import { CoreMessage, streamObject } from "ai";
import { createStreamableValue } from "ai/rsc";
import shadcnUIComponentsDump from "@/public/assets/content/external/components/shadcn/dump.json";
import fs from "fs";

export async function componentSpecification(
  messages: CoreMessage[],
): Promise<ComponentSpecificationSchema> {
  const objectStream =
    createStreamableValue<PartialComponentSpecificationSchema>();

  let finalComponentSpecification: PartialComponentSpecificationSchema = {};

  try {
    await streamObject({
      model: getModel(),
      system: `As a professional, and experienced senior software engineer for NextJS/React, your primary objective is to create an outline for a new NextJS/React component for a web application.
      For each user query, utilize the information provided to generate a detailed specification for the NextJS/React component.
      Aim to directly address the user's question, augmenting your response with additional details and explanations where necessary.`,
      messages,
      schema: componentSpecificationSchema,
    })
      .then(async (result) => {
        for await (const obj of result.partialObjectStream) {
          if (obj) {
            objectStream.update(obj);
            finalComponentSpecification = {
              ...finalComponentSpecification,
              ...obj,
            };
          }
        }
      })
      .finally(() => {
        objectStream.done();
      });

    // fill in importStatement and exampleUsage
    const uiLibraryImports = (
      (finalComponentSpecification as ComponentSpecificationSchema)
        .uiLibraryImports?.imports || []
    ).map((uiLibraryImport) => {
      const component = shadcnUIComponentsDump.find(
        (c) => c.name === uiLibraryImport.name,
      );

      return {
        ...uiLibraryImport,
        importStatement: component?.docs.import?.code || "",
        exampleUsage: component?.docs.use[0].code || "",
      };
    });

    const specification = {
      ...finalComponentSpecification,
      uiLibraryImports: {
        imports: [...(uiLibraryImports ?? [])],
      },
    } as ComponentSpecificationSchema;

    // Validate final specification
    if (!specification) {
      throw new Error(
        "Generated component specification is incomplete or invalid",
      );
    }

    fs.writeFileSync("knost.json", JSON.stringify(specification, null, 2));

    return specification;
  } catch (error) {
    console.error("Error generating component specification:", error);
    throw error;
  }
}
