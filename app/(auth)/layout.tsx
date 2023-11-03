export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-full overflow-hidden flex justify-center items-center">{children}</div>;
}
