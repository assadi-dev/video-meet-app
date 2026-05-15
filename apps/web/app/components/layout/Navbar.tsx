import React from "react";
import { ThemeToggle } from "../themes/ThemeToggle";
import HeaderLogo from "./HeaderLogo";

type NavbarProps = {
  leading?: React.ReactNode;
  end?: React.ReactNode;
  back?: boolean;
};
const Navbar = ({ leading, end, back }: NavbarProps) => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {leading ? leading : <HeaderLogo back={back} />}
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {/* end ?  end:null <div className="text-sm text-muted-foreground">
               Salle: <span className="font-mono">{roomId}</span>
            </div>: */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
