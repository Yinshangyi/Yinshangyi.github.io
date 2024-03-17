import {

  NavbarTwoColumns,
  NavMenu,
  NavMenuItem,
  Section,
} from 'astro-boilerplate-components';
import { ReactNode } from 'react';

type ILogoProps = {
  icon: ReactNode;
  name: string;
};

const Logo = (props: ILogoProps) => (
  <div className="flex items-center text-xl font-bold" style={{color: "rgba(25, 189, 236, 0.9)"}}>
    {props.icon}
    {props.name}
  </div>
);

const Navbar = () => (
  <Section>
    <NavbarTwoColumns>
      <a href="/">
        <Logo
          icon={
            <img src="/assets/images/avatar.png" width="20rem" style={{ marginRight: "1rem" }} />
          }
          name="The Data Lead"
        />   
      </a>

      <NavMenu>
        <NavMenuItem href="/posts/">Blog</NavMenuItem>
        <NavMenuItem href="/">GitHub</NavMenuItem>
        <NavMenuItem href="/">Twitter</NavMenuItem>
      </NavMenu>
    </NavbarTwoColumns>
  </Section>
);

export { Navbar };
