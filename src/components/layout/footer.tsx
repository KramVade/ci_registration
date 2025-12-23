export function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0 bg-secondary/30">
      <div className="container flex flex-col items-center justify-center gap-4 h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
          &copy; {new Date().getFullYear()} Christmas Institute. All rights
          reserved. Si Kristo Higit sa Lahat!
        </p>
      </div>
    </footer>
  );
}
