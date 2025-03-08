import Sider from "@/components/sider";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Sider />
      <div className="w-full flex justify-center items-center">{children}</div>
    </>
  );
};

export default RootLayout;
