const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="w-full flex justify-center items-center">{children}</div>
    </>
  );
};

export default RootLayout;
