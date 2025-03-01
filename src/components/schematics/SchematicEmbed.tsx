"use client";

import { SchematicEmbed as SchematicEmbedComponent } from "@schematichq/schematic-components/";

interface SchematicEmbedProp {
  accessToken: string;
  componentId: string;
}

const SchematicEmbed = ({ accessToken, componentId }: SchematicEmbedProp) => {
  return <SchematicEmbedComponent accessToken={accessToken} id={componentId} />;
};

export default SchematicEmbed;
