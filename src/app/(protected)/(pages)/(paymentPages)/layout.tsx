

export default function paymentLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  
    return (
      <div className="h-full">
          <main className="md:pl-10 pr-10 min-h-screen">
            {children}
          </main>  
      </div> 
    );
  }
  