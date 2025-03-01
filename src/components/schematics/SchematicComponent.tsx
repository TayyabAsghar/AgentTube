import SchematicEmbed from "@/components/schematics/SchematicEmbed";
import GetSchematicAccessToken from "@/actions/GetSchematicAccessToken";

interface SchematicWrapperProps {
  componentId: string;
}

const SchematicComponent = async ({ componentId }: SchematicWrapperProps) => {
  if (!componentId) return;

  const accessToken = await GetSchematicAccessToken();

  if (!accessToken) throw new Error("Failed to get access token.");

  return <SchematicEmbed accessToken={accessToken} componentId={componentId} />;
};

export default SchematicComponent;
