import SchematicComponent from "@/components/schematics/SchematicComponent";

const ManagePlan = () => {
  return (
    <div className="mx-auto px-18">
      <h1 className="text-2xl font-bold mb-4 my-8">Manage Your Plan</h1>
      <p className="text-accent-foreground/60 mb-4">
        Manage your subscriptions and billing details here.
      </p>

      <div className="pb-8">
        <SchematicComponent componentId="cmpn_Z7xphpLwvnF" />
      </div>
    </div>
  );
};

export default ManagePlan;
